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

# Deploy on GitHub Pages
# git subtree split --prefix build -b gh-pages
# git push origin gh-pages
# git branch -d gh-pages
