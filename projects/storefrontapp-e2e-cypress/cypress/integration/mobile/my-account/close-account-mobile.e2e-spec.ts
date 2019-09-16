import {
  closeAccountTest,
  verifyAsAnonymous,
} from '../../../helpers/close-account';
import { formats } from '../../../sample-data/viewports';
import * as homepage from '../../../helpers/homepage';

describe(`${formats.mobile.width + 1}p resolution - Close Account page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('close account test for logged in user', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      homepage.clickHamburger();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    closeAccountTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
