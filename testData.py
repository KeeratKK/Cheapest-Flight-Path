# import pandas as pd
# import math
# from FlightGraph import FlightGraph
# from queue import PriorityQueue

# def main():

#     flightDf = pd.read_csv('data/Airport_Data.csv')
    
#     graph = FlightGraph()

#     # for index in flightDf.index:

#     #     if(flightDf['Year'][index] == 2023):
#     #         graph.addFlight(flightDf['city1'][index], flightDf['city2'][index], flightDf['fare'][index])
    
#     # dijkstraPath, dijkstraCost, curEdges = graph.bellmanFord("Tampa, FL (Metropolitan Area)", "Ithaca/Cortland, NY")
#     # bellmanPath, bellmanCost, curEdges = graph.bellmanFord("Idaho Falls, ID", "Tampa, FL (Metropolitan Area)")

#     # print("Dijkstra's")
#     # print(dijkstraPath)
#     # print(dijkstraCost)

#     # print("------------")

#     # print("Bellman Ford Path")
#     # print(bellmanPath)
#     # print(bellmanCost)

#     graph.addFlight(0, 1, 10)
#     graph.addFlight(0, 4, 100)
#     graph.addFlight(1, 2, 50)
#     graph.addFlight(1, 3, 50)
#     graph.addFlight(2, 4, 10)
#     graph.addFlight(3, 1, 10)
#     graph.addFlight(3, 2, 20)
#     graph.addFlight(3, 4, 60)
#     graph.addFlight(0, 3, 30)

#     a, b, c = graph.dijkstras(0, 2)
#     print(b)


# if __name__ == '__main__':
#     main()