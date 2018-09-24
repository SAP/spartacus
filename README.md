[![Build Status](https://travis-ci.com/SAP/cloud-commerce-spartacus-storefront-project.svg?token=yywzsFgC8dWSfJQxPGHs&branch=develop)](https://travis-ci.com/SAP/cloud-commerce-spartacus-storefront-project)

# What is Spartacus?

Spartacus is an extendable and configurable storefront for SAP Commerce Cloud, built as a lean, Angular-based, single-page web application. Unlike Accelerator templates, which are bundled with SAP Commerce Cloud, the Sparatcus storefront is decoupled from the SAP Commerce Cloud backend, and it communicates with the backend only through REST API calls.

Spartacus provides the core capabilities needed to build and deploy a branded frontend. The first iterations of Spartacus contain the basics of what an ecommerce storefront should include:

- home page
- search
- categories
- product details
- cart page
- adding to cart
- checkout
- order history

Soon after the first release to open source, the team behind Spartacus at SAP will add new functionality frequently.

The Spartacus storefront is built with upgradability and extensibility in mind, and contains the foundations for future Progressive Web App (PWA) functionality. Extending Spartacus is easy and fast, and seamless upgrades mean you can take advantage of the latest features with little effort.

Spartacus is released as open source to provide greater access to partners and customers who are developing storefronts for use with SAP Commerce. Providing Spartacus as open source also creates the opportunity for the SAP Commerce Cloud community to contribute back to the storefront. However, Spartacus will continue to be actively developed by SAP Commerce Cloud's Team Spartacus and other teams for a long time to come.

Read the [documentation](docs/README.md) to learn more about the technology and architecture of the Spartacus storefront, and see [SAP Customer Experience](https://cx.sap.com/en/products/commerce) for more information about SAP Commerce Cloud.

# Setup and Installation

To get up and running with Spartacus, the simplest approach is to build the application from ready-made libraries. You can also clone and build from source.

Spartacus is meant to be paired with the SAP Commerce backend, but the Spartacus repo includes a mock server that can be used as well.

For full installation and setup information, see the [Getting Started](docs) documentation.

# Customizing and Extending Spartacus

Although you are free to clone and change anything and everything in Spartacus, we hope you won't do that :)

To maintain our promise of upgradability, we strongly recommend that you extend Spartacus by building separate feature libraries that add to or change the provided functionality.

Spartacus is designed with an application shell (storefrontapp) that contains core resources that are needed to load the rest of the web app. These core resources are provided through libraries, such as the `storefrontlib` and `storefrontstylelib`. You then build new feature libraries that contains all custom functionality and pages. It is also possible to change the shell app, but it's not recommended.

Don't forget that one of the more powerful features of SAP Commerce Cloud is its support for CMS (Content Management System). All custom data, such as logos, links, and more, are fetched from the server through CMS requests. For this reason, we also strongly recommend that you try to keep Spartacus "generic" in that it doesn't contain anything specific that a content manager might want to change later through a web console, instead of by asking a coder.

For a full explanation and guidelines, see [Extending and Customizing Spartacus](docs) and [Spartacus Architecture](docs).

# Contributions

Team Spartacus is excited to hear ideas, requests, and especially code contributions. Here are a few ways to learn more and start prepping your first pull-request:

- Read [](CONTRIBUTING.md) for an overview of our contribution policies.
- Read the documentation in [Community](docs), especially the [Code of Conduct](doc) and the [GitHub Workflow](doc) documents.
- Join our general communication channel on [Slack](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTRiNTFkMDJlZjRmYTBlY2QzZTM3YWNlYzJkYmEwZDY2MjM0MmIyYzdhYmQwZDMwZjg2YTAwOGFjNDBhZDYyNzE)
- Start creating issues or making requests through GitHub's issue tracking service or through ZenHub

## Development Experience

The following sections outline some topics that improve the development experience.

### Configurable Backend

The storefront is driven by a backend, providing content and business APIs. The backend is configurable, as different environments require different backends.
Developers who have a local SAP Commerce installation running can connect to the local SAP Commerce backend (which defaults to `https://localhost:9002`). The backend URL is configured in a proxy configuration to avoid hardcoded URLs in the application code (see `proxy.backend.js`).

Developers who do not have access to a backend can use a local mockserver.

**Mock server**

Developers can use a local mock server for fast development. The mock server helps to:

- fast onboading – developers who don't have access to a backend can start developing right away.
- future development – developers can build new components that require an API that is not ready in the backend
- experiment other data sets – the mock server can be used to generate or create datasets
- CORS – the proxy overcomes CORS by default

The mock server can be started with an npm script `start:mock`. With this configuration, a separate proxy configuration is used to redirect backend and media URLs to a local [json-server](https://github.com/typicode/json-serve).

### Library development

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

#### Code Editor: VS Code

We use [Microsoft Visual Studio Code](https://code.visualstudio.com) for development. We rely on a series of features and plugins from it.

##### VS Code Workspace Extensions

The development team relies on a few extensions for productivity and code compliance. When you open the source folder in vscode, if you are missing some of these recommended extensions, vscode will prompt you for installation. The list of recommended extensions is found in '.vscode/extensions.json'.

Please make sure you install them.

##### VS Code Workspace settings

These are vscode settings the team relies on. They are shared and enforced via vscode workspace settings. If you want to add or change something, propose the change to the team instead of just commiting it, so the whole team uses it and can benefit from it.

### Browser: Google Chrome

For development, Google Chrome is recommended. There is a "Debugger for Chrome" extension for vscode in the workspace extensions. This allows you to place breakpoint in typescript from vscode and debug the app from vscode.
Chrome also manages well security exceptions that are needed to get the application running in a development environment.
