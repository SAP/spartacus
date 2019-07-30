import { clickHamburger } from './homepage';

// Use language switcher to change language

export function switchLanguage(lang: string, isMobile?: boolean) {
  if (isMobile) {
    clickHamburger();
  }

  cy.get('.SiteContext label')
    .should('be.visible')
    .contains('Language')
    .parent()
    .children('select')
    .select(lang, { force: true });
}
