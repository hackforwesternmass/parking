#!/usr/bin/env python

import sys
import os
import csv

import api
from api import db

def main():
    if len(sys.argv) == 1:
        csvdir = os.path.join(os.path.dirname(
            os.path.dirname(os.path.realpath(__file__))), '..', 'assets')
    else:
        csvdir = sys.argv[1]

    db.session.query(api.Meter).delete()
    db.session.query(api.Garage).delete()
    db.session.commit()

    with open(os.path.join(csvdir, 'on-street-metered-parking.csv'), 'rU') as f:
        reader = csv.reader(f)
        next(reader, None)

        for row in reader:
            (street, address, side, street_from, street_to, id, mech_id,
             model, door, vault, issues, spaces, time) = row

            meter = api.Meter()
            meter.street = street
            meter.address = address.rstrip('E') if address else None
            meter.side = side
            meter.street_from = street_from
            meter.street_to = street_to
            meter.id = id
            meter.mech_id = int(mech_id) if mech_id else None
            meter.model = model
            meter.door = door
            meter.vault = vault
            meter.issues = issues
            meter.spaces = int(spaces)
            meter.time = time

            db.session.add(meter)

    with open(os.path.join(csvdir, 'parking-garages.csv'), 'rU') as f:
        reader = csv.reader(f)
        next(reader, None)

        for row in reader:
            (location_number, facility, address, street, lat, lon, spaces,
             cost) = row

            garage = api.Garage()
            garage.id = int(location_number)
            garage.facility = facility
            garage.street = street
            garage.address = address
            garage.latitude = float(lat)
            garage.longitude = float(lon)
            garage.spaces = int(spaces)
            garage.cost = int(cost[1:])
            db.session.add(garage)

    db.session.commit()



if __name__ == '__main__':
    main()