import {
  updatePasswordTest,
  verifyAsAnonymous,
} from '../../../helpers/update-password';
import { formats } from '../../../sample-data/viewports';

describe('My Account - Update Password', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  verifyAsAnonymous();
  updatePasswordTest();
});

describe(`${formats.mobile.width +
  1}p resolution - Update Password page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  verifyAsAnonymous();
  updatePasswordTest();
});
