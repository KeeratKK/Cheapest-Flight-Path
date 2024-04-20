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
async function drawLine(mapObj, origin, destination) {
    // Get the [longitude, latitude] coordinates for the origin and destination.
    const originCoords = await getCoords(origin);
    const destinationCoords = await getCoords(destination);

    // Error in case the city names do not pull up coordinates (may need to edit what happens when it errors).
    if(originCoords === null || destinationCoords === null) {
        return;
    }

    drawnLines.push(`${origin}_to_${destination}`); // Keeps track of drawn lines so we can remove later

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
            'line-color': '#E5DCEB',
            'line-width': 1,
            'line-opacity': 0.9
        }
    });
}

// Creates the MapBox in the div with id 'mapbox'.
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbXljIiwiYSI6ImNsdjJ5Y2dmOTBvNngyanFtcDhxMm85dzMifQ.FLHD9CZrgnBjBQMXCZlVlA';
let mapbox = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/adamyc/clv2yh9ic01sl01p6525f1yvk',
    center: [-97.327, 38.181],
    zoom: 3.25
})

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

    console.log(drawnLines.length);

    while(drawnLines.length > 0) {
        const lineID = drawnLines.pop();

        mapbox.removeLayer(lineID);
        mapbox.removeSource(lineID);

    }
    
    for(let i = 1; i < path.length; i++) {
        const destination = path[i].split(',')[0].trim();
        const source = path[i - 1].split(',')[0].trim();

        drawLine(mapbox, source, destination);
    }


}