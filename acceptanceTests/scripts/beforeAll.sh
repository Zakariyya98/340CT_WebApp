#!/usr/bin/env bash

set -e
echo beforeAll

#Make backups of the databases.
FILE=website.db
if test -f "$FILE"; then
    cp website.db websiteBackup.db
    rm -rf website.db
fi

