# Contributing to the Spartacus Storefront

Thank you for your interest in the Spartacus storefront! We welcome contributions in all forms.

Here are some of the ways you can contribute to Spartacus:

Note: This is a living document. Like the Spartacus code, this document will be improved over time with the help of our community. Feedback welcome.

----
## Helping Others

An easy way to start is by helping others who may have questions or need support. Look for such requests here:
- Spartacus [Slack workspace](https://join.slack.com/t/spartacus-storefront/shared_invite/enQtNDM1OTI3OTMwNjU5LTRiNTFkMDJlZjRmYTBlY2QzZTM3YWNlYzJkYmEwZDY2MjM0MmIyYzdhYmQwZDMwZjg2YTAwOGFjNDBhZDYyNzE)
- [Stack Overflow posts tagged with'spartacus'](https://stackoverflow.com/questions/tagged/spartacus)

----
## Reporting Issues

Bug reports welcome! [GitHub issue tracking](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues) is currently being used for tracking user stories and bugs and not for feature requests.

### Determining if an Issue should be Created

Analyzing reports is a bit of work, so please ask yourself these questions before creating an issue.

* Does the bug really apply to Spartacus? There maybe reasons the problem is occuring that have nothing to do with the Spartacus storefront code. For example:
** The problem is caused by code that is not part of Spartacus.
** The problem is caused by the data being sent to Spartacus through REST API calls.
** The problem is caused by incorrect CMS data sent by SAP Commerce Cloud, perhaps due to custom extensions.
** The behavior is different than you expect, but as designed; or the feature needs improvement. In this case, it would be an enhancement request. (Note that we're not using GitHub issue tracking for that purpose at the moment. See the feature request chat in our Slack channel.)
** You can't get Spartacus to work properly with your custom SAP Commerce Cloud.
* Is the problem reproducible in the latest release? 
** If you are not using the latest libraries or source code, please try to reproduce with the latest code first.
** Make sure the problem is consistently reproducible using repeatable steps.
* Has this bug already been reported? 
** Please search the issue tracker for a similar bug before reporting the issue as a new bug.

If yes, create an issue.

### Providing the Right Information for the Issue
* Summarize the issue well
** Precisely state what you expected vs the actual behavior you're seeing
** Include on those details that apply to the issue.
** Be concise but include details important for helping us understanding the problem and finding the root cause.
** State the version you are testing and your browser/device (and if possible, what you've seen in other browser/device combinations - for example, is it all browsers or just Firefox browser on Windows 10 OS?)
** If possible, include the last version where the bug was not present.
** If the bug is more visual, attach a screenshot and mark up the problem
** Generally, provide as much detail as necessary, but balance our need for information with how obvious the problem is.
* Provide detailed step-by-step repro instructions with an example, including, if possible:
** A URL to your example
** Any rquired username or password (but don't give us credentials that can be mis-used)
** Screenshots if it helps us understand better
* Use our [issue tempate](ISSUE_TEMPLATE.md)
** Do not include more than one bug per issue created. It helps us to analyze bugs more easily.

Please report issues in English. 

### About Reporting Security Issues 

If you find a security issue, we'd rather you tell us directly instead of creating a public issue. This way we can fix it before it can be exploited.

* SAP Customers: if the found security issue is not covered by a published security note, please report it by creating a customer message at https://launchpad.support.sap.com/#incident/solution.
* Researchers/non-Customers: please send the related information to secure@sap.com using [PGP for e-mail encryption](http://global.sap.com/pc/security/keyblock.txt).
* Also refer to the general [SAP security information page](https://www.sap.com/corporate/en/company/security.html).

### How We Process Issues 

New issues are reviewed regularly for validty and prioritization. Confirmed issues are assigned the "Approved" label, and the rest are either sent back to the reporter with a request for more details or closed with an explanation. 

Validated issues are then moved into one of these buckets:
- Priority issues will be assigned to one of our developers.
- Issues that aren't urgent will be left open as "contribution welcome".
- Certain issues may be moved to our internal issue tracking system, if we don't think they belong to Spartacus.

Issues are closed when the fix is committed. The release that contains the fix will be noted in the comments.

### How We Use Labels

We use labels to categorize issues and set issue status. Labels can only be changed by maintainers.

Categories for all issues:
* bug: Bugs related to code.
* doc: Bugs related to documentation.
* enhancement: Feature or change requests (not bugs). Feature requests will likely be closed and the reporter requested to use Slack or contact the project owner. Smaller enhancements will be considered on a case-by-case basis.
* inquiry: Any kind of question, which normally will be closed and the reporter requested to use Slack.
* support: Any kind of support request, which normally will be closed and the reporter requested to use Slack.

We may also use other labels to categorize the type of work or when we might plan for it.

Status labels for open issues:
* No label (triage state): Issue needs to be reviewed and validated.
* approved: The issue has been reviewed and validated and contains acceptance criteria.
* author action: The issue has been sent back to the issure reporter, usually because we need more information. (This is the same as the default GitHub 'question' label.)
* analysis wanted: We think this might be an issue but we can't prioritize analayzing the problem at the moment. It would be great if someone from the community took a look and tried to reproduce.
* contribution welcome: The issue has been approved; we invite someone from the community to work on it.
* good first issue: The issue is appropriate for someone who is starting out their contribution journey.
* help wanted: We're looking for help on this issue.

Status labels for closed issues:
* fixed: The issue was fixed.
* duplicate: There's already an issue like this.
* invalid: The issue is no longer relevant.
* cant repro: Looked like an issue but we can't reproduce.
* works as designed: The behavior is working as designed. 
* wontfix: While we acknolwedge the issue exists, we aren't committing to working on this issue for the moment. 

### Issue Reporting Disclaimer

Feedback, especially bug reports, are always welcome. However, our capacity as a team is limited -- we cannot answer specific project or consultation requests, nor can we invest time in fleshing out what might be a bug. This means:

* We reserve the right to close or not process issue reports that do not contain enough information.
* We do not guarantee that every well-document issue will be fixed.

Remember: Spartacus is open source and supported by its community.

That being said, we will try our very best to ensure Spartacus code base is of high quality.

----
## Analyzing Issues

You don't have to be a programmer in order to help us determine the specifics of a bug. Any help here is welcome!

To view a list of open issues that require analysis, see the [list of open issues](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues?q=is%3Aopen) and especially the [list of issues where analysis is requested](https://github.com/SAP/cloud-commerce-spartacus-storefront/labels/analysis%20wanted).

----
## Contributing Code

We welcome contributions to the Spartacus codebase. Before you start your first contribution, here are some things you should know: 

1. You must be aware of the Apache License (which describes contributions), and you must agree to the [Contributors License Agreement](LICENSE.md). This is common practice for most open source projects. 

    Note: You do not need to sign the CLA until you submit your first pull request. If you have not signed the CLA before, a link to the CLA assistant is provided on the PR status page.

* To make this process as simple as possible, we use the *[CLA assistant](https://cla-assistant.io/)* for individual contributions. CLA assistant is an open source tool that integrates with GitHub very well and enables a one-click-experience for accepting the CLA. 
* For company contributors, special rules apply. See the respective section below for details.
2. Contributions must meet our code style, quality, and product standards. We also follow them :). The respective section below gives more details on the coding guidelines.

3. Not all contributions will be accepted.
* The code you are submitting must fit the overall vision and direction of Spartacus and really improve it. Bug fixes are simple cases, for example, but new features may work better as third-party extensions. 
* Major feature implementations should be discussed with the owner [Bill Marcotte](https://github.com/Xymmer). You can also float ideas in our Slack channel, and we'll connect you to the appropriate person for further discussion.

### Contributor License Agreement

When you contribute anything to Spartacus (code, documentation, analysis, anything), be aware that your contribution is covered by the same [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) that is applied to Spartacus itself. In particular you must agree to the [Individual Contributor License Agreement](https://gist.github.com/CLAassistant/bd1ea8ec8aa0357414e8).

This applies to all contributors, including those contributing on behalf of a company. If you agree to its content, click on the link posted by the CLA assistant as a comment to the pull request. Click it to check the CLA, then accept it on the following screen if you agree to it. CLA assistant will save this decision for upcoming contributions and will notify you if there is any changes to the CLA in the meantime.

#### Company Contributors

If employees of a company contribute code, in **addition** to the individual agreement above, there needs to be one company agreement submitted. This is mainly for the protection of the contributing employees.

A company representative authorized to do so must fill out the following [Corporate Contributor License Agreement](/docs/SAP%20Corporate%20Contributor%20License%20Agreement.pdf) form. The form contains a list of employees who are authorized to contribute on behalf of your company. When this list changes, please let us know.

Submit the form to us through one of the following methods:

- Email to [opensource@sap.com](mailto:opensource@sap.com) and [spartacus@sap.com](mailto:spartacus@sap.com)
- Fax to +49 6227 78-45813
- Mail to 
Industry Standards & Open Source Team
Dietmar-Hopp-Allee 16
69190 Walldorf, Germany

### Contribution Content Guidelines

A contribution will be considered for inclusion in Spartacus if it meets the following criteria:

* The contribution must fit the overall vision and direction of Spartacus.
* The contribution must really improve the storefront.
* The contribution follows the applicable guidelines and standards.

The "guidelines and standards" requirement could fill entire books and still lack a 100%-clear definition :) so rest assured that you will get a committer's feedback if something is not right. That being said, please consult the following documentation:
- [Definition of Done](docs/contributing/definition-of-done.md)
- [Coding Guidelines](docs/contributing/coding-guidelines.md)

### Contribution Process

1.  Make sure the change would be welcome, as described above.

1. Clone the Spartacus library sources, build, and then run the storefront from the library development workspace. For more information, see [Contributor Setup](docs/contributorsetup.md).

2.  Create a branch forking the Spartacus repository, and code your change.

3.  Commit and push your changes on that branch.

    -  Squash several commits into one. See [this explanation](http://davidwalsh.name/squash-commits-git). 
    - This step must also be done when additional changes are required after code review.
4.  In the commit message, follow the [commit message guidelines](docs/contributing/coding-guidelines.md#git-guidelines)
5.  If your change fixes an issue reported in GitHub, add the following line to the commit message:
 ```Fixes https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/(issueNumber)```
    * Do not add a colon after "Fixes", as this prevents automatic closing.
    * When your pull request number is known (for example, because you enhanced a pull request after a code review), you can also add the following line:
```Closes https://github.com/SAP/cloud-commerce-spartacus-storefront/pull/(pullRequestNumber)```
6.  Create a pull request to github.com/SAP/cloud-commerce-spartacus-storefront.
7.  Follow the link posted by the CLA assistant to your pull request and accept it, as described above.
8.  Wait for our code review and approval, possibly enhancing your change on request.
    * Note: This may take time depending on the required effort for reviewing, testing and clarification. Spartacus developers are also working their regular duties.
9.  After the change has been approved, we will inform you in a comment
10. Due to internal SAP processes, your pull request cannot be merged directly into the branch. It will be merged internally and will also immediately appear in the public repository. 
11.  We will close the pull request. You may delete the now obsolete branch.

We look forward to hearing from you!
