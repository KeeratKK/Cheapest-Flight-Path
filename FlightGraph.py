from queue import PriorityQueue
import math

# Class that will represent all the cities and flights as a graph
class FlightGraph:

    def __init__(self):
        # Using a dictionary and adjacency list representation
        # It will be similar to a map<string, vector<pair<string, int>>>
        self.adj = {}

        # Will be used for dijkstra's and bellman ford
        self.predecessor = {} # Holds predecessor of each city (Vertex)
        self.distances = {} # Holds distance from source city to current city

    def getNumberOfCities(self):
        """Returns the total number of cities in the graph"""

        return len(self.adj)

    def uniqueCities(self):
        """Returns a set of all the unique cities in the graph"""

        cities = set()

        for city in self.adj:

            cities.add(city)

        return cities

    def addFlight(self, fromEdge, toEdge, flightCost):
        """
        Adds a directed edge in the graph with a weight corresponding to the cost of the flight

        Args:
            fromEdge (string): the source city
            toEdge (string): the destination city
            flightCost (float): cost of the flight
        """

        # First initialize a list for each of the vertices (cities)
        if fromEdge not in self.adj:
            self.adj[fromEdge] = []

        if toEdge not in self.adj:
            self.adj[toEdge] = []

        # Then add the directed edge
        self.adj[fromEdge].append((toEdge, flightCost))

    def isFlight(self, fromEdge, toEdge):
        """
        Checks if there is a flight that goes between fromEdge to toEdge

        Args:
            fromEdge: the source city
            toEdge: the destination city

        Returns:
            bool: Whether there exists a flight or not
        """

        # Check all of the neighbors of fromEdge to see if one of them is toEdge
        for destination in self.adj[fromEdge]:

            if(destination[0] == toEdge):
                return True

        return False

    def dijkstras(self, source, destination):
        """
        Performs dijkstra's algorithm to calculate cheapest flight between source city and destination city

        Args:
            source (string): the starting city
            destination (string): the destination city

        Returns:
            list: Path containing every city (and cost to get to that city) from source to destination
            float: Total Cost of the Path
            list: Contains all the edges, in order, that the algorithm relaxed
        """

        # This will be used for the visualization animation
        # It will hold all of the edges that we relaxed and will then display them to the user in order
        allEdges = []

        # If city does not exist, there is no path so we return these default values
        if source not in self.adj:
            return [], 100000000, []

        # Will store V-S or the vertices that we still need to look at
        pq = PriorityQueue()

        # Initialize source in pq with 0 distance
        pq.put((0, source))
        self.distances[source] = 0

        # For every other vertex that isnt source, intiailze its predecssor to be -1 and distance as infinity
        for vertex in self.adj:
            self.predecessor[vertex] = -1

            if vertex != source:
                self.distances[vertex] = math.inf
                pq.put((math.inf, vertex))

        # Keep going until we have examined all of the vertices
        while not pq.empty():

            shortestCityTuple = pq.get()

            # Because our pq might hold old cost values for a given vertex, we have to check to make sure we are getting the updated value
            # If not, then continue to get from the pq until we pop a value that matches the current cost
            while(shortestCityTuple[0] != self.distances[shortestCityTuple[1]] and not pq.empty()):
                shortestCityTuple = pq.get()

            # Unpack the values of the current cost and city we are processing
            shortestCity = shortestCityTuple[1]

            # Loop through neighbors of the city and relax edges if necessary
            for neighbors in self.adj[shortestCity]:

                # Get cost and city name of neighbor
                flightCost = neighbors[1]
                neighborName = neighbors[0]

                # allEdges.append((shortestCity, neighborName))

                # If the cost to the neighbor using the current path is cheaper than what we have stored, we choose the cheaper path and update values
                if self.distances[shortestCity] + flightCost < self.distances[neighborName]:

                    # Update cost and predecssor
                    self.distances[neighborName] = self.distances[shortestCity] + flightCost
                    self.predecessor[neighborName] = shortestCity

                    allEdges.append((shortestCity, neighborName))

                    # Put new value in priority queue
                    pq.put((self.distances[neighborName], neighborName))

        # Now we wil backtrack through predecessors and distances to get our path and cost of each flight
        path = []
        curVertex = destination

        # Backtrack and append
        while self.predecessor[curVertex] != -1:
            path.append([curVertex, self.distances[curVertex]])
            curVertex = self.predecessor[curVertex]

        path.append([source, 0])

        # Reverse because we backtracked
        path.reverse()

        return path, self.distances[destination], allEdges

    def bellmanFord(self, source, destination):
        """
        Performs Bellman Ford algorithm to calculate cheapest flight between source city and destination city

        Args:
            source (string): the starting city
            destination (string): the destination city

        Returns:
            list: Path containing every city (and cost to get to that city) from source to destination
            float: Total Cost of the Path
            list: Contains all the edges, in order, that the algorithm relaxed
        """

        # This will be used for the visualization animation
        # It will hold all of the edges that we relaxed and will then display them to the user in order
        allEdges = []

        # If city does not exist, there is no path so we return these default values
        if source not in self.adj:
            return [], 100000000, []

        # Initialize source distance as 0
        self.distances[source] = 0

        # In bellman ford, if there are no updates to distances in a given iteration we can stop early
        # This is a flag that helps to determine if we can end the algorithm early
        updates = False

        # For every other vertex that is not source, initialize distance to be infinity and predecessor -1
        for vertex in self.adj:
            self.predecessor[vertex] = -1

            if vertex != source:
                self.distances[vertex] = math.inf

        # Dont need to perform |V| times because we know there are no negative weight cycles
        for v in range(len(self.adj) - 1):

            # Every iteration we attempt to relax every edge
            for vertex in self.adj:

                for edge in self.adj[vertex]:

                    # Get the cost and city name of the neighbor of current vertex
                    flightCost = edge[1]
                    neighborName = edge[0]

                    # If the cost to the neighbor using the current path is cheaper than what we have stored, we choose the cheaper path and update values
                    if self.distances[vertex] != math.inf and self.distances[vertex] + flightCost < self.distances[neighborName]:

                        # Update cost and predecssor
                        self.distances[neighborName] = self.distances[vertex] + flightCost
                        self.predecessor[neighborName] = vertex

                        allEdges.append((vertex, neighborName))

                        updates = True

            # No changes to costs, so we know we are done with algo early
            if updates == False:
                break

        # Now we wil backtrack through predecessors and distances to get our path and cost of each flight
        path = []
        curVertex = destination

        # Backtrack and append
        while self.predecessor[curVertex] != -1:
            path.append([curVertex, self.distances[curVertex]])
            curVertex = self.predecessor[curVertex]

        path.append([source, 0])

        # Reverse because we backtracked
        path.reverse()

        return path, self.distances[destination], allEdges
