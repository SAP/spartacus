# Accessibility Testing with Access Continuum

This document describes how to use Access Continuum for automated accessibility testing in Spartacus.

## Overview

Access Continuum is integrated into our Cypress E2E testing framework to automatically check for accessibility issues during test runs. This helps us identify and fix accessibility problems early in the development process.

## Setup

### Installing the Access Continuum package

**Attention: The package hosted by Level Access which gets installed by this option is currently out of date due to security concerns. For this reason, we are using `SAP_COMMON_NPM_TOKEN` to install a secure version of Continuum from the SAP Repository. This token can be obtained at "https://common.repositories.cloud.sap/ui/packages" by going to Set Me Up -> NPM -> acservices -> generate token. Installation steps for `SAP_COMMON_NPM_TOKEN` are the same as `CONTINUUM_REGISTRY_TOKEN` and can be replicated as described below. Note that we intend to return to using the Level Access owned package once it has been patched and this notice will be removed.**

We need to set the `CONTINUUM_REGISTRY_TOKEN` (see https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance#SpartacusAccessibilityFeatureCompliance-AccessContinuum to acquire this) by using the command `export CONTINUUM_REGISTRY_TOKEN=XXXXXXXXXXXXXXXX` in the terminal. Then we need to install the packages in the `storefrontapp-e2e` directory as usual with `npm ci`. 

*Note that running `npm ci` without setting the registry token will still install the packages to run e2e tests successfully. But any test using continuum libraries (ie. a11y tests) will not perform any accessibity checks.*

The Access Continuum integration is set up in `cypress/support/continuum.commands.ts`. This file provides custom Cypress commands for running accessibility tests.

## Usage

### Creating Accessibility Tests

1. Create a new test file in `cypress/e2e/accessibility/` with a naming convention that indicates it's an accessibility test (e.g., `*.a11y-e2e.cy.ts`).

2. Set up the test context and initialize Access Continuum:

```typescript
describe('Page Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
  });
  // Test scenarios go here
});
```

3. Create test scenarios that cover both static and dynamic elements:

```typescript
// Basic page test
it('Page Scenario', () => {
  // Make sure the content to be tested has loaded
  cy.visit('/page').get('content')
  // Run accessibility tests for desired elements
  cy.get('selector').a11yRunContinuumTest();
});

// Test with dynamic elements
it('Modal Dialog Accessibility', () => {
    cy.visit('/page-with-modal');
    // Trigger the modal to appear and wait for its content
    cy.get('.modal-trigger-button').click().get('content');
    // Test only the elements not covered by previous tests
    cy.get('modal-selector').a11yRunContinuumTest();
});
```

When creating test scenarios, be sure to cover cases where elements are not part of the DOM without user interaction, such as:
- Modal dialogs
- Dropdown menus
- Tooltips
- Accordions
- Notification messages
- Form validation errors
- Loading states

These dynamic elements often introduce accessibility issues that aren't present in the initial page state.

### Possible accessibility concerns

Some concerns may need to be manually evaluated to confirm wether they are issues or not. They show up in the Cypress log as: `A11y Warning', message: ⚠️♿️⚠️ Possible accessibility concern detected`. You can click on them to output more details to the console. These warnings will not cause the test to fail as we expect a lot of them to be false positives or not critical. However, Having this extra information can help ensure full a11y coverage.   

### Strict vs. Non-Strict Mode

The `a11yRunContinuumTest` command accepts an optional `failIfConcerns` argument (default: `true`):

- When `failIfConcerns` is `true`, the test will fail if any accessibility concerns are found.
- When `failIfConcerns` is `false`, the test will report accessibility concerns but won't fail the test.

### Do's and Don'ts

-  Create separate tests for dynamic content. Since the Continuum provides results in bulk, it can help pinpoint the problem areas.
- Disable test isolation. This greatly reduces runtime.
- Always run tests contained within a unique scope. We need to avoid testing elements more than once. Otherwise we will encounter false negatives.
- Consider the execution time. Since these are not traditional e2e tests we can sacrifice emulating the user towards performance.
---
- Do not use assertions in your Continuum tests. Failures should only be caused by Continuum a11y problems.
- Do not run the test on the entire website content. Always chain it after a Cypress command that yields a single DOM element containing the desired test subject. 
- Do not interact directly with the app whenever possible. Actions like logging-in or adding products to card should be done programmatically.

## Available Commands

- `cy.a11yContinuumSetup(configPath)`: Initialize Access Continuum with the specified configuration file.
- `cy.a11yRunContinuumTest()`:  Run all accessibility tests and log the results. Refer 
to the JSDoc for more details.

## Example

See `/cypress/e2e/accessibility/continuum.example-e2e.cy.ts` for an example of how to use Access Continuum for testing. Accessibility concerns will be shown in the log during assertations when running Cypress.
