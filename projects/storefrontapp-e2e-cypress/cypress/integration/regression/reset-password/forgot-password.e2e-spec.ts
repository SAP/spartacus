import { forgotPasswordTest } from '../../../helpers/forgot-password';
import { formats } from '../../../sample-data/viewports';

export const PAGE_URL_FORGOT_PASSWORD = '/login/forgot-password';

context('Forgot Password Page', () => {
  beforeEach(() => {
    // Clear the session to make sure no user is athenticated.
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit(PAGE_URL_FORGOT_PASSWORD);
  });

  forgotPasswordTest();
});

describe(`${formats.mobile.width + 1}p resolution - Forgot Password`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  beforeEach(() => {
    cy.visit(PAGE_URL_FORGOT_PASSWORD);
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  forgotPasswordTest();
});
