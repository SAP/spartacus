/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// This is a basic custom support file for using Continuum's JavaScript SDK with Cypress
// Lots of functionality is already available to you here out of the box, but we encourage you to add your own custom commands!

import {
  Continuum,
  ReportManagementStrategy,
  ModuleManagementStrategy,
} from '@continuum/continuum-javascript-professional';

const accessEngineFilePath =
  `node_modules/@continuum/continuum-javascript-professional/AccessEngine.professional.js`.replace(
    /^\//,
    ''
  ); // versions of Cypress prior to 5 include a leading forward slash in __dirname

const setUpContinuum = (configFilePath) =>
  // Using the Continuum JavaScript SDK requires us to load the following files before invoking `Continuum.setUp`:
  // * the Continuum configuration file (continuum.conf.js) specified by `configFilePath`
  // * Access Engine (AccessEngine.professional.js), the underlying accessibility testing engine Continuum uses
  // Normally code outside the Continuum JavaScript SDK is not required to do this, but Cypress' design essentially forces our hand

  cy
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

const runAllAccessibilityTests = (includeiframe = false) =>
  // We verify Access Engine is loaded, loading it again only if necessary, before running our accessibility tests using `Continuum.runAllTests`

  cy
    .window()
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

const printAccessibilityTestResults = () => {
  const accessibilityConcerns = Continuum.getAccessibilityConcerns();

  if (accessibilityConcerns.length > 0) {
    // print out some information about each accessibility concern,
    // highlighting offending elements along the way
    accessibilityConcerns.forEach((accessibilityConcern) => {
      // if the element to highlight is in shadow DOM, highlight its shadow root nearest the light DOM;
      // there's an outstanding defect preventing us from directly highlighting elements in shadow DOM: https://github.com/cypress-io/cypress/issues/8843
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
};

const failIfAnyAccessibilityConcerns = () => {
  expect(
    Continuum.getAccessibilityConcerns(),
    'no accessibility concerns'
  ).to.have.lengthOf(0);
};

const submitAccessibilityConcernsToAMP = (reportName = 'AMP Report') => {
  const accessibilityConcerns = Continuum.getAccessibilityConcerns();
  if (accessibilityConcerns.length <= 0) {
    return;
  }

  if (
    Cypress.env('AMP_API_TOKEN') &&
    (Cypress.env('AMP_API_TOKEN') !== '' ||
      Cypress.env('AMP_API_TOKEN') !== 'undefined')
  ) {
    cy.log('Submitting accessibility concerns to AMP...');

    cy.title({ log: false }).then((pageTitle) => {
      cy.url({ log: false }).then({ timeout: 30000 }, async (pageUrl) => {
        const ampReportingService = Continuum.AMPReportingService;

        await ampReportingService.setActiveOrganization(
          Cypress.env('AMP_ORG_ID')
        ); // ID of AMP organization to submit test results to
        await ampReportingService.setActiveAsset(Cypress.env('AMP_ASSET_ID')); // ID of AMP asset to submit test results to
        await ampReportingService.setActiveReportByName(reportName);
        await ampReportingService.setActiveModuleByName(pageTitle, pageUrl);
        await ampReportingService.setActiveReportManagementStrategy(
          ReportManagementStrategy.APPEND
        );
        await ampReportingService.setActiveModuleManagementStrategy(
          ModuleManagementStrategy.OVERWRITE
        );
        await ampReportingService.submitAccessibilityConcernsToAMP(
          accessibilityConcerns
        );

        cy.log(
          `Accessibility concerns submitted to AMP: ${ampReportingService.activeModule.getAMPUrl()}`
        );
      });
    });
  } else {
    cy.log(
      'Failed to submit accessibility concerns to AMP. AMP_API_TOKEN not set.'
    );
  }
};

Cypress.Commands.add('setUpContinuum', setUpContinuum);
Cypress.Commands.add('runAllAccessibilityTests', runAllAccessibilityTests);
Cypress.Commands.add(
  'printAccessibilityTestResults',
  printAccessibilityTestResults
);
Cypress.Commands.add(
  'failIfAnyAccessibilityConcerns',
  failIfAnyAccessibilityConcerns
);
Cypress.Commands.add(
  'submitAccessibilityConcernsToAMP',
  submitAccessibilityConcernsToAMP
);
