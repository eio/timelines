import csv
import json
import argparse

parser = argparse.ArgumentParser(description='Convert CSV to JSON.')
parser.add_argument('inputf', help='The CSV filepath.')

args = parser.parse_args()

eventlist = []

with open(args.inputf, 'r') as csvfile:
  reader = csv.DictReader(csvfile)
  for e in reader:
    eventlist.append(e)

datatype = args.inputf.replace('.csv','')

with open(datatype+'.js', 'w') as outfile:
  outfile.write("export var EVENTS = %s%s" % (json.dumps(eventlist), ';'))
