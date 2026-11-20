/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AbstractType, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { EventService } from '../event.service';

/**
 * Mock of {@link EventService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockEventService implements Partial<EventService> {
  get<T>(_eventType: AbstractType<T>): Observable<T> {
    return EMPTY;
  }

  dispatch<T extends object>(_event: T, _eventType?: AbstractType<T>): void {}

  register(): () => void {
    return () => {};
  }
}
