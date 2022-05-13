import * as updateProfile from '../../../helpers/update-profile';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My Account - Update Profile', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });
    it(
      ['update_profile', 'my_account'],
      'should update profile core functionality',
      () => {
        updateProfile.testUpdateProfileLoggedInUser();
      }
    );
  });
});
