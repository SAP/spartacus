import * as asm from '../../helpers/asm';
context('Desktop resolution', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  asm.asmTests();
});
