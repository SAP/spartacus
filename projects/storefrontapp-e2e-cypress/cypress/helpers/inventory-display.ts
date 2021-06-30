export function visitProduct(productCode) {
  const page = `/product/${productCode}`;
  cy.visit(page);
}
