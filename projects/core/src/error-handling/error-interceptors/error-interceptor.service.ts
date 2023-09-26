/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ChainedErrorInterceptorFn,
  ERROR_INTERCEPTORS,
  ErrorInterceptor,
  ErrorInterceptorPriority,
} from './error-interceptor';

/**
 * Error interceptor service is responsible for sorting and handling error interceptors chain.
 *
 * @public
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService {
  protected errorInterceptors: ErrorInterceptor[] =
    inject(ERROR_INTERCEPTORS, { optional: true }) ?? [];

  protected sortedErrorInterceptors: ErrorInterceptor[] =
    this.sortErrorInterceptors(this.errorInterceptors);

  get interceptorsChain(): ChainedErrorInterceptorFn {
    // Similar to Angular's interceptors, error interceptors are organized from right to left,
    // ensuring that the ultimate execution order is from left to right.
    // In other words, if the interceptors array contains `[a, b, c]`,
    // our goal is to create a chain that can be envisioned as c(b(a(end))),
    // constructed by progressively adding elements from the innermost to the outermost.
    return this.sortedErrorInterceptors.reduceRight<ChainedErrorInterceptorFn>(
      (partialChain, interceptor) =>
        this.chainInterceptors(partialChain, interceptor),
      () => {}
    );
  }

  /**
   * Sorts error interceptors based on priority. The higher the priority, the earlier the interceptor will be called.
   * Preserves the original order within a group of interceptors with the same priority.
   *
   * @param errorInterceptors - error interceptors to sort
   * @returns sorted error interceptors
   *
   */
  protected sortErrorInterceptors(
    errorInterceptors: ErrorInterceptor[]
  ): ErrorInterceptor[] {
    const interceptorsGroupedByPriority = new Map<
      ErrorInterceptorPriority,
      ErrorInterceptor[]
    >();
    errorInterceptors.forEach(
      this.addToProperGroup(interceptorsGroupedByPriority)
    );
    return this.mapToSortedArray(interceptorsGroupedByPriority);
  }

  /**
   * Handles error interceptors chain.
   * @param partialChain - next chained interceptor function that handles the error and calls the next interceptor
   * @param interceptor - current interceptor
   * @returns chained interceptor function
   *
   */
  protected chainInterceptors(
    partialChain: ChainedErrorInterceptorFn,
    interceptor: ErrorInterceptor
  ): ChainedErrorInterceptorFn {
    return (error: unknown) => {
      interceptor.intercept(error, partialChain);
    };
  }

  /**
   * Function that adds error interceptor to the proper group based on its priority.
   * @param interceptor
   *
   */
  protected addToProperGroup(
    interceptorsGroupedByPriority: Map<
      ErrorInterceptorPriority,
      ErrorInterceptor[]
    >
  ) {
    return (interceptor: ErrorInterceptor) => {
      const priority = interceptor.priority ?? ErrorInterceptorPriority.NORMAL;
      const group = interceptorsGroupedByPriority.get(priority) ?? [];
      group.push(interceptor);
      interceptorsGroupedByPriority.set(priority, group);
    };
  }

  /**
   * Function that maps interceptors grouped by priority to a sorted array.
   * The higher the priority, the earlier the interceptor will be called.
   *
   * @param interceptorsGroupedByPriority - interceptors grouped by priority
   * @returns sorted array of interceptors
   *
   */
  protected mapToSortedArray(
    interceptorsGroupedByPriority: Map<
      ErrorInterceptorPriority,
      ErrorInterceptor[]
    >
  ) {
    return [...interceptorsGroupedByPriority.entries()]
      .map(([priority, interceptors]) => ({
        priority,
        interceptors,
      }))
      .sort((a, b) => b.priority - a.priority) //sort descending, from highest to lowest priority
      .flatMap((item) => item.interceptors);
  }
}
