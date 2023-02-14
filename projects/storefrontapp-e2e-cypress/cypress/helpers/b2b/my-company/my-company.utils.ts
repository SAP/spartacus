/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';
import { clearCacheTestIsolation } from '../../utils-cypress-legacy';
import { MyCompanyConfig } from './models/index';
import {
  testCoreFeaturesFromConfig,
  testFeaturesFromConfig,
} from './my-company-features';

export function testMyCompanyFeatureFromConfig(
  config: MyCompanyConfig,
  core: boolean = false
) {
  describe(
    `My Company - ${config.name}${config.nameSuffix || ''}`,
    { testIsolation: false },
    () => {
      clearCacheTestIsolation();
      Cypress.Cookies.debug(true);
      before(() => {
        Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        // if (config.preserveCookies) {
        //   cy.log('flo cookies1');

        //   // Cypress.Cookies.preserveOnce(ENTITY_UID_COOKIE_KEY);
        //   cy.session('test', cy.restoreLocalStorage, {
        //     validate() {
        //       cy.getCookies();
        //     },
        //   });
        // } else {
        //   cy.restoreLocalStorage();
        //   cy.log('flo NO COOKIES');
        // }
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      if (core) {
        testCoreFeaturesFromConfig(config);
      } else {
        testFeaturesFromConfig(config);
      }
    }
  );
}

export function waitForData(
  suffix: string,
  thenCommand: Function,
  waitForCommand: Function = () => {}
): void {
  waitForCommand();
  cy.wait(`@getData${suffix}`).then((xhr: any) => {
    if (xhr.aborted) {
      waitForData(suffix, thenCommand);
    } else {
      thenCommand(xhr?.response?.body);
    }
  });
}

/**
 * Login as user with organization administration powers.
 */
export function loginAsMyCompanyAdmin(): void {
  var minWait = 750;
  var maxWait = 1500;
  cy.wait(Math.floor(Math.random() * (maxWait - minWait) + minWait));
  cy.requireLoggedIn(myCompanyAdminUser);
}

/**
 * Converts string value to RegExp ignoring case sensivity.
 */
export function ignoreCaseSensivity(base: string): RegExp {
  return new RegExp(base, 'i');
}
