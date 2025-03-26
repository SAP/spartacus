# Accessibility Testing with Access Continuum

This document describes how to use Access Continuum for automated accessibility testing in Spartacus.

## Overview

Access Continuum is integrated into our Cypress E2E testing framework to automatically check for accessibility issues during test runs. This helps us identify and fix accessibility problems early in the development process.

## Setup

The Access Continuum integration is set up in `cypress/support/continuum.commands.ts`. This file provides custom Cypress commands for running accessibility tests.

## Usage

### Creating Accessibility Tests

1. Create a new test file in `cypress/e2e/accessibility/` with a naming convention that indicates it's an accessibility test (e.g., `*.a11y-e2e.cy.ts`).

2. Import the `checkA11yConcerns` utility function:

```typescript
import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';
```

3. Set up the test context and initialize Access Continuum:

```typescript
context('Page Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
  });

  // Test scenarios go here
});
```

4. Create test scenarios that cover both static and dynamic elements:

```typescript
// Basic page test
describe('Page Scenario', () => {
  before(() => {
    cy.visit('/page-url').wait(3000);
  });

  // Run accessibility tests
  checkA11yConcerns();
});

// Test with dynamic elements
describe('Modal Dialog Accessibility', () => {
  before(() => {
    cy.visit('/page-with-modal');
    // Trigger the modal to appear
    cy.get('.modal-trigger-button').click().wait(1000);
  });

  // Test accessibility with the modal open
  checkA11yConcerns();
});
```

When creating test scenarios, be sure to cover cases where dynamic elements appear on the page, such as:
- Modal dialogs
- Dropdown menus
- Tooltips
- Accordions
- Notification messages
- Form validation errors
- Loading states

These dynamic elements often introduce accessibility issues that aren't present in the initial page state.

### Strict vs. Non-Strict Mode

The `checkA11yConcerns` function accepts an optional `strict` parameter (default: `true`):

- When `strict` is `true`, the test will fail if any accessibility concerns are found.
- When `strict` is `false`, the test will report accessibility concerns but won't fail the test.

## Available Commands

- `cy.a11yContinuumSetup(configPath)`: Initialize Access Continuum with the specified configuration file.
- `cy.a11yContinuumRunAllTests(includeiframe)`: Run all accessibility tests on the current page.
- `cy.a11YContinuumPrintResults()`: Print accessibility concerns to the Cypress log.
- `cy.a11YContinuumFailIfConcerns()`: Fail the test if any accessibility concerns are found.

## Example

See `cypress/e2e/accessibility/cart.a11y-e2e.cy.ts` for an example of how to use Access Continuum for testing the cart page. 
