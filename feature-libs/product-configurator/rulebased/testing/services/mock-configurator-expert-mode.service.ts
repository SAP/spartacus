/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, of } from 'rxjs';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorExpertModeService {
  setExpModeRequested(): void {}
  getExpModeRequested(): Observable<boolean> {
    return of(false);
  }
  setExpModeActive(): void {}
  getExpModeActive(): Observable<boolean> {
    return of(false);
  }
}
