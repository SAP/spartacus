import { MyCompanyConfig } from './models/index';
import { loginAsMyCompanyAdmin } from './my-company.utils';

const LABEL_MANAGE = 'Manage';
const LABEL_ASSIGN = 'assign';
const LABEL_UNASSIGN = 'unassign';
const LABEL_UNASSIGN_ALL = 'Unassign All';
const LABEL_DONE = 'done';
const LABEL_ASSIGNED_SUCCESS = ' assigned successfully';
const LABEL_UNASSIGNED_SUCCESS = ' unassigned successfully';

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
          .contains(subConfig.name, {
            matchCase: false,
          })
          .click();

        cy.url().should(
          'contain',
          `${config.baseUrl}/${codeRow.updateValue}${subConfig.baseUrl}`
        );
        cy.get('cx-organization-card .header h3').contains(subConfig.name, {
          matchCase: false,
        });
        // TODO: Check h4 header

        cy.get('cx-organization-sub-list div.main').contains(
          'The list is empty'
        );
      });

      if (subConfig.manageAssignments) {
        it('should assign and unassign from assigned list', () => {
          cy.get('cx-organization-card .header a')
            .contains(LABEL_MANAGE)
            .click();
          cy.wait(1000);
          cy.get('cx-organization-sub-list cx-table tr td')
            .eq(0)
            .then((el) => {
              firstOption = el.text();
              console.log(el, el.text(), firstOption);

              cy.get('cx-organization-sub-list cx-table tr')
                .contains(firstOption)
                .parent()
                .parent()
                .contains(LABEL_ASSIGN)
                .click();

              cy.get('cx-notification').contains(LABEL_ASSIGNED_SUCCESS);

              cy.get('cx-organization-card .header a')
                .contains(LABEL_DONE)
                .click();

              cy.get('cx-organization-sub-list div.main')
                .contains(firstOption)
                .parent()
                .parent()
                .contains(LABEL_UNASSIGN)
                .click();

              cy.get('cx-notification').contains(LABEL_UNASSIGNED_SUCCESS);
              cy.get('cx-organization-sub-list div.main').contains(
                'The list is empty'
              );
            });
        });

        it('should assign and unassign from assignments list', () => {
          cy.get('cx-organization-card .header a')
            .contains(LABEL_MANAGE)
            .click();
          cy.wait(1000);
          cy.get('cx-organization-sub-list cx-table tr td')
            .eq(0)
            .then((el) => {
              firstOption = el.text();
              console.log(el, el.text(), firstOption);

              cy.get('cx-organization-sub-list cx-table tr')
                .contains(firstOption)
                .parent()
                .parent()
                .contains(LABEL_ASSIGN)
                .click();
              cy.wait(1000);

              cy.get('cx-notification').contains(LABEL_ASSIGNED_SUCCESS);

              cy.get('cx-organization-sub-list cx-table tr')
                .contains(firstOption)
                .parent()
                .parent()
                .contains(LABEL_UNASSIGN)
                .click();

              cy.wait(1000);
              cy.get('cx-notification').contains(LABEL_UNASSIGNED_SUCCESS);

              cy.get('cx-organization-sub-list cx-table tr')
                .contains(firstOption)
                .parent()
                .parent()
                .contains(LABEL_ASSIGN);

              cy.get('cx-organization-card .header a')
                .contains(LABEL_DONE)
                .click();

              cy.get('cx-organization-sub-list div.main').contains(
                'The list is empty'
              );
            });
        });

        if (subConfig.canUnassignAll) {
          it('should assign and unassign all', () => {
            cy.get('cx-organization-card .header a')
              .contains(LABEL_MANAGE)
              .click();
            cy.wait(1000);
            cy.get('cx-organization-sub-list cx-table tr td')
              .eq(0)
              .then((el) => {
                firstOption = el.text();
                console.log(el, el.text(), firstOption);

                cy.get('cx-organization-sub-list cx-table tr')
                  .contains(firstOption)
                  .parent()
                  .parent()
                  .contains(LABEL_ASSIGN)
                  .click();

                cy.get('cx-notification').contains(LABEL_ASSIGNED_SUCCESS);

                cy.get('cx-organization-card .header button')
                  .contains(LABEL_UNASSIGN_ALL)
                  .click();

                cy.wait(1000);

                cy.get('cx-organization-sub-list cx-table tr')
                  .contains(firstOption)
                  .parent()
                  .parent()
                  .contains(LABEL_ASSIGN);

                cy.get('cx-organization-card .header a')
                  .contains(LABEL_DONE)
                  .click();

                cy.get('cx-organization-sub-list div.main').contains(
                  'The list is empty'
                );
              });
          });
        }
      }
    });
  });
}
