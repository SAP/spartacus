import { ASSIGNMENT_LABELS, MyCompanyConfig } from './models/index';
import { completeForm } from './my-company-form';
import { IGNORE_CASE, loginAsMyCompanyAdmin } from './my-company.utils';

export function testAssignmentFromConfig(config: MyCompanyConfig) {
  config?.subCategories?.forEach((subConfig: MyCompanyConfig) => {
    describe(`${config.name} Assignment - ${subConfig.name}`, () => {
      let firstOption: string;
      const codeRow = config.rows?.find((row) => row.useInUrl);

      before(() => {
        loginAsMyCompanyAdmin();
        cy.visit(`${config.baseUrl}/${codeRow.updateValue}`);
      });

      beforeEach(() => {
        cy.server();
      });

      it('should show no assignments', () => {
        cy.get('cx-organization-card section.link-list')
          .contains(subConfig.name, IGNORE_CASE)
          .click();

        cy.url().should(
          'contain',
          `${config.baseUrl}/${codeRow.updateValue}${subConfig.baseUrl}`
        );
        cy.get('cx-organization-card .header h3').contains(
          subConfig.name,
          IGNORE_CASE
        );
        // TODO: Check h4 header

        checkListEmpty();
      });

      if (subConfig.createConfig) {
        it('should create and show in list', () => {
          cy.get('cx-organization-card .header a')
            .contains(ASSIGNMENT_LABELS.CREATE)
            .click();
          completeForm(subConfig.createConfig.rows, 'createValue');
          cy.get('div.header button').contains('Save').click();

          const headerRows = subConfig.createConfig.rows?.filter(
            (row) => row.useInHeader
          );
          if (headerRows.length) {
            headerRows.forEach((hRow) => {
              cy.get('cx-organization-sub-list table tr td').contains(
                hRow.createValue,
                {
                  matchCase: false,
                }
              );
            });
          } else {
            const nameRow = subConfig.createConfig.rows?.find(
              (row) => row.sortLabel === 'name'
            );
            cy.get('cx-organization-sub-list table tr td').contains(
              nameRow.createValue
            );
          }
        });
      }

      if (subConfig.manageAssignments) {
        it('should assign and unassign from assigned list', () => {
          clickManage();

          cy.get('cx-organization-sub-list cx-table tr td')
            .eq(0)
            .then((el) => {
              firstOption = el.text();

              clickAssign(firstOption);
              cy.get('cx-organization-card .header a')
                .contains(ASSIGNMENT_LABELS.DONE)
                .click();

              clickUnassign(firstOption);
              checkListEmpty();
            });
        });

        it('should assign and unassign from assignments list', () => {
          clickManage();

          clickAssign(firstOption);
          clickUnassign(firstOption);
          cy.get('cx-organization-sub-list')
            .contains(firstOption)
            .parent()
            .parent()
            .contains(ASSIGNMENT_LABELS.ASSIGN);

          cy.get('cx-organization-card .header a')
            .contains(ASSIGNMENT_LABELS.DONE)
            .click();

          checkListEmpty();
        });

        if (subConfig.canUnassignAll) {
          it('should assign and unassign all', () => {
            clickManage();

            clickAssign(firstOption);
            clickUnassignAll();

            cy.get('cx-organization-card .header a')
              .contains(ASSIGNMENT_LABELS.DONE)
              .click();

            checkListEmpty();
          });
        }
      }
    });

    function clickManage() {
      cy.get('cx-organization-card .header a')
        .contains(ASSIGNMENT_LABELS.MANAGE)
        .click();
      cy.get('cx-organization-sub-list td.actions button.link')
        .contains(ASSIGNMENT_LABELS.ASSIGN)
        .should('exist');
    }

    function checkListEmpty() {
      cy.get('cx-organization-sub-list div.main').contains('The list is empty');
    }

    function clickAssign(option: string) {
      cy.get('cx-organization-sub-list')
        .contains(option)
        .parent()
        .parent()
        .contains(ASSIGNMENT_LABELS.ASSIGN)
        .click();
      cy.get('cx-notification').contains(ASSIGNMENT_LABELS.ASSIGNED_SUCCESS);
      cy.get('cx-notification').should('not.exist');
      cy.get('cx-organization-sub-list')
        .contains(option)
        .parent()
        .parent()
        .contains(ASSIGNMENT_LABELS.UNASSIGN);
    }

    function clickUnassign(option: string) {
      cy.get('cx-organization-sub-list')
        .contains(option)
        .parent()
        .parent()
        .contains(ASSIGNMENT_LABELS.UNASSIGN)
        .click();
      cy.get('cx-notification').contains(ASSIGNMENT_LABELS.UNASSIGNED_SUCCESS);
      cy.get('cx-notification').should('not.exist');
    }

    function clickUnassignAll() {
      cy.get('cx-organization-card .header button')
        .contains(ASSIGNMENT_LABELS.UNASSIGN_ALL)
        .click();
      cy.get('cx-organization-sub-list').should(
        'not.contain.html',
        `<button class="link"> ${ASSIGNMENT_LABELS.UNASSIGN} </button>`
      );
    }
  });
}
