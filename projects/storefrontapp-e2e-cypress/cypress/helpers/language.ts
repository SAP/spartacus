// Use language switcher to change language

export function switchLanguage(lang: string) {
  cy.get('.SiteContext label')
    .contains('Language')
    .parent()
    .children('select')
    .select(lang, { force: true });
}
