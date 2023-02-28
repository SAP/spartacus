import { loginUser } from '../../../../helpers/checkout-flow';
import {
  cdcB2BDelegateAdminUser,
  waitForCmsComponentsToLoad,
} from '../../../../helpers/vendor/cdc/cdc';
import * as alerts from '../../../../helpers/global-message';

describe('Manage Users in CDC-B2B scenario', () => {
  beforeEach(() => {
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(cdcB2BDelegateAdminUser);
    waitForCmsComponentsToLoad('powertools-spa');
  });
  it('should show My Company option', () => {
    cy.get('cx-navigation-ui.accNavComponent.flyout')
      .should('contain.text', 'My Account')
      .and('be.visible')
      .within(() => {
        cy.get('cx-generic-link')
          .contains('My Company')
          .should('not.be.visible');
        cy.get('nav > ul > li > button').first().focus().trigger('keydown', {
          key: ' ',
          code: 'Space',
          force: true,
        });
        cy.get('cx-generic-link').contains('My Company').should('be.visible');
      });
  });
  it('should show Manage Users Button', () => {
    cy.visit('/powertools-spa/en/USD/organization/users');
    waitForCmsComponentsToLoad('powertools-spa');
    cy.get('button.button.primary.create').contains('Manage Users').click();
  });

  it('should hide edit, disbale, change password and unit details naviation buttons in user details', () => {
    cy.visit(
      `/powertools-spa/en/USD/organization/users/${cdcB2BDelegateAdminUser.userId}`
    );
    waitForCmsComponentsToLoad('powertools-spa');
    cy.get('a.link.edit').should('not.exist');
    cy.get('button.button.active').should('not.exist');
    cy.get('div.orgUnit').should('exist');

    cy.get('section.details').within(() => {
      cy.get('div.property.full-width').within(() => {
        cy.get('a.link').should('not.exist');
      });
    });
  });

  it('should stop navigation via url change', () => {
    cy.visit('/powertools-spa/en/USD/organization/users/create');
    alerts.getWarningAlert().should('contain', 'This item does not exist');

    cy.visit(
      `/powertools-spa/en/USD/organization/users/${cdcB2BDelegateAdminUser.userId}/edit`
    );
    alerts.getWarningAlert().should('contain', 'This item does not exist');

    cy.visit(
      `/powertools-spa/en/USD/organization/users/${cdcB2BDelegateAdminUser.userId}/change-password`
    );
    alerts.getWarningAlert().should('contain', 'This item does not exist');
  });
});
