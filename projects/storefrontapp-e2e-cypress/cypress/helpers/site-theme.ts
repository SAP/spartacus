/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: (CXSPA-8363) This is only a temporary solution until we deploy the proper sample data to the CI server. Once that is done, this code should be removed.
import { cmsEndpoints } from './cms-endpoints';

export function interceptToSetBaseSiteTheme(theme: string) {
  cy.intercept('GET', /\/basesites\?fields=.*/, (req) => {
    req.continue((res) => {
      res?.body?.baseSites?.forEach((baseSite) => {
        baseSite.theme = theme;
      });
    });
  }).as('baseSitesWithTheme');
}

function interceptCmsPageToAddThemeComponent() {
  const path = `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
    'BASE_SITE'
  )}/${cmsEndpoints.pages}?lang=en&curr=USD`;
  cy.log(`Intercepting ${path}`);

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
}

export function interceptToAddThemeCompnent() {
  cy.intercept('GET', /\/basesites\?fields=.*/, (req) => {
    req.continue((res) => {
      res?.body?.baseSites?.forEach((baseSite) => {
        delete baseSite.theme;
      });
    });
  }).as('baseSitesNoTheme');

  interceptCmsPageToAddThemeComponent();
  cy.wait('@modifiedRequest');
}

export function interceptToAddThemeCompnentWithoutBaseSiteIntercept() {
  interceptCmsPageToAddThemeComponent();
}
