/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChainedErrorInterceptorFn,
  ErrorInterceptor,
  ErrorInterceptorPriority,
} from '../error-interceptors/error-interceptor';

/**
 * Sorts error interceptors based on priority. The higher the priority, the earlier the interceptor will be called.
 * Preserves the original order within a group of interceptors with the same priority.
 *
 * @param errorInterceptors - error interceptors to sort
 * @returns sorted error interceptors
 *
 * @internal
 */
export const sortErrorInterceptors = (
  errorInterceptors: ErrorInterceptor[]
): ErrorInterceptor[] => {
  const interceptorsGroupedByPriority = new Map<
    ErrorInterceptorPriority,
    ErrorInterceptor[]
  >();
  errorInterceptors.forEach(addToProperGroup(interceptorsGroupedByPriority));
  return mapToSortedArray(interceptorsGroupedByPriority);
};

/**
 * Handles error interceptors chain.
 * @param next - next chained interceptor function that handles the error and calls the next interceptor
 * @param interceptor - current interceptor
 * @returns chained interceptor function
 *
 * @internal
 */
export const handleInterceptors = (
  next: ChainedErrorInterceptorFn,
  interceptor: ErrorInterceptor
): ChainedErrorInterceptorFn => {
  return (error: Error) => {
    interceptor.intercept(error, next);
  };
};

//TODO: discuss whether we need to do anything specific at the end of the chain
// maybe this is a good place to forward an error to the ExpressJS?
/**
 * The last function in the chain. Does nothing.
 * @param _error - error
 *
 * @internal
 */
export const tailChain: ChainedErrorInterceptorFn = (_error: Error) => {
  // do nothing
};

/**
 * Function that adds error interceptor to the proper group based on its priority.
 * @param interceptor
 *
 * @internal
 */
const addToProperGroup = (
  interceptorsGroupedByPriority: Map<
    ErrorInterceptorPriority,
    ErrorInterceptor[]
  >
) => {
  return (interceptor: ErrorInterceptor) => {
    const priority = interceptor.priority ?? ErrorInterceptorPriority.NORMAL;
    const group = interceptorsGroupedByPriority.get(priority) ?? [];
    group.push(interceptor);
    interceptorsGroupedByPriority.set(priority, group);
  };
};

/**
 * Function that maps interceptors grouped by priority to a sorted array.
 * The higher the priority, the earlier the interceptor will be called.
 *
 * @param interceptorsGroupedByPriority - interceptors grouped by priority
 * @returns sorted array of interceptors
 *
 * @internal
 */
const mapToSortedArray = (
  interceptorsGroupedByPriority: Map<
    ErrorInterceptorPriority,
    ErrorInterceptor[]
  >
) => {
  // sort interceptors by priority, from highest to lowest
  return Array.from(interceptorsGroupedByPriority)
    .sort((a, b) => b[0] - a[0])
    .map(([, interceptors]) => interceptors)
    .flat();
};
