/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

function assertNavigationButtonsAttributes(buttonsSelector: string) {
  cy.get(buttonsSelector).each(($btn) => {
    const btnAriaControl = $btn.attr('aria-controls');
    cy.wrap($btn)
      .should('have.attr', 'title', `${btnAriaControl} Menu`)
      .should('have.attr', 'aria-label', btnAriaControl);
  });
}

describe('Navigation Login', () => {
  let user;
  viewportContext(['desktop'], () => {
    before(() => {
      cy.visit('/login');
      user = login.registerUserFromLoginPage();
    });

    it('should login and logout successfully and have correct Navigation Menu buttons values', () => {
      login.loginUser();

      const tokenRevocationRequestAlias =
        login.listenForTokenRevocationRequest();

      cy.get('cx-login button')
        .as('myAccountBtn')
        .invoke('attr', 'ariaLabel')
        .contains(`Hi, ${user.firstName} ${user.lastName}`);

      const mainCategoryMenuBrandsRootBtnSelector =
        'cx-category-navigation button[aria-controls]';
      assertNavigationButtonsAttributes(mainCategoryMenuBrandsRootBtnSelector);

      login.signOutUser();
      cy.wait(tokenRevocationRequestAlias);
      cy.get('@myAccountBtn').should('not.exist');
      assertNavigationButtonsAttributes(mainCategoryMenuBrandsRootBtnSelector);
    });
  });
});
