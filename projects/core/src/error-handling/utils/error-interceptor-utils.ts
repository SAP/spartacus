import {
  ChainedErrorInterceptorFn,
  ErrorInterceptor,
  ErrorInterceptorPriority,
} from '../error-interceptors/error-interceptor';

/**
 * Sorts error interceptors based on priority.
 *
 * @param errorInterceptors - error interceptors to sort
 * @returns sorted error interceptors
 *
 * @internal
 */
export const sortErrorInterceptors = (
  errorInterceptors: ErrorInterceptor[]
): ErrorInterceptor[] => {
  const highPriorityErrorInterceptors = new Array<ErrorInterceptor>();
  const lowPriorityErrorInterceptors = new Array<ErrorInterceptor>();
  const noPriorityErrorInterceptors = new Array<ErrorInterceptor>();

  errorInterceptors.forEach((handler) => {
    if (handler.priority === ErrorInterceptorPriority.HIGH) {
      highPriorityErrorInterceptors.unshift(handler);
    } else if (handler.priority === ErrorInterceptorPriority.LOW) {
      lowPriorityErrorInterceptors.push(handler);
    } else {
      noPriorityErrorInterceptors.push(handler);
    }
  });
  return [
    ...highPriorityErrorInterceptors,
    ...noPriorityErrorInterceptors,
    ...lowPriorityErrorInterceptors,
  ];
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
    interceptor.interceptError(error, next);
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
