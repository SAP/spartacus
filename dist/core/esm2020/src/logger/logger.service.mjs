/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * By default it delegates logged messages to the native `console` object.
 *
 * It's a good extension point for customizing the destination of logs
 * (e.g. to use a 3rd party logger library) or to enhance logs with more contextual data.
 */
export class LoggerService {
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
LoggerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LoggerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoggerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoggerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9sb2dnZXIvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDOzs7OztHQUtHO0FBSUgsTUFBTSxPQUFPLGFBQWE7SUFDeEIsR0FBRyxDQUFDLEdBQUcsSUFBb0M7UUFDekMseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBcUM7UUFDM0MseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsS0FBSyxDQUFDLEdBQUcsSUFBc0M7UUFDN0MseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBcUM7UUFDM0MseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsS0FBSyxDQUFDLEdBQUcsSUFBc0M7UUFDN0MseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDOzswR0FwQlUsYUFBYTs4R0FBYixhQUFhLGNBRlosTUFBTTsyRkFFUCxhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBCeSBkZWZhdWx0IGl0IGRlbGVnYXRlcyBsb2dnZWQgbWVzc2FnZXMgdG8gdGhlIG5hdGl2ZSBgY29uc29sZWAgb2JqZWN0LlxuICpcbiAqIEl0J3MgYSBnb29kIGV4dGVuc2lvbiBwb2ludCBmb3IgY3VzdG9taXppbmcgdGhlIGRlc3RpbmF0aW9uIG9mIGxvZ3NcbiAqIChlLmcuIHRvIHVzZSBhIDNyZCBwYXJ0eSBsb2dnZXIgbGlicmFyeSkgb3IgdG8gZW5oYW5jZSBsb2dzIHdpdGggbW9yZSBjb250ZXh0dWFsIGRhdGEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dnZXJTZXJ2aWNlIHtcbiAgbG9nKC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIGNvbnNvbGUubG9nPik6IHZvaWQge1xuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlICovXG4gICAgY29uc29sZS5sb2coLi4uYXJncyk7XG4gIH1cbiAgd2FybiguLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjb25zb2xlLndhcm4+KTogdm9pZCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUgKi9cbiAgICBjb25zb2xlLndhcm4oLi4uYXJncyk7XG4gIH1cbiAgZXJyb3IoLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgY29uc29sZS5lcnJvcj4pOiB2b2lkIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZXJyb3IoLi4uYXJncyk7XG4gIH1cbiAgaW5mbyguLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjb25zb2xlLmluZm8+KTogdm9pZCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUgKi9cbiAgICBjb25zb2xlLmluZm8oLi4uYXJncyk7XG4gIH1cbiAgZGVidWcoLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgY29uc29sZS5kZWJ1Zz4pOiB2b2lkIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZGVidWcoLi4uYXJncyk7XG4gIH1cbn1cbiJdfQ==