/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// This is a basic custom support file for using Continuum's JavaScript SDK with Cypress
// Lots of functionality is already available to you here out of the box, but we encourage you to add your own custom commands!
let Continuum: any = {};
let ReportManagementStrategy: any = {};
let ModuleManagementStrategy: any = {};

try {
  const ContinuumImport = require('@continuum/continuum-javascript-professional');
  Continuum = ContinuumImport.Continuum;
  ReportManagementStrategy = ContinuumImport.ReportManagementStrategy;
  ModuleManagementStrategy = ContinuumImport.ModuleManagementStrategy;
} catch (e) {
  console.warn(
    'Access continuum is not available. Please configure CONTINUUM_REGISTRY_TOKEN env variable, otherwise conitnuum tests will be skipped.'
  );
}

const accessEngineFilePath =
  `node_modules/@continuum/continuum-javascript-professional/AccessEngine.professional.js`.replace(
    /^\//,
    ''
  ); // versions of Cypress prior to 5 include a leading forward slash in __dirname

const LEVEL_ACCESS_API = 'https://sap.levelaccess.net/api/cont/organization';

// Higher-order function to check if Continuum is available
const withContinuum = <T extends (...args: any[]) => any>(fn: T): T => {
  return ((...args: Parameters<T>): ReturnType<T> | void => {
    if (!isContinuumAvailable()) {
      return;
    }
    return fn(...args);
  }) as T;
};

// Using the Continuum JavaScript SDK requires us to load the following files before invoking `Continuum.setUp`:
// * the Continuum configuration file (continuum.conf.js) specified by `configFilePath`
// * Access Engine (AccessEngine.professional.js), the underlying accessibility testing engine Continuum uses
// Normally code outside the Continuum JavaScript SDK is not required to do this, but Cypress' design essentially forces our hand
const a11yContinuumSetup = withContinuum((configFilePath: string) => {
  /**
   * Prevent showing xhr calls in logs and exposing api token.
   */
  const origLog = Cypress.log.bind(Cypress);
  Cypress.log = function (opts, ...other) {
    if (opts.displayName >= LEVEL_ACCESS_API || opts.name >= LEVEL_ACCESS_API) {
      return;
    }
    return origLog(opts, ...other);
  };

  /**
   *  Avoid exposing API key in case of error.
   */
  Cypress.on('fail', (error) => {
    if (error.message.includes(LEVEL_ACCESS_API)) {
      error.message =
        'There was an issue submitting accessibility concerns to AMP. Please confirm correct credentials and connection.';
    }
    throw error;
  });

  return cy
    .readFile(configFilePath)
    .then((configFileContents) => window.eval(configFileContents))
    .window()
    .then((windowUnderTest) =>
      cy
        .readFile(accessEngineFilePath)
        .then((accessEngineFileContents) => {
          Continuum.accessEngineCode =
            Continuum.createInjectableAccessEngineCode(
              accessEngineFileContents
            );
          windowUnderTest.eval(Continuum.accessEngineCode);
        })
        .then(() => Continuum.setUp(null, configFilePath, windowUnderTest))
    );
});

// We verify Access Engine is loaded, loading it again only if necessary, before running our accessibility tests using `Continuum.runAllTests`
const a11yContinuumRunAllTests = withContinuum((includeiframe = false) => {
  cy.window()
    .then((windowUnderTest) =>
      cy.then(() => {
        if (!windowUnderTest.LevelAccess_Continuum_AccessEngine) {
          return cy
            .readFile(accessEngineFilePath)
            .then((accessEngineFileContents) =>
              windowUnderTest.eval(
                Continuum.createInjectableAccessEngineCode(
                  accessEngineFileContents
                )
              )
            );
        }
      })
    )
    .then(() => Continuum.runAllTests(includeiframe));
});

const a11YContinuumPrintResults = withContinuum(() => {
  const accessibilityConcerns = Continuum.getAccessibilityConcerns();

  if (accessibilityConcerns.length > 0) {
    accessibilityConcerns.forEach((accessibilityConcern) => {
      const modifiedAccessibilityConcernPath =
        accessibilityConcern.path?.split('|:host>')[0]; // "|:host>" in the path indicates the element is in shadow DOM

      if (modifiedAccessibilityConcernPath) {
        let originalNodeBorder;
        cy.get(modifiedAccessibilityConcernPath)
          .then((node) => {
            originalNodeBorder = node.css('border');
            node.css('border', '2px solid magenta');
          })
          .log(
            `Accessibility Concern: ${accessibilityConcern.attribute} [${accessibilityConcern.bestPracticeDetailsUrl}](${accessibilityConcern.bestPracticeDetailsUrl})`
          )
          .get(modifiedAccessibilityConcernPath, { log: false })
          .then((node) => {
            node.css('border', originalNodeBorder);
          });
      }
    });
  } else {
    cy.log('No accessibility concerns found');
  }
});

const a11YContinuumFailIfConcerns = withContinuum(() => {
  expect(
    Continuum.getAccessibilityConcerns(),
    'no accessibility concerns'
  ).to.have.lengthOf(0);
});

const isContinuumAvailable = () => {
  try {
    require.resolve('@continuum/continuum-javascript-professional');
    return true;
  } catch (e) {
    return false;
  }
};

Cypress.Commands.add('a11yContinuumSetup', a11yContinuumSetup);
Cypress.Commands.add('a11yContinuumRunAllTests', a11yContinuumRunAllTests);
Cypress.Commands.add('a11YContinuumPrintResults', a11YContinuumPrintResults);
Cypress.Commands.add(
  'a11YContinuumFailIfConcerns',
  a11YContinuumFailIfConcerns
);
