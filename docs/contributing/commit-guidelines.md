Commit Guidelines
======================================

## Settings
Set the Git `core.autocrlf` configuration property to "false", and make sure to use Unix-style linebreaks (LF-only).



## Commit Message
The commit message consists of two or three parts, separated by empty lines.

### Commit Summary
The commit summary is the first line of the commit message.
- It should be 50-70 characters long.
- Must be prefixed by `[FIX]` or `[FEATURE]` and should start with the control/component which was the main subject of the change
-   At any other location in the commit message, `[INTERNAL]` can be used for commits/explanations which should not be part of the change log. If you add `[INTERNAL]` as the prefix to the commit message, the entire message won't be part of the change log. If you add this prefix to the middle of the message, everything after this prefix will be ignored for the change log.
- Do not use angle brackets `[` or `]` within the summary. Use it only for the prefixes.

### Description
- Describe the problem you are fixing with this change. Whether your patch is a one-line bug fix or 5000 lines of a new feature, there must be an underlying problem that motivated you to do this work. Make the necessity of the fix clear to the reviewers, so they will continue reading.

- Describe the effect that this change has from a user's point of view. App crashes and lockups are pretty convincing, but not all bugs are that obvious; this information should be mentioned in the text. Even if the problem was spotted during code review, describe the impact you think it can have on users.

- Describe the technical details of what you changed. It is important to describe the change in a most understandable way so the reviewer is able to verify that the code is behaving as you intend it to.


### Data Section
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

