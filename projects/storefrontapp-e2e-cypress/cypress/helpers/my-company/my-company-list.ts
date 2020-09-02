import {
  MyCompanyConfig,
  MyCompanySelectorSuffixes,
  MyCompanyRowConfig,
} from './models/index';
import {
  loginAsMyCompanyAdmin,
  waitForData,
  verifyList,
  getListRowsFromBody,
} from './my-company';

export function testListFromConfig(config: MyCompanyConfig) {
  const defaultRow = config.rows[0];

  // TODO: We should perform our own sort function to compare data returned with expected result
  describe(`${config.name} List`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.server();
    });

    it('should show list', () => {
      cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
      waitForData((data) => {
        checkUrlHasSortParams(defaultRow);
        cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
          () => {
            // cy.get('h3').should('contain.text', config.name);
            verifyList(
              getListRowsFromBody(data, config.objectType, config.rows),
              config.rows
            );
          }
        );
      }, cy.visit(`${config.baseUrl}s`));
    });

    it('should sort table data', () => {
      config.rows.forEach((row) => {
        cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
        waitForData((data) => {
          // TODO: Should be checked but sort param in url not currently implemented. Uncomment once it is.
          // checkUrlHasSortParams(row);

          cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
            () => {
              verifyList(
                getListRowsFromBody(data, config.objectType, config.rows),
                config.rows
              );
            }
          );
        }, clickSortButton(row));
      });
    });
  });

  function checkUrlHasSortParams(row: MyCompanyRowConfig) {
    cy.url().should('contain', `${config.baseUrl}s${row.sortByUrl ?? ''}`);
  }

  function clickSortButton(row: MyCompanyRowConfig) {
    cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`)
      .contains(row.label)
      .within(() => {
        cy.get('cx-icon[class^="cx-icon fas fa-sort"]').click();
      });
  }
}
