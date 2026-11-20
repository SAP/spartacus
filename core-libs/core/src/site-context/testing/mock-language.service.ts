/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Language } from '../../model/misc.model';
import { LanguageService } from '../facade/language.service';

/**
 * Mock of {@link LanguageService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockLanguageService implements Partial<LanguageService> {
  getAll(): Observable<Language[]> {
    return of([]);
  }

  getActive(): Observable<string> {
    return of('en');
  }

  setActive(): void {}

  isInitialized(): boolean {
    return true;
  }
}
