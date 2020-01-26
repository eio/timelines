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
	if 'ais' in datatype:
		outfile.write("export var AIS_EVENTS = %s%s" % (json.dumps(eventlist), ';'))
	elif 'ads-b' in datatype:
		outfile.write("export var ADSB_EVENTS = %s%s" % (json.dumps(eventlist), ';'))
	elif 'gnss-ro' in datatype:
		outfile.write("export var RO_EVENTS = %s%s" % (json.dumps(eventlist), ';'))
	elif 'gnss-r' in datatype:
		outfile.write("export var R_EVENTS = %s%s" % (json.dumps(eventlist), ';'))
	elif 'space-weather' in datatype:
		outfile.write("export var SW_EVENTS = %s%s" % (json.dumps(eventlist), ';'))