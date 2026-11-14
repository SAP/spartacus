/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../facade/global-message.service';
import { GlobalMessageEntities } from '../store/global-message-state';

/**
 * Mock of {@link GlobalMessageService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }

  add(): void {}

  remove(): void {}
}
