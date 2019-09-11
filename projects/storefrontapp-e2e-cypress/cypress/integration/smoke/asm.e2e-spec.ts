import * as checkout from '../../helpers/checkout-flow';

context('ASM', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should have ASM enabled', () => {
    checkout.visitHomePage();
    cy.get('cx-storefront').should('exist');
    cy.get('cx-asm').should('exist');
  });

  it('should have ASM UI hidden by default', () => {
    checkout.visitHomePage();
    cy.get('cx-asm').should('exist');
    cy.get('cx-asm-main-ui').should('not.exist');
  });

  it('should show the asm UI when ?asm=true is passed to the url', () => {
    checkout.visitHomePage(true);
    cy.get('cx-asm').should('exist');
    cy.get('cx-asm-main-ui').should('exist');
  });
});
