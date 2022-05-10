import {
  testRedirectAfterForcedLogin,
  testRedirectBackfterLogin,
} from '../../../helpers/auth-redirects';

context('Redirect after auth', () => {
  it(['redirects'],'should validate core redirect functionality after auth', () => {
    testRedirectBackfterLogin();
    testRedirectAfterForcedLogin();
  });
});
