# Contributing to the Spartacus Storefront

Thank you for your interest in the Spartacus storefront! We welcome contributions in all forms.

Here are some of the ways you can contribute to Spartacus:

Note: This is a living document. Like the Spartacus code, this document will be improved over time with the help of our community. Feedback welcome.

----

## Helping Others

An easy way to start is by helping others who may have questions or need support. Look for such requests here:

* Spartacus [Slack workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/zt-jekftqo0-HP6xt6IF~ffVB2cGG66fcQ)
* [Stack Overflow posts tagged with 'spartacus'](https://stackoverflow.com/questions/tagged/spartacus)

----

## Reporting Issues

Bug reports welcome! We are using [GitHub issue tracking](https://github.com/SAP/spartacus/issues) for tracking user stories and bugs.

### Determining if an Issue Should be Created

Analyzing reports is a bit of work, so please ask yourself these questions before creating an issue:

* Does the bug really apply to Spartacus? 

    There may be reasons the problem is occurring that have nothing to do with the Spartacus storefront code. Consider the following:

  * The problem may be caused by code that is not part of Spartacus.
  * The problem may be caused by data being sent to Spartacus through REST API calls.
  * The problem may be caused by incorrect CMS data sent by SAP Commerce Cloud, perhaps due to custom extensions.
  * The behavior may be different from what you expect, but may be working as designed. Or the feature may need improvement. In this case, it would be an enhancement request. Feature requests can be submitted to the [feature request channel](https://spartacus-storefront.slack.com/messages/CD8LC0X5F) in our Spartacus Slack workspace.
  * Perhaps you are unable to get Spartacus to work properly with your custom SAP Commerce Cloud.

* Is the problem reproducible in the latest release?
  
  * If you are not using the latest libraries or source code, please try to reproduce with the latest code first.
  * Make sure the problem is consistently reproducible using repeatable steps.
* Has this bug already been reported?
  * Please search the issue tracker for a similar bug before reporting the issue as a new bug.

If the bug does indeed apply to Spartacus code, please create an issue.

### Providing the Right Information for the Issue

* Summarize the issue well. The following are some guidelines:

  * Precisely state what you expected as compared to the actual behavior you're seeing.
  * Include only those details that apply to the issue.
  * Be concise, but include details important for helping us in understanding the problem and finding the root cause.
  * State the version you are testing, which browser you are using, and on which device.
  
    If it is possible to indicate what you've seen in other browser and device combinations, that is even better! For example, does the issue occur in all browsers, or just one browser on one particular operating system? (For example, "only in Firefox on Windows 10.)
  * If possible, include the last version where the bug was not present.
  * If the bug is more visual, please attach a screenshot and mark up the problem.
  * Generally, provide as much detail as necessary, but balance our need for information with how obvious the problem is.

* Provide detailed, step-by-step instructions for reproducing the issue with an example, including, if possible:

  * A URL to your example
  * Any required username or password (but don't give us credentials that can be mis-used)
  * Screenshots if it helps us understand better.

* Use our [issue template](ISSUE_TEMPLATE.md).

  * Do not include more than one bug per issue created. This helps us to analyze bugs more easily.

Please report issues in English.

### About Reporting Security Issues

If you find a security issue, we'd rather you tell us directly instead of creating a public issue. This way we can fix it before it can be exploited.

* SAP Customers: if you have discovered a security issue that is not covered by a published security note, please report it by creating a customer message at <https://launchpad.support.sap.com/#incident/solution.>
* Researchers/non-Customers: please send the relevant information to secure@sap.com using [PGP for e-mail encryption](http://global.sap.com/pc/security/keyblock.txt).
* Also refer to the general [SAP security information page](https://www.sap.com/corporate/en/company/security.html).

### How We Process Issues

New issues are reviewed regularly for validity and prioritization. Confirmed issues are given the "Approved" label, and the rest are either sent back to the reporter with a request for more details, or closed with an explanation.

Validated issues are then moved into one of these buckets:

* Priority issues will be assigned to one of our developers
* Issues that are less urgent will be left open as "contribution welcome"
* Certain issues may be moved to our internal issue tracking system if we don't think they belong to Spartacus.

Issues are closed when the fix is merged to develop. The release that contains the fix will be noted in the comments and the release changelog.

### How We Use Labels

We use labels to categorize issues and set issue status. We also use prefixes to help categorize some of our labels, such as the following:

* The `closed` prefix indicates the reason for closing an issue, when no changes were done (for example, `closed/duplicate`).
* The `epic` prefix allows us to group together issues that belong to a particular epic, feature, or theme (for example, `epic/facades`).
* The `triage` label is applied to issues that still require further information or analysis before they can be worked on (for example, `triage/analysis wanted`).
* The `type` prefix is used to identify issues other than tasks and user stories, such as bugs, enhancement requests, and issues that only affect the documentation (for example, `type/bug`).

You can view all of the labels we use, including the label descriptions, on our GitHub [labels page](https://github.com/SAP/spartacus/labels). 

Note: labels can only be changed by maintainers.

### Issue Reporting Disclaimer

Feedback, especially bug reports, are always welcome. However, our capacity as a team is limited -- we cannot answer specific project or consultation requests, nor can we invest time in fleshing out what might be a bug. Because of this, we reserve the right to close or not process issue reports that do not contain enough information. We also do not guarantee that every well-documented issue will be fixed.

That being said, we will try our very best to ensure the Spartacus codebase is of high quality.

----

## Analyzing Issues

You don't have to be a programmer to help us determine the specifics of a bug. Any help here is welcome!

To view a list of open issues that require analysis, see the [list of open issues](https://github.com/SAP/spartacus/issues?q=is%3Aopen) and especially the [list of issues where analysis is requested](https://github.com/SAP/spartacus/labels/triage/analysis%20wanted).

----

## Contributing Code

We welcome contributions to the Spartacus codebase. Before you start your first contribution, here are some things you should know:

1. You must be aware of the Apache License (which describes contributions), and you must agree to the [Contributors License Agreement](LICENSE.md). This is common practice for most open source projects.

    * For company contributors, special rules apply. See the respective section below for details.

1. Contributions must be compliant with the project code style, quality, and standards. We also follow them :-) 

    The `Contribution Content Guidelines` section below gives more details on the coding guidelines.

1. Not all contributions will be accepted.
    * The code you are submitting must fit the overall vision and direction of Spartacus and really improve it. Bug fixes are simple cases, for example, but new features may work better as third-party extensions.
    * Major feature implementations should be discussed with the owner [Bill Marcotte](https://github.com/Xymmer). You can also float ideas in our Slack channel, and we'll connect you to the appropriate person for further discussion.

### Contributor License Agreement

When you contribute anything to Spartacus (code, documentation, analysis, anything), be aware that your contribution is covered by the same [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) that is applied to Spartacus itself.

This applies to all contributors, including those contributing on behalf of a company.

### Developer Certificate of Origin (DCO)

Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

#### Company Contributors

If employees of a company contribute code, in **addition** to the individual agreement above, there needs to be one company agreement submitted. This is mainly for the protection of the contributing employees.

A company representative authorized to do so must fill out the following [Corporate Contributor License Agreement](/docs/SAP%20Corporate%20Contributor%20License%20Agreement.pdf) form. The form contains a list of employees who are authorized to contribute on behalf of your company. When this list changes, please let us know.

Submit the form to us through one of the following methods:

* Email to [opensource@sap.com](mailto:opensource@sap.com) and [spartacus@sap.com](mailto:spartacus@sap.com)
* Fax to +49 6227 78-45813
* Mail to:

  Industry Standards & Open Source Team
  Dietmar-Hopp-Allee 16
  69190 Walldorf, Germany

### Contribution Content Guidelines

  A contribution will be considered for inclusion in Spartacus if it meets the following criteria:

* The contribution fits the overall vision and direction of Spartacus
* The contribution truly improves the storefront
* The contribution follows the applicable guidelines and standards.

  The "guidelines and standards" requirement could fill entire books and still lack a 100% clear definition, but rest assured that you will receive feedback if something is not right. That being said, please consult the [Contributor's Guide](https://sap.github.io/spartacus-docs/contributors-guide/).

### Contribution Process

  1. Make sure the change would be welcome, as described above.

  1. Create a fork of the Spartacus library sources. 

  1. Build and run the storefront from the library development workspace. 

      For more information, see [Contributor Setup](https://sap.github.io/spartacus-docs/contributor-setup/).

  1. Work on the change in your fork (either on the `develop` branch or on a feature branch).

  1. Commit and push your changes using the [squash and merge](https://help.github.com/articles/about-pull-request-merges/) feature in GitHub.

      You should also use the squash and merge feature when additional changes are required after code review.

  1. In the commit message, please follow the conventions described in [Committing Code to Spartacus](https://sap.github.io/spartacus-docs/commit-guidelines/).

      By following the guidelines, your work will be accurately captured in the release changelog.

  1. If your change fixes an issue reported in GitHub, add the following line to the commit message:

      ```Fixes https://github.com/SAP/spartacus/issues/(issueNumber)```

      * Do not add a colon after "Fixes", as this prevents automatic closing.
      * When your pull request number is known (for example, because you enhanced a pull request after a code review), you can also add the following line:

          ```Closes https://github.com/SAP/spartacus/pull/(pullRequestNumber)```

  1. Create a pull request so that we can review your change.
  1. Wait for our code review and approval, possibly enhancing your change on request.

    Note: This may take time, depending on the required effort for reviewing, testing, and clarification. Spartacus developers are also working their regular duties.

1. After the change has been approved, we will inform you in a comment.

1. Due to internal SAP processes, your pull request cannot be merged directly into the branch. It will be merged internally, and will also immediately appear in the public repository.
1. We will close the pull request. At that point, you can delete your branch.

We look forward to hearing from you!
