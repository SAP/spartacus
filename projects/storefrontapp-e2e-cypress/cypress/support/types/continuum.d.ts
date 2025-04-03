/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Sets up the Continuum JavaScript SDK by loading required files:
       * - Continuum configuration file (continuum.conf.js)
       * - Access Engine (AccessEngine.professional.js)
       *
       * @param configPath - Path to the Continuum configuration file
       */
      a11yContinuumSetup(configPath?: string): Chainable<void>;

      /**
       * Prints accessibility test results to the Cypress log.
       * For each accessibility concern found:
       * - Highlights the offending element with a magenta border
       * - Logs the concern details and best practice URL
       * If no concerns are found, logs a success message.
       */
      a11YContinuumPrintResults(): Chainable<void>;

      /**
       * Fails the test if any accessibility concerns are found.
       * Uses Cypress expect assertion to check if the number of concerns is 0.
       */
      a11YContinuumFailIfConcerns(): Chainable<void>;

      /**
       * Runs all Continuum accessibility tests.
       * Can be chained after Cypress commands like `cy.get()` to narrow the scope. This allows for more granular testing and is the preferred approach.
       * Targeting the entire page should be avoided since it may lead to false negatives.
       * Will load Access Engine if not already loaded.
       *
       * @param {boolean} [failIfConcerns=true] - Wether to fail the test if any a11y concerns are found. (default: true)
       * @param {boolean} [includeIframe=false] - Whether to include iframes in the accessibility tests. Only applies to not scoped tests. (default: false)
       *
       * @example
       * cy.get('.modal-dialog').a11yRunContinuumTest(); // Runs accessibility tests on the dialog only.
       * cy.get('cx-tab-panel .active').a11yRunContinuumTest(); // Tests the active tab panel.
       * cy.get('selector').a11yRunContinuumTest(false); // The concerns will be logged but the test will not fail.
       * cy.a11yRunContinuumTest(true); // Runs accessibility tests on the entire page, including iframes. (Avoid this if possible)
       */
      a11yRunContinuumTest(
        failIfConcerns?: boolean,
        includeIframe?: boolean
      ): Chainable<void>;
    }
  }

  interface Window {
    LevelAccess_Continuum_AccessEngine: any;
    LevelAccess_AccessContinuumConfiguration: any;
  }
}

export {};
