import { CONTEXT_URL_EN_USD } from './site-context-selector';

export function testMyCompanyListFromConfig(config) {
  context(`${config.navLink} List`, () => {
    it('should navigate to list', () => {
      cy.get('cx-navigation-ui.companyNavComponent').within(() => {
        cy.get('a').contains(config.navLink).click({ force: true });
      });

      cy.get(config.listSelector).within(() => {
        const defaultSort = config.sorts.find((sort) => sort.default);
        cy.url().should('contain', `${config.url}${defaultSort.urlParams}`);
        cy.get('h3').should('contain.text', config.pageTitle);
        cy.get('a')
          .contains(config.createBtn.text)
          .parent()
          .should(
            'contain.html',
            `href="${config.url}${config.createBtn.link}"`
          );
        cy.get('cx-sorting .ng-select').should(
          'contain.text',
          defaultSort.value
        );
        cy.get('cx-table').within(() => {
          checkRowHeaders(config.rowHeaders);
          checkRows(config.rows, defaultSort.rowOrder);
        });
      });
    });

    it('should sort table data', () => {
      cy.get(config.listSelector).within(() => {
        config.sorts.forEach((sort) => {
          ngSelect(sort.value);
          cy.url().should('contain', `${config.url}${sort.urlParams}`);
          cy.get('cx-table').within(() => {
            checkRowHeaders(config.rowHeaders);
            checkRows(config.rows, sort.rowOrder);
          });
        });
      });
    });
  });
}

function checkRowHeaders(headers: string[]): void {
  headers.forEach((header: string) => {
    cy.get('th').should('contain.text', header);
  });
}

function checkRows(rows, order: number[]): void {
  let j = 0;
  order.forEach((rowNo: number) => {
    const row = rows[rowNo];
    cy.get('tr')
      .eq(j)
      .within(() => {
        for (let i = 0; i < row.text.length; i++) {
          cy.get('td').eq(i).should('contain.text', row.text[i]);
          if (row.links && row.links[i]) {
            cy.get('td')
              .eq(i)
              .should(
                'contain.html',
                `href="${CONTEXT_URL_EN_USD}${row.links[i]}"`
              );
          }
        }
      });
    j++;
  });
}

function ngSelect(sortKey: string): void {
  cy.get('cx-sorting .ng-select').click();
  cy.get('cx-sorting .ng-select .ng-dropdown-panel-items')
    .contains(new RegExp(`^${sortKey}$`, 'g'))
    .click({ force: true });
  cy.wait(1000);
}
