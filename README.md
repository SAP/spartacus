# ![JavaScript storefront (spartacus)](docs/assets/spartacus-blue.png)

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/spartacus)](https://api.reuse.software/info/github.com/SAP/spartacus)

## Spartacus and Composable Storefront

Hello and welcome!

This README is part of the `develop` branch, which is an active development branch in the Spartacus repository. As such, the following text may contain references to work that is in progress and not yet officially released.

Starting with version 5.0, “SAP Commerce Cloud, composable storefront” is the name for the official release of project “Spartacus” libraries published by SAP. The officially supported composable storefront is available to SAP Commerce Cloud customers. Documentation is available on the [SAP Help Portal](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT?locale=en-US).

Composable storefront is based off the Spartacus open source code, and is included in the SAP Commerce Cloud license at no extra cost. Composable storefront has a roll-forward update policy.

On-premise customers may still use Spartacus open source. For more information, see [Self-Publishing Spartacus Libraries Using the Open Source Code](docs/self-publishing-spartacus-libraries.md).

## What is Spartacus?

Spartacus is a lean, Angular-based JavaScript storefront for SAP Commerce Cloud. Spartacus talks to SAP Commerce Cloud exclusively through the Commerce REST API.

- Documentation is available on the [SAP Help Portal](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT?locale=en-US).
- Try out a [sample Spartacus storefront](https://spartacus-demo.eastus.cloudapp.azure.com/electronics-spa/en/USD/) on our public demo site.
- Technical questions? Get in touch with us on [Stack Overflow](https://stackoverflow.com/questions/tagged/spartacus-storefront).
- Non-technical questions? Join our [Slack workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/zt-jekftqo0-HP6xt6IF~ffVB2cGG66fcQ).
- For details on the 4.0 launch, see the [Release Information page](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/6c7b98dbe68f4a508cac17a207182f4c/5ebbd2c8478a4874863a6b217c0aa2ba.html) on the SAP Help Portal.

Spartacus is...

- **Extendable**: Spartacus is designed to be upgradable while maintaining full extendability. You'll be able to adopt new versions of Spartacus by updating the Spartacus libraries that we will regularly enhance. (In order to ensure that the first release is as extendable and upgradable as we'd like, breaking changes will very likely be introduced up until the 1.0 launch.)
- **Upgradable**: Spartacus code is published and used as libraries and follows semantic versioning conventions. By using the libraries, Spartacus is upgradable for minor and patch releases.
- **Progressive**: Spartacus is on a journey to be fully compliant with the Progressive Web Application (PWA) checklist. We aim to add support for all major features of a PWA-enabled storefront, to offer the best possible customer experience regardless of device or location.
- **Open Source**: Spartacus is open source. It will be continually developed by the SAP Commerce Cloud team, but we are very keen to welcome contributors and to foster an inclusive, active development community for Spartacus. See our [contributing documentation](CONTRIBUTING.md) for more information.
- **Modern**: The Spartacus storefront is part of our exciting new journey towards a customizable-yet-upgradable technology for SAP Commerce Cloud installations. See [SAP Customer Experience](https://cx.sap.com/en/products/commerce) for more information about SAP Commerce Cloud.

## Storefront Features

Spartacus provides core storefront features such as:

- Home page
- Search
- Categories
- Product details
- Cart page
- Adding to cart
- Checkout
- Order history

See the [Release documentation](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/6c7b98dbe68f4a508cac17a207182f4c/5ebbd2c8478a4874863a6b217c0aa2ba.html) on the SAP Help Portal for more information.

## Requirements

If you are working with (currently unreleased) Spartacus 6.x, your Angular development environment should include the following:
- [Angular CLI](https://angular.io/): Version **15.2.0** or newer, < 16.
- [Node.js](https://nodejs.org/en/): Version **14.20** or newer (but **less than** version 15), or **16.13**, or newer (but **less than** version 17), or **18.10**, or newer.
- [Yarn](https://classic.yarnpkg.com/lang/en/): Version **1.15** or newer (**OR** from Spartacus 5.2 [npm](https://www.npmjs.com/): Version **6.14** or newer.)

If you are working with Spartacus 5.x, your Angular development environment should include the following:

- [Angular CLI](https://angular.io/): Version **14.2.3** or newer, < 15.
- [Node.js](https://nodejs.org/en/): Version **14.15** or newer (but **less than** version 15), or **16.10** or newer.
- [Yarn](https://classic.yarnpkg.com/lang/en/): Version **1.15** or newer (**OR** from Spartacus 5.2 [npm](https://www.npmjs.com/): Version **6.14** or newer.)

For the back end, SAP Commerce Cloud version 2105 or higher is required.

If you are working with Spartacus 4.x, your Angular development environment should include the following:

- [Angular CLI](https://angular.io/): **12.0** or later, < 13.
- yarn: v1.15 or later
- node.js: Version **14.15** is required. Version 12.x reached end-of-life on April 30, 2022, and is no longer supported by Spartacus. It is strongly recommended that you migrate any existing Spartacus storefronts to Node.js 14 as soon as possible. If there are any issues with Spartacus and Node.js 14, please upgrade to the latest releases. If you continue to experience issues with Node.js 14, create a support ticket with SAP. Spartacus also supports version 16.x of Node.js, but this version is not yet supported in Commerce Cloud in the Public Cloud builder.

If you are working with Spartacus 3.x, your Angular development environment should include the following:

- [Angular CLI](https://angular.io/): **10.1** or later, < 11.
- node.js: 12.16.1 or later, < 13.0. The most recent 12.x version is recommended.
- yarn: v1.15 or later

If you are working with Spartacus 2.x, your Angular development environment should include the following:

- [Angular CLI](https://angular.io/): **9.1** or later, < 10.
- node.js: 10.14.1 or later, < 13.0. The most recent 12.x version is recommended.
- yarn: v1.15 or later

If you are working with Spartacus 1.x, your Angular development environment should include the following:

- [Angular CLI](https://angular.io/): v8.0.0 or later, < v9.0.0
- node.js: v10 or later, < v12
- yarn: v1.15 or later

For the back end, SAP Commerce Cloud version 1905 or higher is required, and SAP Commerce Cloud version 2005 or newer is recommended.

**Note:** Some Spartacus features require API endpoints that are only available in newer versions of SAP Commerce Cloud. For more information, see [Compatibility Matrix](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/6c7b98dbe68f4a508cac17a207182f4c/7f4265e58242466aba453632401cdff4.html) on the SAP Help Portal.

## Download and Installation

To get up and running with Spartacus, the recommended approach is to build your storefront application from ready-made libraries. You can also clone and build from source, but upgrading is not as simple.

Spartacus currently can only be used with a SAP Commerce Cloud instance through Commerce APIs.

To quickly add Spartacus libraries to an Angular application, you can use Spartacus schematics: `ng add @spartacus/schematics`. This will setup and install Spartacus libraries to your Angular project. Please check the [official Spartacus schematics documentation](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/cfcf687ce2544bba9799aa6c8314ecd0/e38d45609de04412920a7fc9c13d41e3.html) for all the prerequisites and instruction on how to use Spartacus schematics.

For complete setup instructions, see [Setting Up the Composable Storefront](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/cfcf687ce2544bba9799aa6c8314ecd0/ea187052be724bbf8796d1ba86131781.html) on the SAP Help Portal.

## Customizing and Extending Spartacus

To maintain our promise of upgradability, the design pattern for Spartacus is for non-core features to be built as feature libraries that add to or change the provided functionality.

When using Spartacus, you build an app that pulls in the Spartacus libraries, which contain the core resources needed to work with SAP Commerce. You then build new features that contain any custom functionality and pages.

Content for Spartacus pages is fetched from the SAP Commerce Cloud CMS (Content Management System), such as logos, links, banners and static pages. We recommend that new content-driven features follow the same pattern to enable Content Managers to modify page content through the CMS tools.

The documentation for customizing and extending Spartacus is still under development and is being released as it becomes available.

## Spartacus application documentation

The latest generated documentation for Spartacus application libraries (modules, classes, interfaces, and so on) is hosted here: [https://sap.github.io/spartacus/](https://sap.github.io/spartacus/)

The application documentation is versioned and it is included on the **Assets** section of every release of each and every Spartacus library. You can download the documentation for a particular version by accessing the **Assets** section of any Spartacus library from that particular release, and then clicking on `docs.tar.gz` or `docs.zip`. To find the **Assets** folder for a particular library, access the [Released Libraries for Spartacus](https://github.com/SAP/spartacus/releases), click on the link for the library you are interested in, and scroll to the bottom of the page.

For example, to download the application documentation for the 3.4.0 release, you could access the **Assets** folder of the `@spartacus/storefront@3.4.0` library [here](https://github.com/SAP/spartacus/releases/tag/storefront-3.4.0).

**Note:** The 1.x and 2.x releases of the Spartacus libraries work only with SAP Commerce versions 1905 and 2005. Certain features, such as cancellations and returns, are only available with SAP Commerce 2005, because the necessary OCC API support is only available in SAP Commerce 2005.

## Limitations

When 1.0.0 is released, it is recommended to use SAP Commerce 1905. Spartacus works with Release 1808 and 1811 of SAP Commerce Cloud, with some limitations.

Spartacus is also being updated so that it works well with upcoming releases of SAP Commerce Cloud. This means that certain features of Spartacus may only work with unreleased future editions of SAP Commerce Cloud. This will be noted as we release new versions of Spartacus.

## Known Issues

Known issues are documented in the GitHub issue tracking system.

## How to Obtain Support

Spartacus is provided "as-is" with no official lines of support.

To get help from the Spartacus community:

- For more general questions, post a question in the Help chat of our [Slack workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/zt-jekftqo0-HP6xt6IF~ffVB2cGG66fcQ).
- For developer questions, post a question to [Stack Overflow with the 'spartacus' tag](https://stackoverflow.com/questions/tagged/spartacus).

## Contributing

Team Spartacus welcomes feedback, ideas, requests, and especially code contributions.

- Post comments to our Feedback chat in our [Slack](https://join.slack.com/t/spartacus-storefront/shared_invite/zt-jekftqo0-HP6xt6IF~ffVB2cGG66fcQ) channel.
- Read the [Contributing document](CONTRIBUTING.md) and learn how to:
  - Help others
  - Report an issue
  - Contribute code to Spartacus

## To Do

Many improvements are coming! All tasks will be posted to our GitHub issue tracking system. As mentioned, some of the improvements will mean breaking changes. While we strive to avoid doing so, we cannot guarantee this will not happen before the first release.

## License

Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE](LICENSE) file.

