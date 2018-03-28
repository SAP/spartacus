# Spaccelerator

## Background

The SPAccelerator is a fancy name for a Single Page Application (SPA) template for Hybris Commerce. Similar to the accelerators this template will deliver a front-end implementation on top of Hybris Commerce. With a complete difference technology stack and the ability to deliver new features fast.

## Setup

Detailed setup is described at `https://wiki.hybris.com/display/pskb/SPAccelerator#SPAccelerator-Installation&Setup`.

## Development server

Run `ng run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Proxy backend requests to mock data

In order to be completely decoupled from the backend we connect our application to a local mock server. This requires the following setup:

* A json-server that provides static or dynamic mock data.
* rerouting of backend calls to the mock server.

This project provides the following commands to run this setup:

* start the webpack dev server with a proxy: `npm run start:mock`
* run [json-server](https://github.com/typicode/json-server): `npm run mockserver`.

The mock data can either be static or dynamically generated. With static mode full CRUD operations are supported. Since the mocked data is not part of the code it will not end up in our production bundles. When mock data is generated, [faker.js](https://github.com/Marak/faker.js) can be used to generate fake data.

All backend request are proxied to the json-server (runs on port 3000 by default). The proxy is part of the embedded webpack dev server. Multiple proxy configurations can be used.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `ng build --aot --prod` for an optimized code base.
