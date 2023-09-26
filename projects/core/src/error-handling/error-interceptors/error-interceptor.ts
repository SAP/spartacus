/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * ChainedErrorInterceptorFn is a function that is passed to the error interceptor.
 * It is responsible for handling an error in some way. If the error is not resolved by this interceptor,
 * it should pass the original error (or a new error) to the next interceptor in the chain.
 *
 * @public
 */
export type ChainedErrorInterceptorFn = (error: unknown) => void;

/**
 * Priority of the error interceptor. The higher the priority, the earlier the interceptor will be called.
 * The order is:
 * 1. High priority
 * 2. Normal or no priority
 * 3. Low priority
 *
 * Preserves the original order within a group of interceptors with the same priority.
 *
 * @public
 */
export enum ErrorInterceptorPriority {
  HIGH = 10,
  NORMAL = 0,
  LOW = -10,
}

/**
 * Error interceptor is responsible for intercepting errors handled by the CxErrorHandler.
 * Error interceptors can be provided with the proper priority. The higher the priority, the earlier the interceptor will be called.
 *
 * @member priority - Priority of the error interceptor. The higher the priority, the earlier the interceptor will be called. Parameter is optional.
 * @method interceptError - Intercepts the error and passes it to the next interceptor in the chain if provided.
 *
 * @public
 */
export interface ErrorInterceptor {
  priority?: ErrorInterceptorPriority;
  intercept(error: unknown, next: ChainedErrorInterceptorFn): void;
}

/**
 * Injection token for error interceptors.
 * Error interceptors can be provided with the proper priority. The higher the priority, the earlier the interceptor will be called.
 * Spartacus is providing one error interceptor by default:
 * - LoggerErrorInterceptor - responsible for logging errors to the LoggerService.
 *
 * @public
 */
export const ERROR_INTERCEPTORS = new InjectionToken<ErrorInterceptor[]>(
  'ERROR_INTERCEPTORS'
);
