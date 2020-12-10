import {
  ASSIGNMENT_LABELS,
  CONFIRMATION_LABELS,
  MyCompanyConfig,
} from './models/index';
import { completeForm, FormType } from './my-company-form';
import { ignoreCaseSensivity, loginAsMyCompanyAdmin } from './my-company.utils';

export function testAssignmentFromConfig(config: MyCompanyConfig) {
  config?.subCategories?.forEach((subConfig: MyCompanyConfig) => {
    describe(`${config.name} Assignment - ${subConfig.name}`, () => {
      let firstOption: string;
      const codeRow = config.rows?.find((row) => row.useInUrl || row.useCookie);

      before(() => {
        loginAsMyCompanyAdmin();

        cy.route('GET', `**${config.apiEndpoint}**`).as('getEntity');
        if (codeRow.useCookie) {
          cy.getCookie(codeRow.useCookie).then((cookie) => {
            cy.visit(`${config.baseUrl}/${cookie.value}`);
          });
        } else {
          cy.visit(`${config.baseUrl}/${codeRow.updateValue}`);
        }
        cy.wait('@getEntity');
      });

      it('should show no assignments', () => {
        cy.route('GET', `**`).as('getAssigned');
        cy.get('cx-org-card section.link-list')
          .contains(ignoreCaseSensivity(subConfig.name))
          .click();
        cy.wait('@getAssigned');

        if (codeRow.useCookie) {
          cy.getCookie(codeRow.useCookie).then((cookie) => {
            cy.url().should(
              'contain',
              `${config.baseUrl}/${cookie.value}${subConfig.baseUrl}`
            );
          });
        } else {
          cy.url().should(
            'contain',
            `${config.baseUrl}/${codeRow.updateValue}${subConfig.baseUrl}`
          );
        }

        cy.get('cx-org-card .header h3').contains(
          ignoreCaseSensivity(subConfig.name)
        );

        checkListEmpty();
      });

      if (subConfig.createConfig) {
        it('should create and show in list', () => {
          cy.get('cx-org-card .header a')
            .contains(ASSIGNMENT_LABELS.CREATE)
            .click();
          completeForm(subConfig.createConfig.rows, FormType.CREATE);
          cy.get('div.header button').contains('Save').click();

          const headerRows = subConfig.createConfig.rows?.filter(
            (row) => row.useInHeader
          );
          if (headerRows.length) {
            headerRows.forEach((hRow) => {
              cy.get('cx-org-sub-list table tr td').contains(
                ignoreCaseSensivity(hRow.createValue)
              );
            });
          } else {
            const nameRow = subConfig.createConfig.rows?.find(
              (row) => row.sortLabel === 'name'
            );
            cy.get('cx-org-sub-list table tr td').contains(nameRow.createValue);
          }
        });
      }

      if (subConfig.editConfig) {
        it('should update', () => {
          cy.get('cx-org-sub-list cx-table')
            .contains(subConfig.updateEntity)
            .click();
          cy.get('cx-org-card cx-view[position="3"] .header a')
            .contains(ASSIGNMENT_LABELS.EDIT)
            .click({ force: true });
          completeForm(subConfig.editConfig.rows, FormType.UPDATE);
          cy.get('div.header button').contains('Save').click();

          cy.get('cx-org-notification').contains(
            ASSIGNMENT_LABELS.UPDATE_SUCCESS
          );
          cy.get('cx-org-notification').should('not.exist');

          const headerRows = subConfig.editConfig.rows?.filter(
            (row) => row.useInHeader
          );
          if (headerRows.length) {
            headerRows.forEach((hRow) => {
              cy.get('cx-org-sub-list table tr td').contains(
                ignoreCaseSensivity(hRow.updateValue)
              );
            });
          } else {
            const nameRow = subConfig.editConfig.rows?.find(
              (row) => row.sortLabel === 'name'
            );
            cy.get('cx-org-sub-list table tr td').contains(nameRow.updateValue);
          }
        });
      }

      if (subConfig.deleteEntity) {
        it('should delete', () => {
          cy.server();
          cy.route('GET', `**${config.apiEndpoint}**`).as('getEntity');
          cy.route('DELETE', `**`).as('deleteEntity');

          cy.get('cx-org-sub-list cx-table').contains(subConfig.deleteEntity);
          cy.get(`cx-org-card cx-view[position="3"] .header button`)
            .contains('Delete')
            .click();
          cy.get('cx-org-confirmation')
            .should(
              'contain.text',
              `Are you sure you want to delete this ${subConfig.name.toLowerCase()}?`
            )
            .contains(CONFIRMATION_LABELS.CONFIRM)
            .click();
          cy.get('cx-org-confirmation').should('not.exist');
          cy.wait('@deleteEntity');
          cy.wait('@getEntity');

          checkListEmpty();
        });
      }

      if (subConfig.rolesConfig) {
        it('should modify user roles', () => {
          cy.get('cx-org-sub-list cx-table tr td')
            .contains(ASSIGNMENT_LABELS.ROLES)
            .click();

          checkRoles();
          checkRoleUpdateNotification();
          checkRoles(true);
          checkRoleUpdateNotification();

          function checkRoles(uncheck?: boolean) {
            subConfig.rolesConfig.rows.forEach((row) => {
              cy.get('cx-org-card cx-view[position="3"] label span')
                .contains(row.updateValue)
                .parent()
                .within(() => {
                  if (!uncheck) {
                    cy.get('[type="checkbox"]').check();
                  } else {
                    cy.get('[type="checkbox"]').uncheck();
                  }
                });
            });
          }

          function checkRoleUpdateNotification() {
            cy.get('cx-org-notification').contains(
              ASSIGNMENT_LABELS.ROLE_UPDATED_SUCCESS
            );
            cy.get('cx-org-notification').should('not.exist');
          }
        });
      }

      if (subConfig.manageAssignments) {
        it('should assign and unassign from assigned list', () => {
          cy.server();
          clickManage();

          cy.get('cx-org-sub-list cx-table tr td')
            .eq(0)
            .then((el) => {
              firstOption = el.text();

              clickAssign(firstOption);

              cy.route('GET', `**`).as('getAssignable');
              cy.get('cx-org-card .header')
                .contains(ASSIGNMENT_LABELS.DONE)
                .click();
              cy.wait('@getAssignable');

              clickUnassign(firstOption);
              checkListEmpty();
            });
        });

        it('should assign and unassign from assignments list', () => {
          cy.server();
          clickManage();

          clickAssign(firstOption);
          clickUnassign(firstOption);
          cy.get('cx-org-sub-list')
            .contains(firstOption)
            .parent()
            .parent()
            .contains(ASSIGNMENT_LABELS.ASSIGN);

          cy.route('GET', `**`).as('getAssignable');
          cy.get('cx-org-card .header')
            .contains(ASSIGNMENT_LABELS.DONE)
            .click();
          cy.wait('@getAssignable');

          checkListEmpty();
        });

        if (subConfig.canUnassignAll) {
          it('should assign and unassign all', () => {
            cy.server();
            clickManage();

            clickAssign(firstOption);
            clickUnassignAll();

            cy.get('cx-org-card .header a')
              .contains(ASSIGNMENT_LABELS.DONE)
              .click();

            checkListEmpty();
          });
        }
      }
    });

    function clickManage() {
      cy.route('GET', `**`).as('getAssignable');
      cy.get('cx-org-card .header a')
        .contains(ASSIGNMENT_LABELS.MANAGE)
        .click();
      cy.wait('@getAssignable');
      cy.get('cx-org-sub-list td.actions button.link')
        .contains(ASSIGNMENT_LABELS.ASSIGN)
        .should('exist');
    }

    function checkListEmpty() {
      cy.get('cx-org-sub-list div.main').contains('The list is empty');
    }

    function clickAssign(option: string) {
      cy.get('cx-org-sub-list')
        .contains(option)
        .parent()
        .parent()
        .contains(ASSIGNMENT_LABELS.ASSIGN)
        .click();
      cy.get('cx-org-notification').contains(
        ASSIGNMENT_LABELS.ASSIGNED_SUCCESS
      );
      cy.get('cx-org-notification').should('not.exist');
      cy.get('cx-org-sub-list')
        .contains(option)
        .parent()
        .parent()
        .contains(ASSIGNMENT_LABELS.UNASSIGN);
    }

    function clickUnassign(option: string) {
      cy.get('cx-org-sub-list')
        .contains(option)
        .parent()
        .parent()
        .contains(ASSIGNMENT_LABELS.UNASSIGN)
        .click();
      cy.get('cx-org-notification').contains(
        ASSIGNMENT_LABELS.UNASSIGNED_SUCCESS
      );
      cy.get('cx-org-notification').should('not.exist');
    }

    function clickUnassignAll() {
      cy.get('cx-org-card .header button')
        .contains(ASSIGNMENT_LABELS.UNASSIGN_ALL)
        .click();
      cy.get('cx-org-sub-list').should(
        'not.contain.html',
        `<button class="link"> ${ASSIGNMENT_LABELS.UNASSIGN} </button>`
      );
    }
  });
}
