# 3D WebGL Timeline #

Try it out here: https://eio.github.io/timeline/


# Controls #

Click a timeline milestone marker to expand event details.

<b>W:</b> forwards, <b>S:</b> backwards, <b>A:</b> left, <b>D:</b> right,
<b>R/F:</b> up/down, <b>Q/E:</b> roll, <b>&#8679;/&#8681;:</b> pitch, <b>&#8678;/&#8680;:</b> yaw<br/>


# Notes on Data #

To visualize your own set of events:

1) Create a new CSV file using `data/events.csv` as a reference 

2) Clean up any empty rows in your CSV by running the `data/trim_empty_csv_rows.py` Python script

3) Convert your CSV file to JSON in the expected `events.js` file by running the `data/csv_to_json.py` Python script

4) Open `index.html` in your favorite web browser


## Sources ##

https://www.nasa.gov/vision/earth/lookingatearth/cosmicf-20061130.html
https://www.nasa.gov/vision/earth/lookingatearth/cosmicf-20061130a.html
https://www.cosmic.ucar.edu/what-we-do/gnss-radio-occultation/
https://en.wikipedia.org/wiki/Radio_occultation
https://en.wikipedia.org/wiki/Spire_Global


## Running Locally ##

From the top-level dir run:
`python -m SimpleHTTPServer`

Then visit http://localhost:8000
