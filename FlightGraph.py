from queue import PriorityQueue
import math

class FlightGraph:

    def __init__(self):
        self.adj = {}

        # Will be used for dijkstra's and bellman ford
        self.predecessor = {}
        self.distances = {}

    def getNumberOfCities(self):

        return len(self.adj)
    
    def uniqueCities(self):

        cities = set()

        for city in self.adj:

            cities.add(city)
        
        return cities

    def addFlight(self, fromEdge, toEdge, flightCost):
        
        if fromEdge not in self.adj:
            self.adj[fromEdge] = []
        
        if toEdge not in self.adj:
            self.adj[toEdge] = []

        self.adj[fromEdge].append((toEdge, flightCost))
    
    def isFlight(self, fromEdge, toEdge):

        for destination in self.adj[fromEdge]:

            if(destination[0] == toEdge):
                return True
        
        return False

    def dijkstras(self, source, destination):

        allEdges = []

        if source not in self.adj:
            return None, 1000000000, []

        pq = PriorityQueue()

        pq.put((0, source))
        self.distances[source] = 0
        
        for vertex in self.adj:
            self.predecessor[vertex] = -1

            if vertex != source:
                self.distances[vertex] = math.inf
                pq.put((math.inf, vertex))

        while not pq.empty():
            
            shortestCityTuple = pq.get()

            # Because python doesnt support change priority in their PQ, we will have some old values still in the pq
            # So if we notice an old value, skip it until we get the correct value
            while(shortestCityTuple[0] != self.distances[shortestCityTuple[1]] and not pq.empty()):
                shortestCityTuple = pq.get()

            shortestCityDistance = shortestCityTuple[0]
            shortestCity = shortestCityTuple[1]

            for neighbors in self.adj[shortestCity]:

                flightCost = neighbors[1]
                neighborName = neighbors[0]

                if self.distances[shortestCity] + flightCost < self.distances[neighborName]:
                    self.distances[neighborName] = self.distances[shortestCity] + flightCost
                    self.predecessor[neighborName] = shortestCity

                    allEdges.append((shortestCity, neighborName))

                    pq.put((self.distances[neighborName], neighborName)) 
            
        path = []
        curVertex = destination
        while self.predecessor[curVertex] != -1:
            path.append([curVertex, self.distances[curVertex]])
            curVertex = self.predecessor[curVertex]
        
        path.append([source, 0])
        path.reverse()

        return path, self.distances[destination], allEdges

    def bellmanFord(self, source, destination):

        allEdges = []

        if source not in self.adj:
            return None, 1000000000, []

        self.distances[source] = 0
        updates = False

        for vertex in self.adj:
            self.predecessor[vertex] = -1

            if vertex != source:
                self.distances[vertex] = math.inf

        # Dont need to perform |V| times because we know there are no negative weight cycles
        for v in range(len(self.adj) - 1):
            
            for vertex in self.adj:

                for edge in self.adj[vertex]:

                    flightCost = edge[1]
                    neighborName = edge[0]

                    if self.distances[vertex] != math.inf and self.distances[vertex] + flightCost < self.distances[neighborName]:
                        self.distances[neighborName] = self.distances[vertex] + flightCost
                        self.predecessor[neighborName] = vertex

                        allEdges.append((vertex, neighborName))

                        updates = True

            if updates == False:
                break
        
        path = []
        curVertex = destination
        while self.predecessor[curVertex] != -1:
            path.append([curVertex, self.distances[curVertex]])
            curVertex = self.predecessor[curVertex]
        
        path.append([source, 0])
        path.reverse()

        return path, self.distances[destination], allEdges

        


