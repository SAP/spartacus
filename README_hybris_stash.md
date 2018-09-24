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
2.  Once you have logged in, there should be an `npm repository` section on the homepage in the `Set Me Up` section. Click on it and a popup window with instructions will appear.
3.  Enter your password in the upper right. This will populate the commands with your encrypted password. This way you can copy and paste the commands directly in the terminal.
4.  Find the section titled "Using basic authentication", and copy it contents and paste it in your ~/.npmrc file (create the file if it doesn't exist). It should look like:

```bash
_auth = <USERNAME>:<PASSWORD> (converted to base 64)
email = firstname.lastname@sap.com
always-auth = true
```

The last step is to add this line to ~/.npmrc (so that npm packages can be downloaded from artifactory instead of the npm public registry):

```bash
registry=https://repository.hybris.com/api/npm/npm-repository/
```

That's it. For a quick way to confirm your new config, you can run:

```bash
yarn config list
```

You should see your new ~/.npmrc configurations at the end of the list, in the `info npm config` section.

## Installation Steps

Install dependencies:

```bash
yarn install
```

Start the angular app.

```bash
yarn start
```

Then point your browser to http://localhost:4200/

---

## Developing library code

Most of the code is developed in separated libraries. The library code is build with ngPackagr, while the application is build with webpack. The two different separate builds might slow down the development process, which is why by default in development mode, the build is done by webpack only.

Using two separate build processes complicates development, especially when the developer both implements library code and application code. In order to allow for a seamless build, in development mode both library and application code is build with webpack. We're relying on the standard angular-cli flags for production and development; development is the default, production mode is used when using the 'qa' build environment.
For convenience reasons, a package.json script is added to start the application in production mode with the 'qa' environment like so: `yarn start:qa`.

The IDE will use the library sources by default.

**WARNING:** Running in dev mode should only be used for convenience on local development environments. New code merged in develop should be tested against a regular library build and also production mode. The Anguar 6 docs give some explanations in [Why do I need to build the library everytime I make changes?](https://github.com/angular/angular-cli/wiki/stories-create-library#why-do-i-need-to-build-the-library-everytime-i-make-changes)

## Production

### Running in prod mode

As a developer or QA specialist, we need to run the storefront in "prod mode" to make sure everything will work fine when the app will be build for production. This is done using these 2 commands to build storefrontlib and the launch the app in prod mode:

```
yarn build:core:lib
yarn start:qa
```

## Development tools

### Code Editor: VS Code

We use [Microsoft Visual Studio Code](https://code.visualstudio.com) for development. We rely on a series of features and plugins from it.

#### VS Code Workspace Extensions

The development team relies on a few extensions for productivity and code compliance. When you open the source folder in vscode, if you are missing some of these recommended extensions, vscode will prompt you for installation. The list of recommended extensions is found in '.vscode/extensions.json'.

Please make sure you install them.

#### VS Code Workspace settings

These are vscode settings the team relies on. They are shared and enforced via vscode workspace settings. If you want to add or change something, propose the change to the team instead of just commiting it, so the whole team uses it and can benefit from it.

### Browser: Google Chrome

For development, Google Chrome is recommended. There is a "Debugger for Chrome" extension for vscode in the workspace extensions. This allows you to place breakpoint in typescript from vscode and debug the app from vscode.
Chrome also manages well security exceptions that are needed to get the application running in a development environment.
