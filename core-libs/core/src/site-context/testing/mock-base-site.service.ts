/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseSite } from '../../model/misc.model';
import { BaseSiteService } from '../facade/base-site.service';

/**
 * Mock of {@link BaseSiteService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockBaseSiteService implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return of('');
  }

  getAll(): Observable<BaseSite[]> {
    return of([]);
  }

  get(): Observable<BaseSite | undefined> {
    return of(undefined);
  }

  setActive(): void {}

  isInitialized(): boolean {
    return true;
  }
}
