/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
                (component) => component.uid === 'ThemeSwitcherComponent'
              );

              if (!themeComponent) {
                slot.components.component.push({
                  uid: 'ThemeSwitcherComponent',
                  uuid: 'ThemeSwitcherComponent',
                  typeCode: 'CMSFlexComponent',
                  modifiedtime: '2024-09-09T15:15:02.954Z',
                  name: 'Theme Switcher Component',
                  container: false,
                  flexType: 'ThemeSwitcherComponent',
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
