#!/bin/bash

# Define the directory
config_dir="scripts/install"

# Check if the config_dir directory exists
if [ ! -d "${config_dir}" ]; then
    # If not, create it
    mkdir -p "${config_dir}"
fi

# Ask for user input
read -p "Enter the type of site (b2c or b2b): " site_type
read -p "Enter the version to use: " version
read -s -p "Enter your npm token: " npm_token

# Check if config.sh already exists in the config_dir directory
if [ -f "${config_dir}/config.sh" ]; then
    echo "config.sh already exists in ${config_dir}. Removing it..."
    rm "${config_dir}/config.sh"
fi

# Copy the content of config.default.sh to config.sh
cp "${config_dir}/config.default.sh" "${config_dir}/config.sh"
echo "config.sh has been created in ${config_dir}."

# Set the BASE_SITE value based on user input
if [ "${site_type}" == "b2c" ]; then
    sed -i '' 's/^BASE_SITE=.*/BASE_SITE="electronics-spa"/' "${config_dir}/config.sh"
    sed -i '' 's/^SSR_APP_NAME=.*/SSR_APP_NAME="spartacusstore"/' "${config_dir}/config.sh"
elif [ "${site_type}" == "b2b" ]; then
    sed -i '' 's/^BASE_SITE=.*/BASE_SITE="powertools-spa"/' "${config_dir}/config.sh"
    sed -i '' 's/^SSR_APP_NAME=.*/SSR_APP_NAME="b2bspastore"/' "${config_dir}/config.sh"
else
    echo "Invalid site type. BASE_SITE and SSR_APP_NAME not set."
fi

# Set the SPARTACUS_VERSION value based on user input
sed -i '' "s/^SPARTACUS_VERSION=.*/SPARTACUS_VERSION='${version}'/" "${config_dir}/config.sh"

# Set the NPM_TOKEN value based on user input
sed -i '' "s/^NPM_TOKEN=.*/NPM_TOKEN='${npm_token}'/" "${config_dir}/config.sh"

# Set the NPM_URL value
sed -i '' "s|^NPM_URL=.*|NPM_URL='https://73554900100900004337.dev.npmsrv.base.repositories.cloud.sap/'|" "${config_dir}/config.sh"

# Define the file location
file_location="../../../spartacus-${version}/apps/spartacusstore/src/app/spartacus/spartacus-configuration.module.ts"

# Navigate to the directory and run the script
cd "${config_dir}" && bash "./run.sh" install_npm

# Check if the file exists
if [ -f "${file_location}" ]; then
    # Comment out baseUrl in spartacus configuration
    sed -i '' 's/baseUrl/\/\/baseUrl/1' "${file_location}"
    echo "Modified ${file_location}."
else
    echo "${file_location} does not exist."
fi