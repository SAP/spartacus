import { MyCompanyConfig } from '../models/index';
import {
  ignoreCaseSensivity,
  loginAsMyCompanyAdmin,
} from '../my-company.utils';
import { completeForm, FormType, verifyDetails } from './utils/form';

export function updateTest(config: MyCompanyConfig) {
  describe(`${config.name} Update`, () => {
    let entityId: string;

    const codeRow = config.rows?.find((row) => row.useInUrl || row.useCookie);

    before(() => {
      loginAsMyCompanyAdmin();

      cy.route('GET', `**${config.apiEndpoint}**`).as('getEntity');
      if (config.preserveCookies) {
        cy.getCookie(codeRow.useCookie).then((cookie) => {
          entityId = cookie.value;
          cy.visit(`${config.baseUrl}/${entityId}`);
        });
      } else {
        entityId = codeRow.createValue;
        cy.visit(`${config.baseUrl}/${entityId}`);
      }
    });

    it(`should update`, () => {
      if (config.selectOptionsEndpoint) {
        cy.route(config.selectOptionsEndpoint).as('getSelectOptions');
      }

      cy.get(`cx-org-card a.link`).contains('Edit').click();
      cy.url().should('contain', `${config.baseUrl}/${entityId}/edit`);

      cy.get('cx-org-form div.header h3').contains(
        ignoreCaseSensivity(`Edit ${config.name}`)
      );

      if (config.selectOptionsEndpoint) {
        cy.wait('@getSelectOptions');
      }

      cy.route('PATCH', `**`).as('saveEntityData');
      cy.route('GET', `**${config.apiEndpoint}**`).as('loadEntityData');
      completeForm(config.rows, FormType.UPDATE);
      cy.get('div.header button').contains('Save').click();
      cy.wait('@saveEntityData');
      cy.wait('@loadEntityData');

      verifyDetails(config, FormType.UPDATE);
    });
  });
}
