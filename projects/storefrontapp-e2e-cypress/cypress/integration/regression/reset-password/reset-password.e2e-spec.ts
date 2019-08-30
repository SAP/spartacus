import { formats } from '../../../sample-data/viewports';
import { resetPasswordTest } from '../../../helpers/reset-password';
export const PAGE_URL_RESET_PASSWORD = '/login/pw/change';

describe('Reset Password', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
  });

  beforeEach(() => {
    cy.visit(PAGE_URL_RESET_PASSWORD);
  });

  resetPasswordTest();
});

describe(`${formats.mobile.width + 1}p resolution - Reset Password`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  beforeEach(() => {
    cy.visit(PAGE_URL_RESET_PASSWORD);
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  resetPasswordTest();
});
