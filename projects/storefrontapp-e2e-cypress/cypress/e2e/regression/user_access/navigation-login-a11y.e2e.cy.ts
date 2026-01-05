/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as login from '../../../helpers/login';
import { visitLoginPage } from '../../../support/utils/login';

function assertNavigationButtonsAttributes(buttonsSelector: string) {
  cy.get(buttonsSelector).each(($btn) => {
    const btnAriaLabel = $btn.attr('aria-label');
    const btnAriaControls = $btn.attr('aria-controls');
    cy.get('a').contains(btnAriaLabel).should('exist');
    expect(btnAriaLabel + ' Menu').to.equal($btn.attr('title'));
    cy.get(`div#${btnAriaControls}`).should('exist');
  });
}

describe('Navigation Login', () => {
  it('should login and logout successfully and have correct Navigation Menu buttons values', () => {
    let user;
    cy.whenJDK17(() => {
      visitLoginPage();
    });
    cy.whenJDK21(() => {
      cy.visit('/login/register');
    });
    user = login.registerUserFromLoginPage();
    login.loginUser();

    const tokenRevocationRequestAlias = login.listenForTokenRevocationRequest();

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
