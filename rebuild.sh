#!/bin/bash

echo 'Removing ./dist'
rm -rf dist/

echo 'Building...'
tsc

echo 'Done'
