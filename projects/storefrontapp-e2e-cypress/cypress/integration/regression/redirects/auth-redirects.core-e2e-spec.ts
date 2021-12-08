import {
  testRedirectAfterForcedLogin,
  testRedirectBackfterLogin,
} from '../../../helpers/auth-redirects';

context('Redirect after auth', () => {
  testRedirectBackfterLogin();
  testRedirectAfterForcedLogin();
});
