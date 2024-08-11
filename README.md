# SkySaver
### Cheapest Flight Path Finder
#### Created by Adam Cheng, Keerat Kohli, and Allan Zhang

<br>

#### Description

SkySaver is a flight visualization tool that finds the cheapest flight path, allowing connections, between two cities.
Using flight data from the US Department of Transportation, the program displays a shortest path algorithm (either
Dijkstra's or Bellman Ford's) in action, highlighting the final path in purple for the user to see. The user is able to
see the final cheapest cost, the runtime of the map display, and the year of the best flight path. 

The dataset of SkySaver only contains relatively major cities in the contiguous US, but is able to accommodate for a
wider range of cities, given more data. Additionally, the dataset only includes data from the years 2019-2023, but
likewise is able to accommodate for a larger range of years.

- Dataset : https://data.transportation.gov/Aviation/Consumer-Airfare-Report-Table-6-Contiguous-State-C/yj5y-b2ir/data_preview

<br>

#### Instructions to Run SkySaver

1. Head to the GitHub repository for SkySaver (https://github.com/KeeratKK/Cheapest-Flight-Path.git).
2. Download the ZIP file from the Code button in the repository.
3. Unpack the ZIP file.
4. In a terminal, change directories to the Cheapest-Flight-Path-main folder containing the project files.
5. If not already installed, install Python 3.12.0 (other Python versions probably also work).
6. If not already installed, install Flask with ```pip install flask```.
7. If not already installed, install Pandas with ```pip install pandas```.
8. Run the command ```python -m flask run```.
9. In the terminal, click the link that displays after running the above command.
10. You should now have the SkySaver webpage open; after inputting values for origin, destination, years, and algorithm,
    click the "Calculate!" button to generate results (you are able to continue testing more flights as long as the
    webpage is active).
11. To close the program, head back into the terminal and type "Ctrl + C".
12. If you wish to run the program later on, repeat steps 8-11.



https://github.com/user-attachments/assets/638728b6-c836-4514-98af-94ea4f2745f0


