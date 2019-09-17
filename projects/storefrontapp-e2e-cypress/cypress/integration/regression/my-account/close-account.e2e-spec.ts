import {
  closeAccountTest,
  verifyAsAnonymous,
} from '../../../helpers/close-account';
import { formats } from '../../../sample-data/viewports';

describe('Close Account page', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  verifyAsAnonymous();
  closeAccountTest();
});

describe(`${formats.mobile.width + 1}p resolution - Close Account page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();
  closeAccountTest();
});
