/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { formatWithOptions } from 'util';
import { EXPRESS_SERVER_LOGGER } from '../loggers';
import * as i0 from "@angular/core";
/**
 * Custom `LoggerService` used in ExpressJS.
 *
 * It converts the input arguments to a final string message similar as the native `console`
 * does (using the native function `format` from `node:util`) and passes this message
 * to a concrete server logger, used in ExpressJS.
 *
 * Besides the message, it also passes the current `request` of ExpressJS as an additional
 * context to the concrete server logger.
 */
export class ExpressLoggerService {
    constructor() {
        this.request = inject(REQUEST);
        this.serverLogger = inject(EXPRESS_SERVER_LOGGER);
    }
    log(...args) {
        this.serverLogger.log(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    warn(...args) {
        this.serverLogger.warn(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    error(...args) {
        this.serverLogger.error(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    info(...args) {
        this.serverLogger.info(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    debug(...args) {
        this.serverLogger.debug(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    formatLogMessage(message, ...optionalParams) {
        return formatWithOptions(
        // Prevent automatically breaking a long string message into multiple lines.
        // Otherwise, multi-line logs would be treated on the server as separate log
        { breakLength: Infinity }, message, ...optionalParams);
    }
}
ExpressLoggerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExpressLoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ExpressLoggerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExpressLoggerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExpressLoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy1sb2dnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NvcmUtbGlicy9zZXR1cC9zc3IvbG9nZ2VyL3NlcnZpY2VzL2V4cHJlc3MtbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sWUFBWSxDQUFDOztBQUVuRDs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBRGpDO1FBRUUsWUFBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixpQkFBWSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0tBcUM5QztJQW5DQyxHQUFHLENBQUMsR0FBRyxJQUFvQztRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNwRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQUksQ0FBQyxHQUFHLElBQXFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ3JELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsS0FBSyxDQUFDLEdBQUcsSUFBc0M7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDdEQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFJLENBQUMsR0FBRyxJQUFxQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNyRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELEtBQUssQ0FBQyxHQUFHLElBQXNDO1FBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsZ0JBQWdCLENBQUMsT0FBYSxFQUFFLEdBQUcsY0FBcUI7UUFDaEUsT0FBTyxpQkFBaUI7UUFDdEIsNEVBQTRFO1FBQzVFLDRFQUE0RTtRQUM1RSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsRUFDekIsT0FBTyxFQUNQLEdBQUcsY0FBYyxDQUNsQixDQUFDO0lBQ0osQ0FBQzs7aUhBdENVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRFAsTUFBTTsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUkVRVUVTVCB9IGZyb20gJ0BuZ3VuaXZlcnNhbC9leHByZXNzLWVuZ2luZS90b2tlbnMnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBmb3JtYXRXaXRoT3B0aW9ucyB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgRVhQUkVTU19TRVJWRVJfTE9HR0VSIH0gZnJvbSAnLi4vbG9nZ2Vycyc7XG5cbi8qKlxuICogQ3VzdG9tIGBMb2dnZXJTZXJ2aWNlYCB1c2VkIGluIEV4cHJlc3NKUy5cbiAqXG4gKiBJdCBjb252ZXJ0cyB0aGUgaW5wdXQgYXJndW1lbnRzIHRvIGEgZmluYWwgc3RyaW5nIG1lc3NhZ2Ugc2ltaWxhciBhcyB0aGUgbmF0aXZlIGBjb25zb2xlYFxuICogZG9lcyAodXNpbmcgdGhlIG5hdGl2ZSBmdW5jdGlvbiBgZm9ybWF0YCBmcm9tIGBub2RlOnV0aWxgKSBhbmQgcGFzc2VzIHRoaXMgbWVzc2FnZVxuICogdG8gYSBjb25jcmV0ZSBzZXJ2ZXIgbG9nZ2VyLCB1c2VkIGluIEV4cHJlc3NKUy5cbiAqXG4gKiBCZXNpZGVzIHRoZSBtZXNzYWdlLCBpdCBhbHNvIHBhc3NlcyB0aGUgY3VycmVudCBgcmVxdWVzdGAgb2YgRXhwcmVzc0pTIGFzIGFuIGFkZGl0aW9uYWxcbiAqIGNvbnRleHQgdG8gdGhlIGNvbmNyZXRlIHNlcnZlciBsb2dnZXIuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRXhwcmVzc0xvZ2dlclNlcnZpY2UgaW1wbGVtZW50cyBMb2dnZXJTZXJ2aWNlIHtcbiAgcmVxdWVzdCA9IGluamVjdChSRVFVRVNUKTtcbiAgc2VydmVyTG9nZ2VyID0gaW5qZWN0KEVYUFJFU1NfU0VSVkVSX0xPR0dFUik7XG5cbiAgbG9nKC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIGNvbnNvbGUubG9nPik6IHZvaWQge1xuICAgIHRoaXMuc2VydmVyTG9nZ2VyLmxvZyh0aGlzLmZvcm1hdExvZ01lc3NhZ2UoLi4uYXJncyksIHtcbiAgICAgIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcbiAgICB9KTtcbiAgfVxuICB3YXJuKC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIGNvbnNvbGUud2Fybj4pOiB2b2lkIHtcbiAgICB0aGlzLnNlcnZlckxvZ2dlci53YXJuKHRoaXMuZm9ybWF0TG9nTWVzc2FnZSguLi5hcmdzKSwge1xuICAgICAgcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgIH0pO1xuICB9XG4gIGVycm9yKC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIGNvbnNvbGUuZXJyb3I+KTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXJMb2dnZXIuZXJyb3IodGhpcy5mb3JtYXRMb2dNZXNzYWdlKC4uLmFyZ3MpLCB7XG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgfSk7XG4gIH1cbiAgaW5mbyguLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjb25zb2xlLmluZm8+KTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXJMb2dnZXIuaW5mbyh0aGlzLmZvcm1hdExvZ01lc3NhZ2UoLi4uYXJncyksIHtcbiAgICAgIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcbiAgICB9KTtcbiAgfVxuICBkZWJ1ZyguLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjb25zb2xlLmRlYnVnPik6IHZvaWQge1xuICAgIHRoaXMuc2VydmVyTG9nZ2VyLmRlYnVnKHRoaXMuZm9ybWF0TG9nTWVzc2FnZSguLi5hcmdzKSwge1xuICAgICAgcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGZvcm1hdExvZ01lc3NhZ2UobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0V2l0aE9wdGlvbnMoXG4gICAgICAvLyBQcmV2ZW50IGF1dG9tYXRpY2FsbHkgYnJlYWtpbmcgYSBsb25nIHN0cmluZyBtZXNzYWdlIGludG8gbXVsdGlwbGUgbGluZXMuXG4gICAgICAvLyBPdGhlcndpc2UsIG11bHRpLWxpbmUgbG9ncyB3b3VsZCBiZSB0cmVhdGVkIG9uIHRoZSBzZXJ2ZXIgYXMgc2VwYXJhdGUgbG9nXG4gICAgICB7IGJyZWFrTGVuZ3RoOiBJbmZpbml0eSB9LFxuICAgICAgbWVzc2FnZSxcbiAgICAgIC4uLm9wdGlvbmFsUGFyYW1zXG4gICAgKTtcbiAgfVxufVxuIl19