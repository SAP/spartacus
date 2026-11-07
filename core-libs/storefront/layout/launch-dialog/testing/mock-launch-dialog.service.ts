/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentRef, Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { LaunchDialogService } from '../services/launch-dialog.service';

/**
 * Mock of {@link LaunchDialogService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return EMPTY;
  }

  get dialogClose(): Observable<any | undefined> {
    return of(undefined);
  }

  openDialog(): Observable<any> | undefined {
    return EMPTY;
  }

  launch(): void | Observable<ComponentRef<any> | undefined> {
    return EMPTY;
  }

  openDialogAndSubscribe(): void {}

  clear(): void {}

  closeDialog(): void {}
}
