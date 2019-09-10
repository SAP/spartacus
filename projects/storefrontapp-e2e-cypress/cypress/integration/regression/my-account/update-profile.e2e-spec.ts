import {
  updateProfileTest,
  verifyAsAnonymous,
} from '../../../helpers/update-profile';
import { formats } from '../../../sample-data/viewports';

describe('My Account - Update Profile', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  verifyAsAnonymous();
  updateProfileTest();
});

describe(`${formats.mobile.width +
  1}p resolution - Update Profile page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();
  updateProfileTest();
});
