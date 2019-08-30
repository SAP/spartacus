export const tabOrderContent = {
  footer: [
    'About SAP Commerce Cloud',
    'Frequently Asked Questions',
    'Visit SAP',
    'Contact Us',
    'Agile Commerce Blog',
    'Linked In',
    'Facebook',
    'Twitter',
  ],
};

export function verifyTabOrder(
  startElementSelector: string,
  expectedContent: string[]
) {
  cy.get(startElementSelector)
    .first()
    .focus();
  expectedContent.forEach(expectedText => {
    cy.focused().should('contain', expectedText);
    cy.tab();
  });
}
