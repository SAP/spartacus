/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BREAKPOINT } from '../../config/layout-config';
import { BreakpointService } from '../breakpoint.service';

/**
 * Mock of {@link BreakpointService} for unit tests. Defaults to desktop.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockBreakpointService implements Partial<BreakpointService> {
  breakpoint$: Observable<BREAKPOINT> = of(BREAKPOINT.lg);

  get breakpoints(): BREAKPOINT[] {
    return [
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl,
    ];
  }

  getSize(): number | null {
    return null;
  }

  isDown(): Observable<boolean> {
    return of(false);
  }

  isUp(): Observable<boolean> {
    return of(true);
  }

  isEqual(): Observable<boolean> {
    return of(false);
  }
}
