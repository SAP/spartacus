import { MyCompanyConfig } from './models/index';
import {
  loginAsMyCompanyAdmin,
  waitForData,
  verifyList,
  getListRowsFromBody,
} from './my-company';
import { testList, testListSorting } from './my-company-list';

export function testAssignmentFromConfig(config: MyCompanyConfig) {
  config?.subCategories?.forEach((tab) => {
    let firstRow;
    const selectorAssignment = `${config.selector}-assign-${tab.selector}`;
    const selectorList = `${config.selector}-${tab.selector}-list`;

    describe(`${config.name} Assignment - ${tab.name}`, () => {
      let listData: any;

      before(() => {
        loginAsMyCompanyAdmin();
        cy.visit(`${config.baseUrl}`);
      });

      beforeEach(() => {
        cy.server();
      });

      it('should show list', () => {
        testList(config, cy.visit(`${config.baseUrl}s`), (data) => {
          listData = data;
          firstRow = data[0];
          cy.get('a').contains(`${firstRow.text[0]}`).click({ force: true });
          cy.url().should('contain', `${firstRow.links[0]}`);

          cy.route('GET', `${tab.apiEndpoint}`).as('getData');
          waitForData((assignmentData: any) => {
            cy.url().should(
              'contain',
              `${config.baseUrl}s/${firstRow.text[1]}${tab.baseUrl}`
            );
            listData = getListRowsFromBody(
              assignmentData,
              tab.objectType,
              tab.rows
            );

            // TODO: Should show all assigned items in details table
          }, cy.get(`${config.selector}-list a`).contains(tab.name).click({ force: true }));
        });
      });

      // TODO: Fails because assignment details do not align
      it('should show assignments list', () => {
        cy.get('a').contains('Assign').click();
        cy.url().should(
          'contain',
          `${config.baseUrl}s/${firstRow.text[1]}${tab.baseUrl}/assign`
        );
        cy.get(`${selectorAssignment} h3`).should(
          'contain.text',
          `Assign ${tab.name.toLowerCase()}`
        );
        cy.wait(5000);
        verifyList(listData, tab.rows);
      });

      it('should sort assignments table data', () => {
        testListSorting(tab);
      });

      it('should toggle assignment and validate', () => {
        if (listData[0].selected) {
          unassignAndValidate();
          assignAndValidate();
        } else {
          assignAndValidate();
          unassignAndValidate();
        }

        function assignAndValidate() {
          cy.get('cx-table').within(() => {
            cy.route('POST', `**`).as('getData');
            cy.get('tr input[type="checkbox"]').eq(1).click({ force: true });
            cy.wait('@getData');
            cy.get('tr input[type="checkbox"]').eq(1).should('be.checked');
          });
          cy.get(`${selectorAssignment} cx-icon[type="CARET_LEFT"]`).click();
          cy.get(selectorList).within(() => {
            cy.get('cx-table').within(() => {
              // cy.get('tr').should('have.length', 3);
            });
            // cy.get('a').contains('Manage').click();
          });
          cy.url().should(
            'contain',
            `${config.baseUrl}s/${firstRow.text[1]}${tab.baseUrl}`
          );
        }

        function unassignAndValidate() {
          cy.get('a').contains('Assign').click();
          cy.get('cx-table').within(() => {
            cy.route('DELETE', `**`).as('delete');
            cy.get('tr input[type="checkbox"]').eq(1).click({ force: true });
            cy.wait('@delete');
            cy.get('tr input[type="checkbox"]').eq(1).should('not.be.checked');
          });
          cy.get(`${selectorAssignment} cx-icon[type="CARET_LEFT"]`).click();
          cy.get(selectorList).within(() => {
            cy.get('cx-table').within(() => {
              // cy.get('tr').should('have.length', 2);
            });
            // cy.get('a').contains('Manage').click();
          });
          cy.url().should(
            'contain',
            `${config.baseUrl}s/${firstRow.text[1]}${tab.baseUrl}`
          );
        }
      });

      if (tab.canUnassignAll) {
        it(`should unassign all and validate`, () => {
          cy.get('a').contains('Assign').click();

          cy.route('DELETE', `**`).as('getData');
          cy.get(`a`).contains('Unassign All').click();
          cy.wait('@getData');

          cy.get(selectorAssignment).within(() => {
            cy.get('cx-table').within(() => {
              cy.get('tr input[type="checkbox"]').should('not.be.checked');
            });
          });
          cy.get(`${selectorAssignment} cx-icon[type="CARET_LEFT"]`).click();

          cy.get(`${selectorList}`).should('contain.text', 'The list is empty');

          cy.url().should(
            'contain',
            `${config.baseUrl}s/${firstRow.text[1]}${tab.baseUrl}`
          );
          // cy.get(`${tab.manageSelector} h3`).should('contain.text', 'Manage');
        });
      }

      it('should go back to main menu', () => {
        cy.wait(1000);
        cy.get(`${selectorList} cx-icon[type="CARET_LEFT"]`).click();
        cy.url().should('contain', config.baseUrl);
      });
    });
  });
}
