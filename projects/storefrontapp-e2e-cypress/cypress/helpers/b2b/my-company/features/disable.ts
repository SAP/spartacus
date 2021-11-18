import { CONFIRMATION_LABELS, MyCompanyConfig } from '../models/index';
import { loginAsMyCompanyAdmin } from '../my-company.utils';

export function disableTest(config: MyCompanyConfig) {
  describe(`${config.name} Disable`, () => {
    let entityId: string;
    const codeRow = config.rows?.find((row) => row.useInUrl || row.useCookie);

    before(() => {
      loginAsMyCompanyAdmin();

      cy.intercept({ method: 'GET', path: `**${config.apiEndpoint}**` }).as(
        'getEntity'
      );
      if (config.preserveCookies) {
        cy.getCookie(codeRow.useCookie).then((cookie) => {
          entityId = cookie.value;
          cy.visit(`${config.baseUrl}/${entityId}`);
        });
      } else {
        entityId = codeRow.createValue;
        cy.visit(`${config.baseUrl}/${entityId}`);
      }
      cy.wait(`@getEntity`);
    });

    it('should disable/enable', () => {
      cy.intercept({ method: 'GET', path: `**${config.apiEndpoint}**` }).as(
        'loadEntity'
      );
      cy.intercept({ method: 'PATCH', path: `**` }).as('saveEntity');

      cy.get('cx-org-card cx-org-toggle-status button')
        .contains('Disable')
        .click();
      cy.get('cx-org-confirmation')
        .should('contain.text', `Disable this ${config.name.toLowerCase()}?`)
        .contains(CONFIRMATION_LABELS.CANCEL)
        .click();
      cy.get('cx-org-confirmation').should('not.exist');

      cy.get('cx-org-card cx-org-toggle-status button')
        .contains('Disable')
        .click();
      cy.get('cx-org-confirmation')
        .should('contain.text', `Disable this ${config.name.toLowerCase()}?`)
        .contains(CONFIRMATION_LABELS.DISABLE)
        .click();
      cy.wait('@saveEntity');
      cy.wait('@loadEntity');

      cy.get('cx-org-confirmation').should('not.exist');
      cy.get('cx-org-notification').should('not.exist');
      cy.get('div.header button').contains('Disable').should('not.exist');

      if (config.verifyStatusInDetails) {
        cy.get('section.details label')
          .contains('Status')
          .parent()
          .should('contain.text', 'Disabled');
      }

      cy.get('div.header button').contains('Enable').click();
      cy.wait('@saveEntity');
      cy.wait('@loadEntity');
      cy.get('cx-org-notification').should('not.exist');

      cy.get('div.header button').contains('Enable').should('not.exist');
      cy.get('div.header button').contains('Disable').should('exist');

      if (config.verifyStatusInDetails) {
        cy.get('section.details label')
          .contains('Status')
          .parent()
          .should('contain.text', 'Active');
      }
    });
  });
}
