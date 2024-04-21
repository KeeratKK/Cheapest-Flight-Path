// Array with a string representing the "City, State (Abb.)" name of every city in the data.
const cities = ['Aberdeen, SD', 'Abilene, TX', 'Albany, GA', 'Albany, NY', 'Albuquerque, NM', 'Alexandria, LA', 'Allentown/Bethlehem/Easton, PA', 'Amarillo, TX', 'Appleton, WI', 'Asheville, NC', 'Ashland, WV', 'Aspen, CO', 'Atlanta, GA (Metropolitan Area)', 'Atlantic City, NJ', 'Augusta, GA', 'Austin, TX', 'Bakersfield, CA', 'Bangor, ME', 'Baton Rouge, LA', 'Beaumont/Port Arthur, TX', 'Belleville, IL', 'Bellingham, WA', 'Bemidji, MN', 'Bend/Redmond, OR', 'Billings, MT', 'Binghamton, NY', 'Birmingham, AL', 'Bishop, CA', 'Bismarck/Mandan, ND', 'Bloomington/Normal, IL', 'Boise, ID', 'Boston, MA (Metropolitan Area)', 'Bozeman, MT', 'Brainerd, MN', 'Branson, MO', 'Bristol/Johnson City/Kingsport, TN', 'Brownsville, TX', 'Brunswick, GA', 'Buffalo, NY', 'Burlington, VT', 'Butte, MT', 'Cape Girardeau, MO', 'Casper, WY', 'Cedar City, UT', 'Cedar Rapids/Iowa City, IA', 'Champaign/Urbana, IL', 'Charleston, SC', 'Charleston/Dunbar, WV', 'Charlotte, NC', 'Charlottesville, VA', 'Chattanooga, TN', 'Cheyenne, WY', 'Chicago, IL', 'Cincinnati, OH', 'Clarksburg/Fairmont, WV', 'Cleveland, OH (Metropolitan Area)', 'Cody, WY', 'College Station/Bryan, TX', 'Colorado Springs, CO', 'Columbia, SC', 'Columbus, GA', 'Columbus, MS', 'Columbus, OH', 'Concord, NC', 'Corpus Christi, TX', 'Dallas/Fort Worth, TX', 'Dayton, OH', 'Daytona Beach, FL', 'Del Rio, TX', 'Denver, CO', 'Des Moines, IA', 'Detroit, MI', 'Devils Lake, ND', 'Dickinson, ND', 'Dothan, AL', 'Dubuque, IA', 'Duluth, MN', 'Durango, CO', 'Eagle, CO', 'Eau Claire, WI', 'El Paso, TX', 'Elko, NV', 'Elmira/Corning, NY', 'Erie, PA', 'Escanaba, MI', 'Eugene, OR', 'Eureka/Arcata, CA', 'Evansville, IN', 'Everett, WA', 'Fargo, ND', 'Fayetteville, AR', 'Fayetteville, NC', 'Flagstaff, AZ', 'Flint, MI', 'Florence, SC', 'Fort Collins/Loveland, CO', 'Fort Myers, FL', 'Fort Smith, AR', 'Fort Wayne, IN', 'Fresno, CA', 'Gainesville, FL', 'Garden City, KS', 'Gillette, WY', 'Grand Forks, ND', 'Grand Island, NE', 'Grand Junction, CO', 'Grand Rapids, MI', 'Great Falls, MT', 'Green Bay, WI', 'Greensboro/High Point, NC', 'Greenville, NC', 'Greenville/Spartanburg, SC', 'Gulfport/Biloxi, MS', 'Gunnison, CO', 'Hagerstown, MD', 'Hancock/Houghton, MI', 'Harlingen/San Benito, TX', 'Harrisburg, PA', 'Hartford, CT', 'Hattiesburg/Laurel, MS', 'Hays, KS', 'Helena, MT', 'Hilton Head, SC', 'Hobbs, NM', 'Houston, TX', 'Huntsville, AL', 'Hyannis, MA', 'Idaho Falls, ID', 'Indianapolis, IN', 'International Falls, MN', 'Iron Mountain/Kingsfd, MI', 'Ithaca/Cortland, NY', 'Jackson, WY', 'Jackson/Vicksburg, MS', 'Jacksonville, FL', 'Jacksonville/Camp Lejeune, NC', 'Jamestown, ND', 'Jefferson City/Columbia, MO', 'Joplin, MO', 'Kalamazoo, MI', 'Kalispell, MT', 'Kansas City, MO', 'Kearney, NE', 'Key West, FL', 'Killeen, TX', 'Knoxville, TN', 'La Crosse, WI', 'Lafayette, LA', 'Lake Charles, LA', 'Lansing, MI', 'Laredo, TX', 'Las Vegas, NV', 'Latrobe, PA', 'Lawton/Fort Sill, OK', 'Lewisburg, WV', 'Lewiston, ID', 'Lexington, KY', 'Liberal, KS', 'Lincoln, NE', 'Little Rock, AR', 'Longview, TX', 'Los Angeles, CA (Metropolitan Area)', 'Louisville, KY', 'Lubbock, TX', 'Lynchburg, VA', 'Madison, WI', 'Mammoth Lakes, CA', 'Manhattan/Ft. Riley, KS', 'Marquette, MI', "Martha's Vineyard, MA", 'Medford, OR', 'Melbourne, FL', 'Memphis, TN', 'Meridian, MS', 'Miami, FL (Metropolitan Area)', 'Midland/Odessa, TX', 'Milwaukee, WI', 'Minneapolis/St. Paul, MN', 'Minot, ND', 'Mission/McAllen/Edinburg, TX', 'Missoula, MT', 'Moab, UT', 'Mobile, AL', 'Monroe, LA', 'Montgomery, AL', 'Montrose/Delta, CO', 'Myrtle Beach, SC', 'Nantucket, MA', 'Nashville, TN', 'New Bern/Morehead/Beaufort, NC', 'New Haven, CT', 'New Orleans, LA', 'New York City, NY (Metropolitan Area)', 'Niagara Falls, NY', 'Norfolk, VA (Metropolitan Area)', 'North Bend/Coos Bay, OR', 'North Platte, NE', 'Ogden, UT', 'Ogdensburg, NY', 'Oklahoma City, OK', 'Omaha, NE', 'Orlando, FL', 'Owensboro, KY', 'Paducah, KY', 'Palm Springs, CA', 'Panama City, FL', 'Pasco/Kennewick/Richland, WA', 'Paso Robles/San Luis Obispo, CA', 'Pellston, MI', 'Pensacola, FL', 'Peoria, IL', 'Philadelphia, PA', 'Philipsburg/State College, PA', 'Phoenix, AZ', 'Pierre, SD', 'Pittsburgh, PA', 'Plattsburgh, NY', 'Pocatello, ID', 'Portland, ME', 'Portland, OR', 'Portsmouth, NH', 'Prescott, AZ', 'Presque Isle/Houlton, ME', 'Provincetown, MA', 'Provo, UT', 'Pullman, WA', 'Punta Gorda, FL', 'Quad Cities, IL (Metropolitan Area)', 'Quincy, IL', 'Raleigh/Durham, NC', 'Rapid City, SD', 'Redding, CA', 'Reno, NV', 'Rhinelander, WI', 'Richmond, VA', 'Roanoke, VA', 'Rochester, MN', 'Rochester, NY', 'Rock Springs, WY', 'Rockford, IL', 'Roswell, NM', 'Sacramento, CA', 'Saginaw/Bay City/Midland, MI', 'Salina, KS', 'Salinas/Monterey, CA', 'Salisbury, MD', 'Salt Lake City, UT', 'San Angelo, TX', 'San Antonio, TX', 'San Bernardino, CA', 'San Diego, CA', 'San Francisco, CA (Metropolitan Area)', 'Sanford, FL', 'Santa Barbara, CA', 'Santa Fe, NM', 'Santa Maria, CA', 'Santa Rosa, CA', 'Sarasota/Bradenton, FL', 'Sault Ste. Marie, MI', 'Savannah, GA', 'Scottsbluff, NE', 'Scranton/Wilkes-Barre, PA', 'Seattle, WA', 'Shreveport, LA', 'Sioux City, IA', 'Sioux Falls, SD', 'South Bend, IN', 'Spokane, WA', 'Springfield, IL', 'Springfield, MO', 'St. Cloud, MN', 'St. George, UT', 'St. Louis, MO', 'Staunton, VA', 'Steamboat Springs, CO', 'Stillwater, OK', 'Stockton, CA', 'Sun Valley/Hailey/Ketchum, ID', 'Syracuse, NY', 'Tallahassee, FL', 'Tampa, FL (Metropolitan Area)', 'Texarkana, AR', 'Toledo, OH', 'Traverse City, MI', 'Trenton, NJ', 'Tucson, AZ', 'Tulsa, OK', 'Twin Falls, ID', 'Tyler, TX', 'Valdosta, GA', 'Valparaiso, FL', 'Vernal, UT', 'Vero Beach, FL', 'Waco, TX', 'Walla Walla, WA', 'Washington, DC (Metropolitan Area)', 'Waterloo, IA', 'Watertown, NY', 'Watertown, SD', 'Wausau/Mosinee/Stevens Point, WI', 'Wenatchee, WA', 'West Palm Beach/Palm Beach, FL', 'West Yellowstone, MT', 'Wichita, KS', 'Williston, ND', 'Wilmington, DE', 'Wilmington, NC', 'Worcester, MA', 'Yakima, WA', 'Yuma, AZ'];

// Declare two HTMLElements that correspond to the origin searchbar and the list of suggestions respectively.
const originSearch = document.getElementById('originSearchbar');
const originSuggestions = document.getElementById('origin-suggestions');

// Checks if user has typed anything into the origin searchbar; if yes, adds li elements to the origin-suggestions ul
// element in the main.html file based off of the alphabetically similar names in the cities list.
originSearch.addEventListener('input', () => {
    const searchVal = originSearch.value.toLowerCase();
    if(searchVal !== '') {  // Makes sure the user has inputted something before filtering.
        const filterSuggestions = cities.filter(cities =>
            cities.toLowerCase().startsWith(searchVal)
        );

        originSuggestions.innerHTML = '';

        for(let i = 0; i < filterSuggestions.length && i < 5; i++) {
            const li = document.createElement('li');
            li.textContent = filterSuggestions[i];
            originSuggestions.appendChild(li);
        }
    }
});

// Sets the value to the list item the user clicked on.
originSuggestions.addEventListener('click', () => {
    if(event.target.tagName === 'LI') {
        originSearch.value = event.target.textContent;
        originSuggestions.innerHTML = '';
    }
});


// Declare two HTMLElements that correspond to the destination searchbar and the list of suggestions respectively.
const destinationSearch = document.getElementById('destinationSearchbar');
const destinationSuggestions = document.getElementById('destination-suggestions');

// Checks if user has typed anything into the destination searchbar; if yes, adds li elements to the destination-suggestions ul
// element in the main.html file based off of the alphabetically similar names in the cities list.
destinationSearch.addEventListener('input', () => {
    const searchVal = destinationSearch.value.toLowerCase();
    if(searchVal !== '') {  // Makes sure the user has inputted something before filtering.
        const filterSuggestions = cities.filter(cities =>
            cities.toLowerCase().startsWith(searchVal)
        );

        destinationSuggestions.innerHTML = '';

        for(let i = 0; i < filterSuggestions.length && i < 5; i++) {
            const li = document.createElement('li');
            li.textContent = filterSuggestions[i];
            destinationSuggestions.appendChild(li);
        }
    }
});

// Sets the value to the list item the user clicked on.
destinationSuggestions.addEventListener('click', () => {
    if(event.target.tagName === 'LI') {
        destinationSearch.value = event.target.textContent;
        destinationSuggestions.innerHTML = '';
    }
});

// If the user clicks off of the origin or destination search bars, all values are reset to empty.
window.addEventListener('click', (e) => {
    if(!destinationSuggestions.contains(e.target) && destinationSuggestions.innerHTML !== '') {
        destinationSearch.value = '';
        destinationSuggestions.innerHTML = '';
    }
    if(!originSuggestions.contains(e.target) && originSuggestions.innerHTML !== '') {
        originSearch.value = '';
        originSuggestions.innerHTML = '';
    }
});



