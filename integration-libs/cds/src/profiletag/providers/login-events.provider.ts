/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, provideAppInitializer } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActionsSubject } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { LOGIN_EVENTS, LoginEventEnvelope } from '../tokens/login-events.token';

/**
 * Provides login events tracking that starts immediately on app initialization.
 * Uses ReplaySubject to ensure no login events are missed.
 * Provides timestamp to deduplicate login events.
 */
export function provideLoginEventsTracking() {
  const loginEvents$ = new ReplaySubject<LoginEventEnvelope>(1);

  return [
    {
      provide: LOGIN_EVENTS,
      useValue: loginEvents$.asObservable(),
    },
    provideAppInitializer(() => {
      const actionsSubject = inject(ActionsSubject);
      actionsSubject
        .pipe(
          filter(
            (action): action is AuthActions.Login =>
              action.type === AuthActions.LOGIN
          ),
          tap((action) => {
            const envelope: LoginEventEnvelope = {
              action,
              timestamp: Date.now(),
            };
            loginEvents$.next(envelope);
          }),
          takeUntilDestroyed()
        )
        .subscribe();
    }),
  ];
}
