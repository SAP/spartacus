/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  testRedirectAfterForcedLogin,
  testRedirectBackfterLogin,
} from '../../../helpers/auth-redirects';

context('Redirect after auth', () => {
  testRedirectBackfterLogin();
  testRedirectAfterForcedLogin();
});
