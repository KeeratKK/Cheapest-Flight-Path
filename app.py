from flask import Flask, render_template, request, json, jsonify
from FlightGraph import FlightGraph
import pandas as pd

app = Flask(__name__)

# We need graphs for each year
graphs = [None, None, None, None, None]

# Dictionary of coordinates of each city
coords = {}

# This function will run exactly once when the app is crated
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

    # Convert coordinate csv to dataframe
    cityCoordsDf = pd.read_csv('data/City_Coordinates.csv')

    # Loop through each row
    for index, row in cityCoordsDf.iterrows():

        # Get City Name
        fullCityName = row[0] + ',' + row[1]

        # Add coordiantes of corresponding city
        coords[fullCityName] = [row[2], row[3]]

    # Because this CSV does not have headers, it treats first row as a header so we need to add first row city to dictionary as well
    coords[cityCoordsDf.columns[0] + ',' + cityCoordsDf.columns[1]] = [cityCoordsDf.columns[2], cityCoordsDf.columns[3]]

# Main page
@app.route('/')
def index():
    return render_template('main.html')

# Function called when user clicks calculate
@app.route('/get_data', methods=['POST'])
def get_data():
    # Get the data that the user inputted in the form
    origin = request.form['originSearchbar']
    destination = request.form['destinationSearchbar']
    firstYear = int(request.form['firstYearDropDown'])
    secondYear = int(request.form['secondYearDropDown'])
    algorithmChoice = request.form['algorithmDropDown']

    # Default values
    bestPath = []
    lowestCost = 100000000
    bestYear = 2019

    # Will have all the edges that were relaxed in the algorithm
    # We dont store all the edges because that will be too large
    allEdges = []

    # Loop through year range that user inputted
    for year in range(firstYear, secondYear + 1):

        # For each year perform the algorithm that the user wanted to see

        if algorithmChoice == "dijkstra":

            curPath, curCost, curEdges = graphs[year - 2019].dijkstras(origin, destination)

        else:

            curPath, curCost, curEdges = graphs[year - 2019].bellmanFord(origin, destination)

        # We are looking for the chepeast path across all years, so if we find a cheaper path we update values
        if curCost < lowestCost:

            bestPath = curPath
            lowestCost = curCost
            bestYear = year
            allEdges = curEdges

    # Return json of cost, best path, year in which path occurred, and relaxed edges
    return jsonify({'cost': lowestCost,'bestPath': bestPath, 'bestYear': bestYear, 'allEdges': allEdges})

# Function that sends the path and returns coordiantes of each city in the path
@app.route('/get_coords', methods=['POST'])
def get_coords():

    # Get path from js json
    path = request.get_json()

    # Will hold the coordinates we return
    allCoords = []

    # For each city in the path, get the coords from the dictionary and then add it
    for indx in range(len(path)):

        allCoords.append(coords[path[indx]])

    return jsonify({'coords': allCoords})

# Function that was used to create CSV for coordinates
# @app.route('/temp', methods=['GET'])
# def temp():

#     allCities = set()

#     # Loop through each graph (each year) and union the sets of unique cities
#     for i in range(5):
#         allCities.update(graphs[i].uniqueCities())

#     # Convert to list so it can be converted into json
#     allCitiesList = list(allCities)

#     return jsonify({"allCities": allCitiesList})
