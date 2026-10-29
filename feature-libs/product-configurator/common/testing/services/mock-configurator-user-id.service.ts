/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';

/** Mock: UserIdService provides a fixed user id via observables. */
export class MockConfiguratorUserIdService implements Partial<UserIdService> {
  readonly NAMED_USER = 'NAMED_USER';

  getUserId = vi.fn().mockReturnValue(of(this.NAMED_USER));
  takeUserId = vi.fn().mockReturnValue(of(this.NAMED_USER));
}
