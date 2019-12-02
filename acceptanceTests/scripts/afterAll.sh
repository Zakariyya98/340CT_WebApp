#!/usr/bin/env bash

set -e
echo afterAll
#Delete the databases that were used for the acceptance testing.
FILE=website.db
if test -f "$FILE"; then
    rm -rf website.db
fi
#Restore the databases from before the acceptance tests were run, and delete the backups.
FILE=websiteBackup.db
if test -f "$FILE"; then
    cp websiteBackup.db website.db
    rm -rf websiteBackup.db
fi


