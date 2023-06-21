#!/bin/bash

# Install dependencies
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created successfully."
else
    echo ".env file was found."
fi

# Start the server
npm start

read -r -p "Wait 5 seconds or press any key to continue immediately" -t 5123123 -n 1 -s

