/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { User } from '@spartacus/user/account/root';

export abstract class UserAccountAdapter {
  abstract load(userId: string): Observable<User>;
}
