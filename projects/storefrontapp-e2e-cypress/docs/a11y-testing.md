# Accessibility Testing with Access Continuum

This document describes how to use Access Continuum for automated accessibility testing in Spartacus.

## Overview

Access Continuum is integrated into our Cypress E2E testing framework to automatically check for accessibility issues during test runs. This helps us identify and fix accessibility problems early in the development process.

## Setup

The Access Continuum integration is set up in `cypress/support/continuum.commands.ts`. This file provides custom Cypress commands for running accessibility tests.

## Usage

### Creating Accessibility Tests

1. Create a new test file in `cypress/e2e/accessibility/` with a naming convention that indicates it's an accessibility test (e.g., `*.a11y-e2e.cy.ts`).

2. Set up the test context and initialize Access Continuum:

```typescript
describe('Page Accessibility', () => {
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

### Strict vs. Non-Strict Mode

The `a11yRunContinuumTest` command accepts an optional `failIfConcerns` argument (default: `true`):

- When `failIfConcerns` is `true`, the test will fail if any accessibility concerns are found.
- When `failIfConcerns` is `false`, the test will report accessibility concerns but won't fail the test.

### Do's and Don'ts

-  Create separate tests for dynamic content. This ensures test isolation and since the Continuum provides results in bulk, it can help pinpoint the problem areas.
- Always run tests contained within a unique scope. We need to avoid testing elements more than once. Otherwise we will encounter false negatives.
---
- Do not use assertions in your Continuum tests. Failures should only be caused by Continuum a11y problems.
- Do not run the test on the entire website content. Always chain it after a Cypress command that yields a single DOM element containing the desired test subject. 

## Available Commands

- `cy.a11yContinuumSetup(configPath)`: Initialize Access Continuum with the specified configuration file.
- `cy.a11yRunContinuumTest()`:  Run all accessibility tests and log the results. Refer 
to the JSDoc for more details.

## Example

See `/cypress/e2e/accessibility/continuum.example-e2e.cy.ts` for an example of how to use Access Continuum for testing. 
