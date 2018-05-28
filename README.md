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

Build the storefrontlib

```
ng build storefrontlib
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
