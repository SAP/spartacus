const tabOrder: string[] = [
  'About SAP Commerce Cloud',
  'Frequently Asked Questions',
  'Visit SAP',
  'Contact Us',
  'Agile Commerce Blog',
  'Linked In',
  'Facebook',
  'Twitter',
];

function tabAndCheckElements(expectedContent: string[]) {
  expectedContent.forEach(expectedText => {
    cy.focused().should('contain', expectedText);
    cy.tab();
  });
}

export function checkFooter() {
  cy.visit('/');
  cy.get('cx-footer-navigation > cx-navigation-ui a')
    .first()
    .focus();
  tabAndCheckElements(tabOrder);
}
