# Spartacus - Angular Storefront

---

## Minimum Requirements

```
Node.js >= 8.9.0
yarn >= 1.6.0
Read access to Artifactory (https://repository.hybris.com)
```

## Dependencies Configuration

This is a one time setup. We pull all of our dependencies from our internal npm registry (artifactory). In order for you to be able to do this, you need to do the following:

1.  Login to [artifactory](https://repository.hybris.com/webapp/#/login)
2.  Once you have login, there should be an `npm repository` link on the homepage, in the "Set Me Up" section. Click on it and a popup window with instructions will appear.
3.  Enter your password in the upper right. This will populate the commands with your encrypted password. This way you can copy and paste the commands directly in the terminal.
4.  Out of all the commands in the popup, you will only need to run the first one on your machine. It looks like:

```
$ curl -u[firstname.lastname@sap.com]:[encryptedpassword] https://repository.hybris.com/api/npm/auth
```

As instructed next, paste the result in your ~/.npmrc file (create the file if it doesn't exist)

The last step is to add this line to ~/.npmrc:

```
registry=https://repository.hybris.com/api/npm/npm-repository/
```

That's it. For a quick way to confirm your new config, you can run:

```
$ yarn config list
```

You should see your new ~/.npmrc configurations at the end of the list, in the `info npm config` section.

## Installation Steps

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
