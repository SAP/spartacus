#!/usr/bin/env bash

# Install pngquant if missing
if ! command -v pngquant &> /dev/null; then
  echo "pngquant not found. Installing..."
  sudo apt-get update && sudo apt-get install -y pngquant
fi

SCREENSHOT_DIR="projects/storefrontapp-e2e-cypress/cypress/screenshots"

if [ -d "$SCREENSHOT_DIR" ]; then
  echo "Compressing PNG screenshots in $SCREENSHOT_DIR..."
  find "$SCREENSHOT_DIR" -type f -name "*.png" -exec pngquant --quality=60-80 --ext .png --force {} \;
else
  echo "No screenshots directory found."
fi
