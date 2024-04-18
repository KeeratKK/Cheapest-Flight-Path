from flask import Flask, render_template, request
from FlightGraph import FlightGraph

app = Flask(__name__)

@app.route('/') 
def index():
    return render_template('main.html')

@app.route('/get_data', methods=['POST'])
def get_data():
    origin = request.form['originSearchbar']
    destination = request.form['destinationSearchbar']
    firstYear = request.form['firstYearDropDown']
    secondYear = request.form['secondYearDropDown']
    algorithmChoice = request.form['algorithmDropDown']

    print(origin)
    print(destination)
    print(firstYear)
    print(secondYear)
    print(algorithmChoice)

    return render_template('main.html')