/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: (CXSPA-8363) This is only a temporary solution until we deploy the proper sample data to the CI server. Once that is done, this code should be removed.
export function interceptToAddThemeCompnent() {
  const path = `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
    'BASE_SITE'
  )}/cms/pages?lang=en&curr=USD`;

  cy.intercept('GET', path, (req) => {
    req.reply((res) => {
      if (res.body?.contentSlots?.contentSlot) {
        res.body.contentSlots.contentSlot =
          res.body.contentSlots.contentSlot.map((slot) => {
            if (
              slot.slotId === 'SiteContextSlot' &&
              slot.components &&
              Array.isArray(slot.components.component)
            ) {
              const themeComponent = slot.components.component.find(
                (component) => component.uid === 'SiteThemeSwitcherComponent'
              );

              if (!themeComponent) {
                slot.components.component.push({
                  uid: 'SiteThemeSwitcherComponent',
                  uuid: 'SiteThemeSwitcherComponent',
                  typeCode: 'CMSFlexComponent',
                  modifiedtime: '2024-09-09T15:15:02.954Z',
                  name: 'Site Theme Switcher Component',
                  container: false,
                  flexType: 'SiteThemeSwitcherComponent',
                  synchronizationBlocked: false,
                });
              }
            }
            return slot;
          });
      }
    });
  }).as('modifiedRequest');
  cy.wait('@modifiedRequest');
}
