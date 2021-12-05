import { AccountData } from '../../../support/require-logged-in.commands';
import {
  createUser,
  testRedirectAfterTokenExpiryAndHttpCall,
  testRedirectAfterTokenExpiryAndPageRefresh,
} from '../../../helpers/auth-redirects';

context('Redirect after auth', () => {
  let user: AccountData;

  before(() => {
    user = createUser();
  });

  testRedirectAfterTokenExpiryAndHttpCall(user);

  testRedirectAfterTokenExpiryAndPageRefresh(user);
});
