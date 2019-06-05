export function switchSiteContext(option: string, label: string) {
  cy.get('.SiteContext label')
    .contains(label)
    .parent()
    .children('select')
    .select(option);
}
