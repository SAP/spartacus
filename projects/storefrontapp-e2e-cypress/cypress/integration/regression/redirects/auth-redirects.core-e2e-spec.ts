import { AccountData } from '../../../support/require-logged-in.commands';
import {
  createUser,
  testRedirectAfterForcedLogin,
  testRedirectBackfterLogin
} from '../../../helpers/auth-redirects';

context('Redirect after auth', () => {
  /*
  let user: AccountData;

  before(() => {
    user = createUser();
  });*/

  testRedirectBackfterLogin();
  testRedirectAfterForcedLogin();
});
