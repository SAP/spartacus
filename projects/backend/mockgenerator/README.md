# Mock server for Spartacus

Mock Server is an util to create mocked API for Spartacus Storefront.
Server is based on `json-server`.
The data, taken from a real backend, is saved to `db.json` file. If the data has fields which should be anonymised, server will change/fake those fields, using `Faker.js`.

## Installation

`yarn install`

## Start

`yarn start`

This command starts the server, taking the data from `db.json` file, located in the root of the project.

If `db.json` file doesn't exist yet, simply run `yarn generate`.

## Available commands

- `yarn start` - starts the server (`db.json` file *must* exist)
- `yarn start:dynamic` - starts the server (the data is generated dynamically and not taken from `db.json` file)
- `yarn build` - builds the server files
- `yarn generate` - generates `db.json`

## Links

- https://github.com/typicode/json-server
- https://github.com/marak/Faker.js/