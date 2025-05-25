#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
npm install
cd client
npm install
npm run build
cd ..

cd server
npm install 