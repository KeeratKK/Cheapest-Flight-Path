import pandas as pd
import math
from FlightGraph import FlightGraph
from queue import PriorityQueue

def main():

    flightDf = pd.read_csv('Airport_Data.csv')
    
    graph = FlightGraph()

    for index in flightDf.index:

        if(flightDf['Year'][index] == 2023):
            graph.addFlight(flightDf['city1'][index], flightDf['city2'][index], flightDf['fare'][index])
    
    dijkstraPath, dijkstraCost = graph.dijkstras("Idaho Falls, ID", "Tampa, FL (Metropolitan Area)")
    bellmanPath, bellmanCost = graph.bellmanFord("Idaho Falls, ID", "Tampa, FL (Metropolitan Area)")

    print("Dijkstra's")
    print(dijkstraPath)
    print(dijkstraCost)

    print("------------")

    print("Bellman Ford Path")
    print(bellmanPath)
    print(bellmanCost)

if __name__ == '__main__':
    main()