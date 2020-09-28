import { CONTEXT_URL_EN_USD } from '../site-context-selector';
import { MyCompanyConfig, MyCompanySelectorSuffixes } from './models';
import {
  loginAsMyCompanyAdmin,
  waitForData,
  getListRowsFromBody,
} from './my-company';

export function testDetailsFromConfig(config: MyCompanyConfig) {
  describe(`${config.name} Details`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.server();
    });

    it('should show details', () => {
      let firstRow;

      cy.visit(`/organization`);
      cy.route('GET', `**/users/current/${config.apiEndpoint}**`).as('getData');
      waitForData((data) => {
        const listData = getListRowsFromBody(
          data,
          config.objectType,
          config.rows
        );
        firstRow = listData[0];
        cy.get('cx-organization-list a')
          .contains(firstRow.text[0])
          .click({ force: true });
      }, cy.get(`cx-page-slot.BodyContent a`).contains(config.name).click());

      // cy.url().should('contain', `${firstRow.links[0]}`);

      cy.get(`cx-organization-card`).within(() => {
        cy.get('div.header').within(() => {
          cy.get('h3').should('contain.text', `${config.name} Details`);
          cy.get('h4').should(
            'contain.text',
            `${config.name}: ${firstRow.text[0]}`
          );
        });

        cy.get('div.main').within(() => {
          cy.get('section.details').within(() => {});
          cy.get('section.link-list').within(() => {
            config.subCategories.forEach((subCategory: MyCompanyConfig) => {
              cy.get('a')
                .contains(subCategory.name)
                .should(
                  'contain.html',
                  `href="${CONTEXT_URL_EN_USD}/organization/${firstRow.text[0]}/${subCategory.baseUrl}`
                );
            });
          });
        });

        // TODO: We should check labels are correct for property values
        config.rows.forEach((rowConfig) => {
          cy.get('div.property label').should('contain.text', rowConfig.label);
        });
        firstRow.text.forEach((row) => {
          cy.get('div.property').should('contain.text', row);
        });

        // TODO: Need to check links but not the link to itself
        // console.log(firstRow.links);
        // firstRow.links.forEach((link) => {
        //   cy.get('div.property a').should('contain.html', link);
        // });

        // Close details
        cy.get('cx-icon[type="CARET_LEFT"]').click();
      });

      cy.url().should('contain', `${config.baseUrl}s`);
      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`).should(
        'not.exist'
      );
    });
  });
}
