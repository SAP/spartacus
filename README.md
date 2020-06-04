![JavaScript storefront (spartacus)](docs/assets/spartacus-blue.png)

# What is Spartacus?

Spartacus is a lean, Angular-based JavaScript storefront for SAP Commerce Cloud. Spartacus talks to SAP Commerce Cloud exclusively through the Commerce REST API.

- Documentation is hosted on our dedicated [Spartacus Documentation site](https://sap.github.io/cloud-commerce-spartacus-storefront-docs/).
- Try out a [sample Spartacus storefront](https://spartacus.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com/) on our public demo site.
- Technical questions? Get in touch with us on [Stack Overflow](https://stackoverflow.com/questions/tagged/spartacus-storefront).
- Non-technical questions? Join our [Slack workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTg1NGVjZmFkZjQzODc1MzFhMjc3OTZmMzIzYzg0YjMwODJiY2YxYjA5MTE5NjVmN2E5NjMxNjEzMGNlMDRjMjU).
- For details on the 1.0 launch, see the [Release Information page](https://sap.github.io/cloud-commerce-spartacus-storefront-docs/release-information/) on our Spartacus documentation site.

Spartacus is...

- **Extendable**: Spartacus is designed to be upgradable while maintaining full extendability. You'll be able to adopt new versions of Spartacus by updating the Spartacus libraries that we will regularly enhance. (In order to ensure that the first release is as extendable and upgradable as we'd like, breaking changes will very likely be introduced up until the 1.0 launch.)
- **Upgradable**: Spartacus code is published and used as libraries and follows semantic versioning conventions. By using the libraries, Spartacus is upgradable for minor and patch releases.
- **Progressive**: Spartacus is on a journey to be fully compliant with the Progressive Web Application (PWA) checklist. We aim to add support for all major features of a PWA-enabled storefront, to offer the best possible customer experience regardless of device or location.
- **Open Source**: Spartacus is open source. It will be continually developed by the SAP Commerce Cloud team, but we are very keen to welcome contributors and to foster an inclusive, active development community for Spartacus. See our [contributing documentation](CONTRIBUTING.md) for more information.
- **Modern**: The Spartacus storefront is part of our exciting new journey towards a customizable-yet-upgradable technology for SAP Commerce Cloud installations. See [SAP Customer Experience](https://cx.sap.com/en/products/commerce) for more information about SAP Commerce Cloud.



# Storefront Features

Spartacus provides core storefront features such as:

- Home page
- Search
- Categories
- Product details
- Cart page
- Adding to cart
- Checkout
- Order history

See the [Release documentation](https://sap.github.io/cloud-commerce-spartacus-storefront-docs/release-information/) for more information.



# Requirements

- SAP Commerce Cloud instance
  - Release 1905 recommended
  - Works with 1811 and 1808, with reduced functionality
- [Angular CLI](https://angular.io/): v8.0.0 or later, < v9.0.0
- node.js: v10 or later, < v12
- yarn: v1.15 or later

# Download and Installation

To get up and running with Spartacus, the recommended approach is to build your storefront application from ready-made libraries. You can also clone and build from source, but upgrading is not as simple.

Spartacus currently can only be used with a SAP Commerce Cloud instance through Commerce APIs. 

For complete setup instructions, see [Building the Spartacus Storefront from Libraries](https://sap.github.io/cloud-commerce-spartacus-storefront-docs/building-the-spartacus-storefront-from-libraries/).



## Customizing and Extending Spartacus

To maintain our promise of upgradability, the design pattern for Spartacus is for non-core features to be built as feature libraries that add to or change the provided functionality.

When using Spartacus, you build an app that pulls in the Spartacus libraries, which contain the core resources needed to work with SAP Commerce. You then build new features that contain any custom functionality and pages.

Content for Spartacus pages is fetched from the SAP Commerce Cloud CMS (Content Management System), such as logos, links, banners and static pages. We recommend that new content-driven features follow the same pattern to enable Content Managers to modify page content through the CMS tools.

The documentation for customizing and extending Spartacus is still under development and is being released as it becomes available.

# Limitations

When 1.0.0 is released, it is recommended to use SAP Commerce 1905. Spartacus works with Release 1808 and 1811 of SAP Commerce Cloud, with some limitations.

Spartacus is also being updated so that it works well with upcoming releases of SAP Commerce Cloud. This means that certain features of Spartacus may only work with unreleased future editions of SAP Commerce Cloud. This will be noted as we release new versions of Spartacus.

# Known Issues

Known issues are documented in the GitHub issue tracking system.

# How to Obtain Support

Spartacus is provided "as-is" with no official lines of support.

To get help from the Spartacus community:

- For more general questions, post a question in the Help chat of our [Slack workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTg1NGVjZmFkZjQzODc1MzFhMjc3OTZmMzIzYzg0YjMwODJiY2YxYjA5MTE5NjVmN2E5NjMxNjEzMGNlMDRjMjU).
- For developer questions, post a question to [Stack Overflow with the 'spartacus' tag](https://stackoverflow.com/questions/tagged/spartacus).

# Contributing

Team Spartacus welcomes feedback, ideas, requests, and especially code contributions.

- Post comments to our Feedback chat in our [Slack](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTg1NGVjZmFkZjQzODc1MzFhMjc3OTZmMzIzYzg0YjMwODJiY2YxYjA5MTE5NjVmN2E5NjMxNjEzMGNlMDRjMjU) channel.
- Read the [Contributing document](CONTRIBUTING.md) and learn how to:
  - Help others
  - Report an issue
  - Contribute code to Spartacus



# To Do

Many improvements are coming! All tasks will be posted to our GitHub issue tracking system. As mentioned, some of the improvements will mean breaking changes. While we strive to avoid doing so, we cannot guarantee this will not happen before the first release.



# License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE](LICENSE) file.

