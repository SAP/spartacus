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

    it(`should update`, () => {
      if (config.selectOptionsEndpoint) {
        config.selectOptionsEndpoint.forEach((endpoint) => {
          cy.intercept(endpoint).as(`getSelectOptionsFor${endpoint}`);
        });
      }

      cy.get(`cx-org-card a.link`).contains('Edit').click();
      cy.url().should('contain', `${config.baseUrl}/${entityId}/edit`);

      cy.get('cx-org-form div.header h3').contains(
        ignoreCaseSensivity(`Edit ${config.name}`)
      );

      if (config.selectOptionsEndpoint) {
        config.selectOptionsEndpoint.forEach((endpoint) => {
          cy.wait(`@getSelectOptionsFor${endpoint}`);
        });
      }

      cy.intercept({ method: 'PATCH', path: `**` }).as('saveEntityData');
      cy.intercept({ method: 'GET', path: `**${config.apiEndpoint}**` }).as(
        'loadEntityData'
      );
      completeForm(config.rows, FormType.UPDATE);
      cy.get('div.header button').contains('Save').click();
      cy.wait('@saveEntityData');
      cy.wait('@loadEntityData');

      verifyDetails(config, FormType.UPDATE);
    });
  });
}
