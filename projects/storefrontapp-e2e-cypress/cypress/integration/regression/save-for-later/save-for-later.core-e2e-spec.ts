import { viewportContext } from '../../../helpers/viewport-context';
import * as saveForLater from '../../../helpers/save-for-later';

context('Save for later', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    it(
      ['save_for_later'],
      'should validate save for later core functionality',
      () => {
        saveForLater.testAnonymousUserSaveForLater();
        saveForLater.testLoggedInUserSaveForLater();
      }
    );
  });
});
