import { ENTITY_UID_COOKIE_KEY, MyCompanyConfig } from '../models/index';
import {
  ignoreCaseSensivity,
  loginAsMyCompanyAdmin,
} from '../my-company.utils';
import { completeForm, FormType, verifyDetails } from './utils/form';

export function createTest(config: MyCompanyConfig) {
  describe(`${config.name} Create`, () => {
    let entityUId: string;
    let entityId: string;

    beforeEach(() => {
      loginAsMyCompanyAdmin();

      cy.intercept({
        method: 'GET',
        path: `**${config.apiEndpoint}**`,
      }).as('loadEntity');
      cy.visit(`${config.baseUrl}${entityId ? '/' + entityId : ''}`);
      cy.get('cx-storefront').contains('Loading...').should('not.exist');
      cy.wait('@loadEntity');
    });

    after(() => {
      entityUId = undefined;
    });

    it(`should create`, () => {
      if (config.selectOptionsEndpoint) {
        config.selectOptionsEndpoint.forEach((endpoint) => {
          cy.intercept(endpoint).as(`getSelectOptionsFor${endpoint}`);
        });
      }

      cy.get(`cx-org-list a`).contains('Add').click();

      cy.url().should('contain', `${config.baseUrl}/create`);

      cy.get('cx-org-form div.header h3').contains(
        ignoreCaseSensivity(`Create ${config.name}`)
      );

      if (config.selectOptionsEndpoint) {
        config.selectOptionsEndpoint.forEach((endpoint) => {
          cy.wait(`@getSelectOptionsFor${endpoint}`);
        });
      }
      completeForm(config.rows, FormType.CREATE);

      cy.intercept({ method: 'POST', path: `**${config.apiEndpoint}**` }).as(
        'saveEntityData'
      );
      cy.intercept({ method: 'GET', path: `**${config.apiEndpoint}**` }).as(
        'loadEntityData'
      );
      cy.get('div.header button').contains('Save').click();
      cy.wait('@saveEntityData').then((xhr) => {
        entityUId = xhr.response.body[config.entityIdField];
        entityId =
          entityUId ?? config.rows?.find((row) => row.useInUrl).createValue;

        if (config.preserveCookies) {
          cy.setCookie(ENTITY_UID_COOKIE_KEY, entityUId);
        }

        cy.wait('@loadEntityData');
        verifyDetails(config, FormType.CREATE);
        cy.get('cx-org-card cx-icon[type="CLOSE"]').click();
      });
    });
  });
}
