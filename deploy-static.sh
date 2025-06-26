#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Create docs directory
echo "Creating docs directory..."
mkdir -p docs

# Copy dist contents to docs
echo "Copying build files to docs..."
cp -r dist/* docs/

# Add docs folder to git
echo "Adding docs to git..."
git add docs/

# Commit
echo "Committing changes..."
git commit -m "Deploy to GitHub Pages (static files)"

# Push to main
echo "Pushing to main..."
git push origin main

echo "Deployment complete! Make sure to set GitHub Pages source to 'main' branch and '/docs' folder in repository settings." 