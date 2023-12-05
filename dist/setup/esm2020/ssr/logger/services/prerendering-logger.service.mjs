/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * Custom `LoggerService` used in pre-rendering in the server environment.
 *
 * It simply forwards the arguments to the native `console` methods.
 */
export class PrerenderingLoggerService extends LoggerService {
    log(...args) {
        /* eslint-disable-next-line no-console */
        console.log(...args);
    }
    warn(...args) {
        /* eslint-disable-next-line no-console */
        console.warn(...args);
    }
    error(...args) {
        /* eslint-disable-next-line no-console */
        console.error(...args);
    }
    info(...args) {
        /* eslint-disable-next-line no-console */
        console.info(...args);
    }
    debug(...args) {
        /* eslint-disable-next-line no-console */
        console.debug(...args);
    }
}
PrerenderingLoggerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PrerenderingLoggerService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
PrerenderingLoggerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PrerenderingLoggerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PrerenderingLoggerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcmVuZGVyaW5nLWxvZ2dlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29yZS1saWJzL3NldHVwL3Nzci9sb2dnZXIvc2VydmljZXMvcHJlcmVuZGVyaW5nLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFaEQ7Ozs7R0FJRztBQUlILE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxhQUFhO0lBQzFELEdBQUcsQ0FBQyxHQUFHLElBQW9DO1FBQ3pDLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksQ0FBQyxHQUFHLElBQXFDO1FBQzNDLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELEtBQUssQ0FBQyxHQUFHLElBQXNDO1FBQzdDLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksQ0FBQyxHQUFHLElBQXFDO1FBQzNDLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELEtBQUssQ0FBQyxHQUFHLElBQXNDO1FBQzdDLHlDQUF5QztRQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQzs7c0hBcEJVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG4vKipcbiAqIEN1c3RvbSBgTG9nZ2VyU2VydmljZWAgdXNlZCBpbiBwcmUtcmVuZGVyaW5nIGluIHRoZSBzZXJ2ZXIgZW52aXJvbm1lbnQuXG4gKlxuICogSXQgc2ltcGx5IGZvcndhcmRzIHRoZSBhcmd1bWVudHMgdG8gdGhlIG5hdGl2ZSBgY29uc29sZWAgbWV0aG9kcy5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByZXJlbmRlcmluZ0xvZ2dlclNlcnZpY2UgZXh0ZW5kcyBMb2dnZXJTZXJ2aWNlIHtcbiAgbG9nKC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIGNvbnNvbGUubG9nPik6IHZvaWQge1xuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlICovXG4gICAgY29uc29sZS5sb2coLi4uYXJncyk7XG4gIH1cbiAgd2FybiguLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjb25zb2xlLndhcm4+KTogdm9pZCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUgKi9cbiAgICBjb25zb2xlLndhcm4oLi4uYXJncyk7XG4gIH1cbiAgZXJyb3IoLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgY29uc29sZS5lcnJvcj4pOiB2b2lkIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZXJyb3IoLi4uYXJncyk7XG4gIH1cbiAgaW5mbyguLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjb25zb2xlLmluZm8+KTogdm9pZCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUgKi9cbiAgICBjb25zb2xlLmluZm8oLi4uYXJncyk7XG4gIH1cbiAgZGVidWcoLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgY29uc29sZS5kZWJ1Zz4pOiB2b2lkIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZGVidWcoLi4uYXJncyk7XG4gIH1cbn1cbiJdfQ==