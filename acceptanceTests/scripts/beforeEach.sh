#!/usr/bin/env bash

set -e
echo beforeEach
#Delete the database files.
FILE=website.db
if test -f "$FILE"; then
    rm -rf website.db
fi