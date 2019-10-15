import csv
import json

eventslist = []

with open('events.csv', 'r') as csvfile:
  reader = csv.DictReader(csvfile)
  for event in reader:
    eventslist.append(event)

with open('events.js', 'w') as outfile:
  outfile.write("var EVENTS = %s%s" % (json.dumps(eventslist), ';'))
