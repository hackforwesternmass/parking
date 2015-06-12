#!/usr/bin/env python

import sys
import os
import csv

import api
from api import db

def main():
    if len(sys.argv) == 1:
        csvdir = os.path.join(os.path.dirname(os.path.dirname(
            os.path.dirname(os.path.realpath(__file__)))), '../', 'assets')
    else:
        csvdir = sys.argv[1]

    db.session.query(api.Meter).delete()
    db.session.query(api.Garage).delete()
    db.session.commit()

    with open(os.path.join(csvdir, 'on-street-metered-parking.csv'), 'rU') as f:
        for row in csv.reader(f):
            (street, address, side, street_from, street_to, id, mech_id,
             model, door, vault, issues) = row

            meter = api.Meter()
            meter.street = street.rstrip('E')
            meter.address = address
            meter.side = side
            meter.street_from = street_from
            meter.street_to = street_to
            meter.id = id
            meter.mech_id = int(mech_id)
            meter.door = door
            meter.vault = vault
            meter.issues = issues

            db.session.add(meter)

    with open(os.path.join(csvdir, 'parking-garages.csv'), 'rU') as f:
        for row in csv.reader(f):
            (location_number, facility, street, address, lat, lon, spaces,
             cost) = row

            garage = api.Garage()
            garage.id = int(location_number)
            garage.facility = facility
            garage.street = street
            garage.address = address
            garage.lat = float(lat)
            garage.lon = float(lon)
            garage.spaces = int(spaces)
            garage.cost = int(cost[1:])
            db.session.add(garage)

    db.commit()



if __name__ == '__main__':
    main()