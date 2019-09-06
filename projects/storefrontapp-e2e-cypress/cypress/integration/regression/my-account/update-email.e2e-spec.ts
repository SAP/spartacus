import {
  updateEmailTest,
  verifyAsAnonymous,
} from '../../../helpers/update-email';
import { formats } from '../../../sample-data/viewports';

describe('Update Email Address page', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  verifyAsAnonymous();
  updateEmailTest();
});

describe(`${formats.mobile.width + 1}p resolution - Update Email page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();
  updateEmailTest();
});
