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
      cy.visit(`${config.baseUrl}s`);
    });

    it('should show details', () => {
      let firstRow;

      cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
      waitForData((data) => {
        const rows = getListRowsFromBody(data, config.objectType, config.rows);
        firstRow = rows[0];

        cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
          () => {
            cy.get('a').contains(`${firstRow.text[0]}`).click({ force: true });
          }
        );

        cy.url().should('contain', `${firstRow.links[0]}`);
      }, cy.visit(`${config.baseUrl}s`));

      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`).within(
        () => {
          // Check details exist on menu
          cy.get('h3').should('contain.text', firstRow.text[0]);

          // TODO: We should check labels are correct for property values
          config.rows.forEach((rowConfig) => {
            cy.get('div.property label').should(
              'contain.text',
              rowConfig.label
            );
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
        }
      );

      cy.url().should('contain', `${config.baseUrl}s`);
      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`).should(
        'not.exist'
      );
    });
  });
}
