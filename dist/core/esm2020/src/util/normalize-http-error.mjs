/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { HttpErrorModel } from '../model/misc.model';
/**
 * Normalizes HttpErrorResponse to HttpErrorModel.
 *
 * Can be used as a safe and generic way for embodying http errors into
 * NgRx Action payload, as it will strip potentially unserializable parts from
 * it and warn in debug mode if passed error is not instance of HttpErrorModel
 * (which usually happens when logic in NgRx Effect is not sealed correctly)
 */
export function normalizeHttpError(error, logger) {
    if (error instanceof HttpErrorModel) {
        return error;
    }
    if (error instanceof HttpErrorResponse) {
        const normalizedError = new HttpErrorModel();
        normalizedError.message = error.message;
        normalizedError.status = error.status;
        normalizedError.statusText = error.statusText;
        normalizedError.url = error.url;
        // include backend's error details
        if (Array.isArray(error.error.errors)) {
            normalizedError.details = error.error.errors;
        }
        else if (typeof error.error.error === 'string') {
            normalizedError.details = [
                {
                    type: error.error.error,
                    message: error.error.error_description,
                },
            ];
        }
        return normalizedError;
    }
    if (isDevMode()) {
        const logMessage = 'Error passed to normalizeHttpError is not HttpErrorResponse instance';
        // CXSPA-3680 - use logger by default and make logger required param
        /* eslint-disable-next-line no-console */
        logger ? logger.error(logMessage, error) : console.error(logMessage, error);
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWh0dHAtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91dGlsL25vcm1hbGl6ZS1odHRwLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxLQUErQyxFQUMvQyxNQUFzQjtJQUV0QixJQUFJLEtBQUssWUFBWSxjQUFjLEVBQUU7UUFDbkMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksS0FBSyxZQUFZLGlCQUFpQixFQUFFO1FBQ3RDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDN0MsZUFBZSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN0QyxlQUFlLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDOUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRWhDLGtDQUFrQztRQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQzlDO2FBQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNoRCxlQUFlLENBQUMsT0FBTyxHQUFHO2dCQUN4QjtvQkFDRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2QixPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7aUJBQ3ZDO2FBQ0YsQ0FBQztTQUNIO1FBRUQsT0FBTyxlQUFlLENBQUM7S0FDeEI7SUFFRCxJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2YsTUFBTSxVQUFVLEdBQ2Qsc0VBQXNFLENBQUM7UUFDekUsb0VBQW9FO1FBQ3BFLHlDQUF5QztRQUN6QyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3RTtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBIdHRwRXJyb3JNb2RlbCB9IGZyb20gJy4uL21vZGVsL21pc2MubW9kZWwnO1xuXG4vKipcbiAqIE5vcm1hbGl6ZXMgSHR0cEVycm9yUmVzcG9uc2UgdG8gSHR0cEVycm9yTW9kZWwuXG4gKlxuICogQ2FuIGJlIHVzZWQgYXMgYSBzYWZlIGFuZCBnZW5lcmljIHdheSBmb3IgZW1ib2R5aW5nIGh0dHAgZXJyb3JzIGludG9cbiAqIE5nUnggQWN0aW9uIHBheWxvYWQsIGFzIGl0IHdpbGwgc3RyaXAgcG90ZW50aWFsbHkgdW5zZXJpYWxpemFibGUgcGFydHMgZnJvbVxuICogaXQgYW5kIHdhcm4gaW4gZGVidWcgbW9kZSBpZiBwYXNzZWQgZXJyb3IgaXMgbm90IGluc3RhbmNlIG9mIEh0dHBFcnJvck1vZGVsXG4gKiAod2hpY2ggdXN1YWxseSBoYXBwZW5zIHdoZW4gbG9naWMgaW4gTmdSeCBFZmZlY3QgaXMgbm90IHNlYWxlZCBjb3JyZWN0bHkpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVIdHRwRXJyb3IoXG4gIGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSB8IEh0dHBFcnJvck1vZGVsIHwgYW55LFxuICBsb2dnZXI/OiBMb2dnZXJTZXJ2aWNlXG4pOiBIdHRwRXJyb3JNb2RlbCB8IHVuZGVmaW5lZCB7XG4gIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvck1vZGVsKSB7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG5cbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICBjb25zdCBub3JtYWxpemVkRXJyb3IgPSBuZXcgSHR0cEVycm9yTW9kZWwoKTtcbiAgICBub3JtYWxpemVkRXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgbm9ybWFsaXplZEVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICBub3JtYWxpemVkRXJyb3Iuc3RhdHVzVGV4dCA9IGVycm9yLnN0YXR1c1RleHQ7XG4gICAgbm9ybWFsaXplZEVycm9yLnVybCA9IGVycm9yLnVybDtcblxuICAgIC8vIGluY2x1ZGUgYmFja2VuZCdzIGVycm9yIGRldGFpbHNcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlcnJvci5lcnJvci5lcnJvcnMpKSB7XG4gICAgICBub3JtYWxpemVkRXJyb3IuZGV0YWlscyA9IGVycm9yLmVycm9yLmVycm9ycztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5lcnJvci5lcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5vcm1hbGl6ZWRFcnJvci5kZXRhaWxzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogZXJyb3IuZXJyb3IuZXJyb3IsXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IuZXJyb3IuZXJyb3JfZGVzY3JpcHRpb24sXG4gICAgICAgIH0sXG4gICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemVkRXJyb3I7XG4gIH1cblxuICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICBjb25zdCBsb2dNZXNzYWdlID1cbiAgICAgICdFcnJvciBwYXNzZWQgdG8gbm9ybWFsaXplSHR0cEVycm9yIGlzIG5vdCBIdHRwRXJyb3JSZXNwb25zZSBpbnN0YW5jZSc7XG4gICAgLy8gQ1hTUEEtMzY4MCAtIHVzZSBsb2dnZXIgYnkgZGVmYXVsdCBhbmQgbWFrZSBsb2dnZXIgcmVxdWlyZWQgcGFyYW1cbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSAqL1xuICAgIGxvZ2dlciA/IGxvZ2dlci5lcnJvcihsb2dNZXNzYWdlLCBlcnJvcikgOiBjb25zb2xlLmVycm9yKGxvZ01lc3NhZ2UsIGVycm9yKTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iXX0=