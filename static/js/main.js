// The getCoords() function takes in the parameter of a city name. This city name is manipulated with the MapBox
// API, and generates a URL from which to get city coordinates, in [longitude, latitude].

let drawnLines = [];

async function getCoords(cityName) {
    // Find the webpage correlated to the city name given.
    const cityURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=pk.eyJ1IjoiYWRhbXljIiwiYSI6ImNsdjJ5Y2dmOTBvNngyanFtcDhxMm85dzMifQ.FLHD9CZrgnBjBQMXCZlVlA`;
    let coordinates;

    try {           // Waits for the json from the webpage, and gets the coordinates from the json.
        const response = await fetch(cityURL);
        const data = await response.json();
        coordinates = data.features[0].geometry.coordinates;
    }
    catch (error) { // Returns null if there is an error.
        console.error('Error: ', error);
        coordinates = null;
    }

    return coordinates;
}

// Given a MapBox object, origin name, and destination name, constructs a line. Calls getCoords on the given
// city names, and then adds a source to the MapBox through the GeoJSON MapBox API with the coordinates, and
// adds a layer based off of the source, drawing a line between the cities.
async function drawLine(mapObj, origin, destination, sourceCoords, finalCoords, finalPath) {
    // Get the [longitude, latitude] coordinates for the origin and destination.
    const originCoords = sourceCoords;
    const destinationCoords = finalCoords;

    // Error in case the city names do not pull up coordinates (may need to edit what happens when it errors).
    if(originCoords === null || destinationCoords === null) {
        return;
    }

    let color = '#FFAC1C';

    if(finalPath === true) {
        color = '#7F00FF';
    }
    
    // Adds the source to the MapBox through the GeoJSON.
    mapObj.addSource(`${origin}_to_${destination}`, {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [originCoords, destinationCoords]
            }
        }
    });
    
    
    // Adds the source as a layer, and styles the line.
    mapObj.addLayer({
        id: `${origin}_to_${destination}`,
        type: 'line',
        source: `${origin}_to_${destination}`, // This source property needs to have the same name as the source name added with the addSource() function.
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': color,
            'line-width': 5.0,
            'line-opacity': 0.9
        }
    });

    // if(color === 'grey') {
    //     drawnLines.push(`${origin}_to_${destination}`); // Keeps track of drawn lines so we can remove later
    // }

    drawnLines.push(`${origin}_to_${destination}`);
    
}   

// Draws the lines after the MapBox has loaded.
// mapbox.on('load', () => {
//     drawLine(mapbox, 'Idaho Falls', 'Tampa');
//     // drawLine(mapbox, 'Los Angeles', 'Chicago');
//     // drawLine(mapbox, 'Chicago', 'New York City');
//     // drawLine(mapbox, 'Los Angeles','Seattle');
//     // drawLine(mapbox, 'Seattle', 'New York City');
// });

// Ideally, add more features with MapBox API such as hovering over lines and cities to get information about
// flight data, city names, and better UX (i.e. hovering changes the thickness of a line).


async function displayPath(algoEdges, path) {

    if(algoEdges.length === 0) return;

    console.log(drawnLines.length);

    while(drawnLines.length > 0) {
        const lineID = drawnLines.pop();

        if(mapbox.getLayer(lineID)) {
            mapbox.removeLayer(lineID);
        }

        if(mapbox.getSource(lineID)) {
            mapbox.removeSource(lineID);
        }

    }

    let newPath = [];

    console.log(algoEdges.length);
    console.log(algoEdges[0]);

    for(let i = 0; i < algoEdges.length; i++) {
        newPath.push(algoEdges[i][0]);
        newPath.push(algoEdges[i][1]);
    }

    console.log(newPath.length);

    let coords = [];

    await $.ajax({
        type: 'POST',
        url: '/get_coords',
        data: JSON.stringify(newPath),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function(data) {
            coords = data.coords;
        }
    }); 

    console.log(coords);
    
    for(let i = 1; i < newPath.length; i++) {
        const destination = newPath[i];
        const source = newPath[i-1];

        // drawLine(mapbox, source, destination, coords[i-1], coords[i], 'orange');

        // await sleep(20);

        // await mapbox.removeLayer(`${source}_to_${destination}`);
        // await mapbox.removeSource(`${source}_to_${destination}`);
        
        drawLine(mapbox, source, destination, coords[i-1], coords[i], false);
        
        mapbox.setPaintProperty(`${source}_to_${destination}`, 'line-color', '#808080');
        mapbox.setPaintProperty(`${source}_to_${destination}`, 'line-width', 0.2);

        await sleep(10);
        
    }

    let finalPath = [];
    let curPathDrawn = [];

    for(let i  = 0; i < path.length; i++) {
        finalPath.push(path[i][0]);
    }

    for(let i = 1; i < finalPath.length; i++) {
        const destination = finalPath[i];
        const source = finalPath[i - 1];

        mapbox.setPaintProperty(`${source}_to_${destination}`, 'line-color', '#7F00FF');
        mapbox.setPaintProperty(`${source}_to_${destination}`, 'line-width', 5.0);

        curPathDrawn.push(`${source}_to_${destination}`);
    }

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    
    for(let i = 0; i < curPathDrawn.length; i++) {

        let curFlightCost = path[i+1][1] - path[i][1];

        mapbox.on('mouseenter', curPathDrawn[i], (e) => {
            mapbox.getCanvas().style.cursor = 'pointer';
    
            popup.setLngLat(e.lngLat).setHTML(curPathDrawn[i] + '<br /><br />Cost: ' + curFlightCost).addTo(mapbox);
        });
        mapbox.on('mouseleave', curPathDrawn[i], (e) => {
            mapbox.getCanvas().style.cursor = '';
            popup.remove();
        });
    }


}

// https://stackoverflow.com/questions/46942255/javascript-how-do-i-wait-x-seconds-before-running-next-line-of-code?noredirect=1&lq=1
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// This function is to initially create csv for coordinates of each city
// Helps because we dont need to repeatedly get coordiantes of city then

// async function createCSV(allCities) {

//     let rows = [];

//     for(let i = 0; i < allCities.length; i++) {
//         const cityName = allCities[i];
//         const coords = await getCoords(cityName);

//         coords.unshift(cityName);

//         rows.push(coords);
//     }

//     // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side?page=1&tab=scoredesc#tab-top
//     // Explains how to convert data into csv in JS

//     let csvContent = "data:text/csv;charset=utf-8,";

//     rows.forEach(function(rowArray) {
//         let row = rowArray.join(",");
//         csvContent += row + "\r\n";
//     });

//     let encodedUri = encodeURI(csvContent);
//     let link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "City_Coordinates.csv");
//     document.body.appendChild(link);
//     link.click();

// }


// Creates the MapBox in the div with id 'mapbox'.
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbXljIiwiYSI6ImNsdjJ5Y2dmOTBvNngyanFtcDhxMm85dzMifQ.FLHD9CZrgnBjBQMXCZlVlA';
let mapbox = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/adamyc/clv2yh9ic01sl01p6525f1yvk',
    center: [-97.327, 38.181],
    zoom: 3.25
});