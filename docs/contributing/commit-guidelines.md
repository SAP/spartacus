# Committing Code to Spartacus

## Settings
If you are on Windows, set the Git `core.autocrlf` configuration property to "false", and make sure to use Unix-style linebreaks (LF-only).

## Merging

When you are ready to merge your pull request, select GitHub's `Squash and merge` option, as shown in the following image:

![alt text](https://github.com/SAP/cloud-commerce-spartacus-storefront/tree/develop/docs/assets/images/Squash_and_merge_button.png "Squash and merge button")

For information on  `Squash and merge`, see [GitHub Help](https://help.github.com/articles/about-pull-request-merges/).


# Commit Message Guidelines

We use git commit messages to generate the framework changelog. To that end, we have specific rules for how to format git commit messages. These rules are also intended to make the commit messages easier to read.

## Commit Message Format

The commit message consists of a header, a body, and optionally, a footer.


### Header

The commit header is a brief summary of the work done, with a maximum length of 100 characters. It is entered into its own, dedicated textfield that appears after you click `Squash and merge`. The following is an example:

![alt text](https://github.com/SAP/cloud-commerce-spartacus-storefront/tree/develop/docs/assets/images/Squash_and_merge_header.png "Commit message header")

When you click `Squash and merge`, the header field is automatically populated. However, it does not match our commit guidelines format precisely. Modify it to fit the following format: 

```
 <type>(<scope>): <subject><issue number>
``` 
#### Type

The `type` is mandatory, and must be one of the following:

* `build`: for changes that affect the build system or external dependencies. Example scopes could include the following: `gulp`, `broccoli`, or `npm`.

* `ci`: for changes to our CI configuration files and scripts. Example scopes could include the following: `Travis`, `Circle`, `BrowserStack`, or `SauceLabs`.

* `docs`: for changes to documentation only

* `feat`: for new feature work

* `fix`: for a bug fix

* `perf`: for a code change that improves performance

* `refactor`: for a code change that neither fixes a bug nor adds a feature

* `style`: for changes that do not affect the meaning of the code, such as white-space, formatting, missing semi-colons, and so on

* `test`: for adding missing tests or correcting existing tests.

In the changelog, we only present commits that are of type `feat` or `fix`.

#### Scope

The scope indicates which npm package is affected by the commit.

The scope can be one of the following:

* `@spartacus/core`
* `@spartacus/styles`
* `@spartacus/storefront`

There are a few types where the scope can be left out. For example, if you are making a `style`, `test` or `refactor` commit, where changes have been made across multiple packages, or a `docs` commit that is not related to a specific package, then you do not need to include the scope.

#### Subject

The subject contains a succinct description of the change, and adheres to the following rules:

* The subject is written in the present, imperative tense. For example, "add facades", rather than "adds facades" or "added facades".
* The first letter of the subject message is in lower-case.
* There is no period at the end of the subject message.

#### Issue Number

At the end of the header, include the GitHub issue number in parentheses, preceded by a hashtag, as follows: `(#123)`. The changelog converts this to a link to the issue.


### Body and Footer
- Describe the problem you are fixing with this change. Whether your patch is a one-line bug fix or 5000 lines of a new feature, there must be an underlying problem that motivated you to do this work. Make the necessity of the fix clear to the reviewers, so they will continue reading.

- Describe the effect that this change has from a user's point of view. App crashes and lockups are pretty convincing, but not all bugs are that obvious; this information should be mentioned in the text. Even if the problem was spotted during code review, describe the impact you think it can have on users.

- Describe the technical details of what you changed. It is important to describe the change in a most understandable way so the reviewer is able to verify that the code is behaving as you intend it to.


### Footer
The data section consists of name-value pairs
-   `Fixes: https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/(issueNumber)` if the change fixes a GitHub-reported bug.
-   `Closes: https://github.com/SAP/cloud-commerce-spartacus-storefront/pull/(pullRequestNumber)` if the change comes from a pull request. This is usually added by the Spartacus committer handling the pull request.
-   Further internal information is added by SAP developers if required.
- A commit message might look like this:

    ``` wiki
    [FIX] sap.m.Popover: scrolling is removed after Popover is rerendered
    
    - this was caused by the special treatment in dealing with rerendering in Popover.
    
    - Now the normal invalidation is used and Popup.js takes care of the focus/blur event listener in onBefore/AfterRerendering
    
    Fixes: https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/1
    ```

