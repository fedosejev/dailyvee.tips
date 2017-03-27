#!/bin/bash

# Build content and static files
npm run build
npm run html

# Replace placeholder with rendered html
node ./utils/html
rm docs/js/html.js

# Commit and push
git checkout master
git add .
git commit -m "Update"
git push
