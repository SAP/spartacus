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

Build the storefrontlib

```bash
ng build storefrontlib
```

Start the angular app.

```bash
yarn start
```

Then point your browser to http://localhost:4200/

---

## Developing library code

When developing library code, you have to rebuild the library each time you want to see and test your changes in the running app. The Anguar 6 docs give some explanations in [Why do I need to build the library everytime I make changes?](https://github.com/angular/angular-cli/wiki/stories-create-library#why-do-i-need-to-build-the-library-everytime-i-make-changes)

That being said, there is a way to configure the workspace so the lib code is buit like a standalone application, giving the developer the convenience of hot reloading changes.

**WARNING:** This configuration is optional and should only be used for convenience on local development environments. **It should never be commited back to git.**

Here is how it's done: In the tsconfig.json file at the root of the repo, change this:

```json
    "paths": {
      "storefrontlib": [
        "dist/storefrontlib"
      ]
    }
```

And use this instead:

```json
    "paths": {
      "storefrontlib": [
        "projects/storefrontlib/src/public_api"
      ]
    }
```

## Production

### Building for production

To create a production build (with `aot` and other various optimizations), run:

```
yarn build:core:lib --prod
yarn build --prod
```

These commands are equivalent to the following `ng` commands, respectively:

```
ng build storefrontlib --prod
ng build --prod
```

This creates javascript files that are stored in `dist` folder, and those have to be deployed to a production-ready server, i.e [`nginx`](https://www.nginx.com/) or other.

### Running a production build

As part of our definition of done, we should test our feature branches before merging against a production build. To test it, we use the following commands:

```
yarn build:core:lib --prod
yarn start --prod
```

These commands are equivalent to the following `ng` commands, respectively:

```
ng build storefrontlib --prod
ng serve --prod
```

However, after we added the service worker (SW) file to our codebase, we are getting the following error in the browser's console after running a production build:

```
A bad HTTP response code (404) was received when fetching the script.
Failed to load resource: net::ERR_INVALID_RESPONSE
main.0e8d920201461b5fa835.js:1 ERROR Error: Uncaught (in promise): TypeError: Failed to register a ServiceWorker: A bad HTTP response code (404) was received when fetching the script.
TypeError: Failed to register a ServiceWorker: A bad HTTP response code (404) was received when fetching the script.
    at P (polyfills.0374c798ca6892ab6b5e.js:1)
    at polyfills.0374c798ca6892ab6b5e.js:1
    at polyfills.0374c798ca6892ab6b5e.js:1
    at t.invoke (polyfills.0374c798ca6892ab6b5e.js:1)
    at Object.onInvoke (main.0e8d920201461b5fa835.js:1)
    at t.invoke (polyfills.0374c798ca6892ab6b5e.js:1)
    at e.run (polyfills.0374c798ca6892ab6b5e.js:1)
    at polyfills.0374c798ca6892ab6b5e.js:1
    at t.invokeTask (polyfills.0374c798ca6892ab6b5e.js:1)
    at Object.onInvokeTask (main.0e8d920201461b5fa835.js:1)
```

Navigating to the browser's `Application` tab, we can see that the SW didn't start.

This error affects only PWA functionlities, becuase the SW didn't start. Developing and testing other features on a production build can continue without any interuptions. Thus, when developing features that are not related to PWA, one can continue to use `yarn start --prod`.

To avoid caching our application during development, the SW is only activated in a production build. For this, and some other reasons, the webpack's development server doesn't support SWs. Thus, we are using [`http-server`](https://github.com/indexzero/http-server) for testing PWA features.

The only way to test/run PWA build is to:

```
yarn build:core:lib --prod
yarn build --prod
yarn start:pwa  // this will start the http-server
```

When the server is up, navigate to [`http://localhost:3000/`](http://localhost:3000/).
Notice that there isn't an error about a SW, like we had above.

If we navigate to the browser's `Application` tab, we can see that the SW is running.

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
