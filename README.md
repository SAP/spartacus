# What is Spartacus?

Spartacus is an extendable and configurable storefront for SAP Commerce Cloud, built as a lean, Angular-based, single-page web application. Unlike Accelerator templates, which are bundled with SAP Commerce Cloud, the Sparatcus storefront is decoupled from the SAP Commerce Cloud backend, and it communicates with the backend only through REST API calls. 

Spartacus provides the core capabilities needed to build and deploy a branded frontend. The first iterations of Spartacus contain the basics of what an ecommerce storefront should include: 

* home page
* search
* categories
* product details
* cart page
* adding to cart
* checkout
* order history

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

Spartacus is designed with an application shell (storefrontapp) that contains core resources that are needed to load the rest of the web app. These core resources are provided through libraries, such as the ``storefrontlib`` and ``storefrontstylelib``.  You then build new feature libraries that contains all custom functionality and pages. It is also possible to change the shell app, but it's not recommended. 

Don't forget that one of the more powerful features of SAP Commerce Cloud is its support for CMS (Content Management System). All custom data, such as logos, links, and more, are fetched from the server through CMS requests. For this reason, we also strongly recommend that you try to keep Spartacus "generic" in that it doesn't contain anything specific that a content manager might want to change later through a web console, instead of by asking a coder.

For a full explanation and guidelines, see [Extending and Customizing Spartacus](docs) and  [Spartacus Architecture](docs).

# Contributions

Team Spartacus is excited to hear ideas, requests, and especially code contributions. Here are a few ways to learn more and start prepping your first pull-request:

- Read [](CONTRIBUTING.md) for an overview of our contribution policies.
- Read the documentation in [Community](docs), especially the [Code of Conduct](doc) and the [GitHub Workflow](doc) documents.
- Join our general communication channel on [Slack](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTRiNTFkMDJlZjRmYTBlY2QzZTM3YWNlYzJkYmEwZDY2MjM0MmIyYzdhYmQwZDMwZjg2YTAwOGFjNDBhZDYyNzE)
- Start creating issues or making requests through GitHub's issue tracking service or through ZenHub
