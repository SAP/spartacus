/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, OperatorFunction } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

/**
 *
 * Withdraw from the source observable when notifier emits a value
 *
 * Withdraw will result in resubscribing to the source observable
 * Operator is useful to kill ongoing emission transformation on notifier emission
 *
 * @param notifier
 */
export function withdrawOn<T>(
  notifier: Observable<any>
): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    notifier.pipe(
      startWith(undefined),
      switchMap(() => source)
    );
}
