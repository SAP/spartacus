import * as asm from '../../helpers/asm';
import { formats } from '../../sample-data/viewports';

context(`${formats.mobile.width + 1}p resolution - ASM`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  asm.asmTests();
});
