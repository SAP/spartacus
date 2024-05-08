/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, from, isObservable, of } from 'rxjs';

/**
 * Wraps the given value into an observable.
 *
 * - If the value is an Observable, it returns the value as is.
 * - If the value is a Promise, it returns an Observable that emits the result of the Promise.
 * - If the value is neither an Observable nor a Promise, it returns an Observable
 *    that immediately emits the given value.
 */
export function wrapIntoObservable<T>(
  value: T | Promise<T> | Observable<T>
): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }

  return of(value);
}

/**
 * Tells whether the given object has a `then` method.
 */
function isPromise(obj: any): obj is Promise<any> {
  return !!obj && typeof obj.then === 'function';
}
