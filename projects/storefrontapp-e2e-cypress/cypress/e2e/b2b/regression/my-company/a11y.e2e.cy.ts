/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../../helpers/b2b/my-company/my-company.utils';

interface Announcement {
  text: string;
  clipPath: string;
}

describe('My Company - Accessibility', () => {
  let announcements: Announcement[];

  function expectAnnouncement(text: string) {
    cy.wrap(null).should(() => {
      const announcement = announcements.find((entry) => entry.text === text);
      expect(announcement, 'screen reader announcement').to.exist;
      // Cypress visibility checks do not account for CSS clip-path.
      expect(announcement?.clipPath, 'announcement is visually hidden').to.eq(
        'inset(50%)'
      );
    });
  }

  beforeEach(() => {
    const captured: Announcement[] = [];
    announcements = captured;
    loginAsMyCompanyAdmin();
    cy.visit('/organization/units/Rustic/', {
      onBeforeLoad(win) {
        const seen = new WeakMap<Element, string>();
        // Announcements expire after 500ms, possibly before cy.visit resolves.
        // Observe the actual live region from the beginning of the page load.
        new win.MutationObserver(() => {
          win.document
            .querySelectorAll(
              'cx-global-message .cx-visually-hidden[aria-live="polite"] span'
            )
            .forEach((element) => {
              const text = element.textContent?.trim();
              if (text && seen.get(element) !== text) {
                seen.set(element, text);
                captured.push({
                  text,
                  clipPath: win.getComputedStyle(
                    element.closest('.cx-visually-hidden') as Element
                  ).clipPath,
                });
              }
            });
        }).observe(win.document.documentElement, {
          childList: true,
          characterData: true,
          subtree: true,
        });
      },
    });
  });

  context('Announce navigation between views', () => {
    it('on view load', () => {
      expectAnnouncement('Unit Details');
    });
    it('on next view', () => {
      cy.then(() => {
        announcements.length = 0;
      });
      cy.contains('Child Units').click();
      expectAnnouncement('Child units');
    });
    it('on previous view', () => {
      cy.contains('Child Units').click();
      expectAnnouncement('Child units');
      cy.then(() => {
        announcements.length = 0;
      });
      cy.get('.close').last().click();
      expectAnnouncement('Unit Details');
    });
  });
});
