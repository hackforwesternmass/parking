#!/usr/bin/env python

import sys
import os
import csv

def main():
    if len(sys.argv) == 1:
        csvdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../assets/')
    else:
        csvdir = sys.argv[1]

    with open(os.path.join(csvdir, 'on-street-metered-parking.csv'), 'rU') as f:
        for row in csv.reader(f):
            print ",".join(row)

if __name__ == '__main__':
    main()