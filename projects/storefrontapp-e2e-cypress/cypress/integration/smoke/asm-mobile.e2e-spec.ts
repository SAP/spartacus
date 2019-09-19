import * as asm from '../../helpers/asm';
import { formats } from '../../sample-data/viewports';

context(`Mobile ${formats.mobile.width + 1}p resolution`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  asm.asmTests();
});
