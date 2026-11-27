/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DestroyRef, PendingTasks } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

/**
 * Tracks the scheduled notification of a coalescing operator (debounce/audit).
 * Register before scheduling, and release after forwarding the notification so
 * downstream request tasks and view updates can take over without a stable gap.
 * This is not a general-purpose tracker for operators with multiple queued outputs.
 */
export function withPendingTask<T, R>(
  operator: OperatorFunction<T, R>,
  pendingTasks: PendingTasks,
  destroyRef: DestroyRef
): OperatorFunction<T, R> {
  return (source) =>
    new Observable<R>((subscriber) => {
      if (destroyRef.destroyed) {
        subscriber.complete();
        return;
      }

      let removeTask: (() => void) | undefined;
      const finish = (notify: () => void) => {
        // Detach before notifying: a reentrant source emission needs a NEW task.
        const remove = removeTask;
        removeTask = undefined;
        try {
          notify();
        } finally {
          remove?.();
        }
      };

      const subscription = source
        .pipe(
          filter(() => !destroyRef.destroyed),
          tap(() => (removeTask ??= pendingTasks.add())),
          operator
        )
        .subscribe({
          next: (value) =>
            finish(() => {
              // NgRx completes action streams during injector destruction.
              // debounceTime may flush here; do not launch new product work.
              if (!destroyRef.destroyed) {
                subscriber.next(value);
              }
            }),
          error: (error) => finish(() => subscriber.error(error)),
          complete: () => finish(() => subscriber.complete()),
        });

      return () => {
        try {
          subscription.unsubscribe();
        } finally {
          finish(() => {});
        }
      };
    });
}
