import { viewportContext } from '../../../helpers/viewport-context';
import * as aConsents from '../../../helpers/anonymous-consents';

context('Anonymous consents flow', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });

    describe('As an anonymous user', () => {
      it(['consents'],'should validate anonymous consents', () => {
        aConsents.testAcceptAnonymousConsents();
      });
    });
  });
});
