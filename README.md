![JavaScript storefront (spartacus)](docs/assets/spartacus-blue.png)

# What is Spartacus?

Spartacus is a lean, Angular-based JavaScript storefront for SAP Commerce Cloud. Spartacus talks to SAP Commerce Cloud exclusively through the Commerce REST API.

## Extendable

Spartacus is designed to be upgradable while maintaining full extendability. You'll be able to adopt new versions of Spartacus by updating the Spartacus libraries that we will regularly enhance.

We’re making great progress and are planning our first beta in Q1 2019 and a launch date in Q2 2019. In the meantime, in order to ensure that the first release is as extendable and upgradable as we'd like, breaking changes will very likely be introduced. Please keep that in mind if you decide to start a project using the Spartacus storefront, prior to the first release.

## Progressive

Spartacus is on a journey to be fully compliant with the Progressive Web Application (PWA) checklist. We aim to add support for all major features of a PWA-enabled storefront, to offer the best possible customer experience regardless of device or location.

## Open Source

Spartacus is open source. It will be continually developed by the SAP Commerce Cloud team, but we are very keen to welcome contributors and to foster an inclusive, active development community for Spartacus.

See our [contributing documentation](CONTRIBUTING.md) for more information.

## Technology

The Spartacus storefront is part of our exciting new journey towards a customizable-yet-upgradable technology for SAP Commerce Cloud installations.

See [SAP Customer Experience](https://cx.sap.com/en/products/commerce) for more information about SAP Commerce Cloud.

## Storefront features

Spartacus provides core storefront features such as:

- home page
- search
- categories
- product details
- cart page
- adding to cart
- checkout
- order history

# Requirements

- SAP Commerce Cloud instance (Release 1811)
- Angular CLI (https://angular.io/): >= 7.2.1 and < 8.0.0
- node.js >= 10.14.1
- yarn >= 1.9.4

# Download and Installation

To get up and running with Spartacus, the simplest approach is to build the application from ready-made libraries. You can also clone and build from source.

Spartacus currently can only be used with a SAP Commerce Cloud instance through Commerce APIs. In the future, you will be able to use Spartacus with a mock server.

For complete setup instructions, see the [Setup and Installation](docs/setupandinstallation.md) guide.

## Customizing and Extending Spartacus

To maintain our promise of upgradability, the design pattern for Spartacus is for non-core features to be built as feature libraries that add to or change the provided functionality.

Spartacus comes with an application shell (storefrontapp) that contains core resources that are needed to load the rest of the web app. These core resources are provided through libraries, such as the `storefrontlib` and `storefrontstylelib`. You then build new feature libraries that contain any custom functionality and pages. It is recommended to keep the shell app as a container for libraries and to avoid developing features directly in the shell app.

Content for Spartacus pages is fetched from the SAP Commerce Cloud CMS (Content Management System), such as logos, links, banners and static pages. We recommend that new content-driven features follow the same pattern to enable Content Managers to modify page content through the CMS tools.

The documentation for customizing and extending Spartacus is still under development and will be released soon.

# Limitations

Spartacus works with Release 1808 of SAP Commerce Cloud, with some limitations. See the [Setup and Installation](docs/setupandinstallation.md) guide for more information.

Spartacus is also being updated so that it works well with upcoming releases of SAP Commerce Cloud. This means that certain features of Spartacus may only work with unreleased future editions of SAP Commerce Cloud. This will be noted as we release new versions of Spartacus.

# Known Issues

Known issues are documented in the GitHub issue tracking system.

# How to Obtain Support

Spartacus is provided "as-is" with no official lines of support.

To get help from the Spartacus community:

- For more general questions, post a question in the Help chat of our [Slack workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTRiNTFkMDJlZjRmYTBlY2QzZTM3YWNlYzJkYmEwZDY2MjM0MmIyYzdhYmQwZDMwZjg2YTAwOGFjNDBhZDYyNzE).
- For developer questions, post a question to [Stack Overflow with the 'spartacus' tag](https://stackoverflow.com/questions/tagged/spartacus).

# Contributing

Team Spartacus welcomes feedback, ideas, requests, and especially code contributions.

- Post comments to our Feedback chat in our [Slack](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTRiNTFkMDJlZjRmYTBlY2QzZTM3YWNlYzJkYmEwZDY2MjM0MmIyYzdhYmQwZDMwZjg2YTAwOGFjNDBhZDYyNzE) channel.
- Read the [Contributing document](CONTRIBUTING.md) and learn how to:
  - Help others
  - Report an issue
  - Contribute code to Spartacus

# To Do

Many changes are coming! Most tasks will be posted to our GitHub issue tracking system, and this section will be updated with the major roadmap items.

Some of the upcoming features or changes to the open source release:

- Mock server
- Personal information pages (My Account, Payment Management, Address Management)
- Extensibility examples
- Style customization examples
- Performance improvements through App Shell Caching
- Completion of test coverage, including end-to-end tests

As mentioned, some of the improvements will mean breaking changes. While we strive to avoid doing so, we cannot guarantee this will not happen before the first release.

# License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE](LICENSE.txt) file.
