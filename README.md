# Spartacus - Angular Storefront

---

## Installation

Minimum Requirements

```
Node.js >= 8.9.0
yarn >= 1.6.0
```

Install dependencies:

```
$ yarn install
```

Start the angular app.

```
$ yarn start
```

Then point your browser to http://localhost:4200/

---

## Development tools

### VS Code

This project is intended to be edited with [Microsoft Visial Studio Code](https://code.visualstudio.com)

#### Workspace Extensions

The development team relies on a few extensions for productivity and code compliance. When you open the source folder in vscode, if you are missing some of these recommended extensions, vscode will prompt you for installation. The list of recommended extensions is found in '.vscode/extensions.json'.

Please make sure you install them.

#### Workspace settings

These are vscode settings the team relies on. They are shared and enforced via vscode workspace settings. If you want to change something, propose the change don't just commit it, so the whole team uses it.

### Browser: Google Chrome

For development, Google Chrome is recommended. There is a "Debugger for Chrome" extension for vscode in the workspace extensions. This allows you to place breakpoint in typescript from vscode and debug the app from vscode.
Chrome also manages well security exceptions that are needed to get the application running in a development environment.

### Mock data during development

In order to be completely decoupled from the backend we connect our application to a local mock server. This requires the following setup:

* A json-server that provides static or dynamic mock data.
* rerouting of backend calls to the mock server.

This project provides the following commands to run this setup:

* start the webpack dev server with a proxy: `npm run start:mock`
* run [json-server](https://github.com/typicode/json-server): `npm run mockserver`.

The mock data can either be static or dynamically generated. With static mode full CRUD operations are supported. Since the mocked data is not part of the code it will not end up in our production bundles. When mock data is generated, [faker.js](https://github.com/Marak/faker.js) can be used to generate fake data.

All backend request are proxied to the json-server (runs on port 3000 by default). The proxy is part of the embedded webpack dev server. Multiple proxy configurations can be used.
