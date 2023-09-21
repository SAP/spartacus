import { InjectionToken } from '@angular/core';

/**
 * ChainedErrorInterceptorFn is a function that is passed to the error interceptor.
 * It is responsible for passing the error to the next interceptor in the chain if provided.
 *
 * @public
 */
export type ChainedErrorInterceptorFn = (error: Error) => void;

/**
 * Priority of the error interceptor. The higher the priority, the earlier the interceptor will be called.
 * The order is:
 * 1. High priority - the latest added with the high priority is first
 * 2. No priority - the order is not changed
 * 3. Low priority - the latest added with the low priority is last
 *
 * @public
 */
export enum ErrorInterceptorPriority {
  HIGH = -1,
  LOW = 1,
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
  interceptError(error: unknown, next?: ChainedErrorInterceptorFn): void;
}

/**
 * Injection token for error interceptors responsible for intercepting errors handled by the CxErrorHandler.
 * Error interceptors can be provided with the proper priority. The higher the priority, the earlier the interceptor will be called.
 * Spartacus is providing one error interceptor by default:
 * - LoggerErrorInterceptor - responsible for logging errors to the LoggerService.
 *
 * @public
 */
export const ERROR_INTERCEPTORS = new InjectionToken<ErrorInterceptor[]>(
  'ERROR_INTERCEPTORS'
);
