[![Build Status](https://travis-ci.com/SAP/cloud-commerce-spartacus-storefront-project.svg?token=yywzsFgC8dWSfJQxPGHs&branch=develop)](https://travis-ci.com/SAP/cloud-commerce-spartacus-storefront-project)

# What is Spartacus?

Spartacus is a lean, Angular-based JavaScript storefront for SAP Commerce Cloud. Spartacus talks to SAP Commerce Cloud exclusively through the Commerce REST API.

## Extendable

The Spartacus storefront is easy to extend & upgrade. It is packaged as a library that you can include in your storefront, which allows you to add to/remove/modify the out-the-box storefront features with your own. Newer versions of Spartacus can be used by changing the version of the library you’re using.

## Progressive

Spartacus is on a journey to be fully compliant with the Progressive Web Application (PWA) checklist. We aim to add support for all major features of a PWA-enabled storefront, to offer the best possible customer experience regardless of device or location.

## Open Source

Spartacus is open source. It will be continually developed by the SAP Commerce Cloud team, but we are very keen to welcome contributors and to foster an inclusive, active development community for Spartacus.

## Technology

Read the [documentation](docs/README.md) to learn more about the technology and architecture of the Spartacus storefront, and see [SAP Customer Experience](https://cx.sap.com/en/products/commerce) for more information about SAP Commerce Cloud.

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

- SAP Commerce Cloud instance (Release 1808 or unreleased 1811) (1811 release is planned for end of November)
- Angular (https://angular.io/) >= 6.0.1
- node.js >= 8.9.0
- yarn >= 1.6.0

# Download and Installation

*******
PLEASE NOTE (Sept. 28, 2018): 
- Spartacus is currently in pre-alpha state. The current code base is for evaluation only and should not be used to start development on a production storefront release.
- This first usable pre-alpha release of Spartacus will be available second week of October with proper documentation. Current links are placeholders.
*******

To get up and running with Spartacus, the simplest approach is to build the application from ready-made libraries. You can also clone and build from source.

Spartacus currently can only be used with a SAP Commerce Cloud instance through Commerce APIs. In the future, you will be able to use Spartacus with a mock server.

For complete setup instructions, see the [Setup and Installation](docs/setupandinstallation.md) guide.


## Customizing and Extending Spartacus

To maintain our promise of upgradability, the design pattern for Spartacus is for non-core features to be built as feature libraries that add to or change the provided functionality.

Spartacus comes with an application shell (storefrontapp) that contains core resources that are needed to load the rest of the web app. These core resources are provided through libraries, such as the `storefrontlib` and `storefrontstylelib`. You then build new feature libraries that contain any custom functionality and pages. It is recommended to keep the shell app as a container for libraries and to avoid developing features directly in the shell app.

Content for Spartacus pages is fetched from the SAP Commerce Cloud CMS (Content Management System), such as logos, links, banners and static pages. We recommend that new content-driven features follow the same pattern to enable a Content Managers to modify page content through the CMS tools.

For a full explanation and guidelines, see [Extending and Customizing Spartacus](docs/extendingandcustomizing.md) and [Spartacus Architecture](docs/architecture).



# Limitations

Spartacus works with Release 1808 of SAP Commerce Cloud and is being built with the upcoming 1811 release in mind. This means that certain features of Spartacus may only work with future Release 1811 of SAP Commerce Cloud. 



# Known Issues

Known issues are documented in the GitHub issue tracking system.



# How to Obtain Support

Spartacus is provided "as-is" with no official lines of support. 

To get help from the Spartacus community, post a question in the Help chat of our [Slack](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTRiNTFkMDJlZjRmYTBlY2QzZTM3YWNlYzJkYmEwZDY2MjM0MmIyYzdhYmQwZDMwZjg2YTAwOGFjNDBhZDYyNzE) channel.

For help getting Spartacus working with your licensed SAP Commerce Cloud instance, please contact SAP Support.



# Contributing

Team Spartacus welcomes feedback, ideas, requests, and especially code contributions. However, for the moment, Spartacus is restricted to updates by SAP employees. In the meantime:

- Post comments to our Feedback chat in our [Slack](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTRiNTFkMDJlZjRmYTBlY2QzZTM3YWNlYzJkYmEwZDY2MjM0MmIyYzdhYmQwZDMwZjg2YTAwOGFjNDBhZDYyNzE) channel.
- Read the documentation in [Community](docs/community/README.md), especially the [Code of Conduct](docs/community/codeofconduct.md) and the [GitHub Workflow](docs/community/githubworklow) documents.
- Create an issue in the [GitHub bug tracking system](docs/community/githubworklow).



# To Do

Many changes are coming! All tasks will be posted to our GitHub issue tracking system, and this section will be updated with the major roadmap items.

Some of the upcoming features or changes to the open source release:
- Mock server
- Ability to specific a different billing address when checking out
- Personal information pages (My Account, Payment Management, Address Management)
- Extensibility examples
- Style customization examples
- Performance improvements through App Shell Caching
- Completion of test coverage, including end-to-end tests



# License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE](LICENSE.txt) file.
