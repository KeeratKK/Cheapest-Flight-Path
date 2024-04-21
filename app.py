from flask import Flask, render_template, request, json, jsonify
import pandas as pd
from FlightGraph import FlightGraph

app = Flask(__name__)

# We need graphs for each year 
graphs = [None, None, None, None, None]
coords = {}

@app.before_request
def initialize_graph():

    # https://stackoverflow.com/questions/73570041/flask-deprecated-before-first-request-how-to-update
    # Essentially we just want to run this once when the app is created so that we do not have to continously read through 100k+ data points
    app.before_request_funcs[None].remove(initialize_graph)

    global graphs
    
    # Initialize each graph
    for i in range(5):
        graphs[i] = FlightGraph()

    # Convert csv to dataframe so it is easier to use
    flightDf = pd.read_csv('data/Airport_Data.csv')

    # Loop through all flights and add to the graphs
    for index in flightDf.index:
        
        # Get its year
        year = flightDf['Year'][index]

        # Add the flight to the graph of the corresponding year
        graphs[year - 2019].addFlight(flightDf['city1'][index], flightDf['city2'][index], flightDf['fare'][index])
    
    global coords

    cityCoordsDf = pd.read_csv('data/City_Coordinates.csv')

    for index, row in cityCoordsDf.iterrows():

        fullCityName = row[0] + ',' + row[1]
        
        coords[fullCityName] = [row[2], row[3]]
    
    coords[cityCoordsDf.columns[0] + ',' + cityCoordsDf.columns[1]] = [cityCoordsDf.columns[2], cityCoordsDf.columns[3]]

@app.route('/') 
def index():
    return render_template('main.html')

@app.route('/get_data', methods=['POST'])
def get_data():
    origin = request.form['originSearchbar']
    destination = request.form['destinationSearchbar']
    firstYear = int(request.form['firstYearDropDown'])
    secondYear = int(request.form['secondYearDropDown'])
    algorithmChoice = request.form['algorithmDropDown']

    bestPath = []
    lowestCost = 10000000
    bestYear = 2019

    allEdges = []

    for year in range(firstYear, secondYear + 1):

        if algorithmChoice == "dijkstra":

            curPath, curCost, curEdges = graphs[year - 2019].dijkstras(origin, destination)
        
        else:
            
            curPath, curCost, curEdges = graphs[year - 2019].bellmanFord(origin, destination)

        if curCost < lowestCost:

            bestPath = curPath
            lowestCost = curCost
            bestYear = year
            allEdges = curEdges

    return jsonify({'cost': lowestCost,'bestPath': bestPath, 'bestYear': bestYear, 'allEdges': allEdges})

@app.route('/get_coords', methods=['POST'])
def get_coords():

    path = request.get_json()
    
    allCoords = []

    for indx in range(len(path)):

        allCoords.append(coords[path[indx]])
    
    return jsonify({'coords': allCoords})


@app.route('/temp', methods=['POST'])
def temp():

    allCities = set()

    for i in range(5):
        allCities.update(graphs[i].uniqueCities())

    allCitiesList = list(allCities)

    return jsonify({"allCities": allCitiesList})