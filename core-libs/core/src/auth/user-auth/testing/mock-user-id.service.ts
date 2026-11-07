/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { UserIdService } from '../facade/user-id.service';

/**
 * Mock of {@link UserIdService} for unit tests. Defaults to the current user id.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }

  takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }

  setUserId(): void {}

  clearUserId(): void {}

  isEmulated(): Observable<boolean> {
    return of(false);
  }
}
