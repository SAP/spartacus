/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { InjectionToken, inject } from '@angular/core';
import { LoggerService } from '../../../logger';
/**
 * The logger plugin for i18next that delegates logging to the Spartacus LoggerService.
 * The logger plugin is used to log i18next events.
 * See more: https://www.i18next.com/misc/creating-own-plugins#logger
 */
export const I18NEXT_LOGGER_PLUGIN = new InjectionToken('I18NEXT_LOGGER_PLUGIN', {
    providedIn: 'root',
    factory: () => {
        const logger = inject(LoggerService);
        return {
            type: 'logger',
            /**
             * @param args - Array of arguments. This is the only parameter that is an array. See more: https://www.i18next.com/misc/creating-own-plugins#logger
             */
            log: (args) => logger.log(...args),
            /**
             * @param args - Array of arguments. This is the only parameter that is an array. See more: https://www.i18next.com/misc/creating-own-plugins#logger
             */
            warn: (args) => logger.warn(...args),
            /**
             * @param args - Array of arguments. This is the only parameter that is an array. See more: https://www.i18next.com/misc/creating-own-plugins#logger
             */
            error: (args) => logger.error(...args),
        };
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1sb2dnZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaTE4bi9pMThuZXh0L2kxOG5leHQtcGx1Z2lucy9pMThuZXh0LWxvZ2dlci1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQ3JELHVCQUF1QixFQUN2QjtJQUNFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDWixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsT0FBTztZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2Q7O2VBRUc7WUFDSCxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbEM7O2VBRUc7WUFDSCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDcEM7O2VBRUc7WUFDSCxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDdkMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExvZ2dlck1vZHVsZSB9IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2xvZ2dlcic7XG5cbi8qKlxuICogVGhlIGxvZ2dlciBwbHVnaW4gZm9yIGkxOG5leHQgdGhhdCBkZWxlZ2F0ZXMgbG9nZ2luZyB0byB0aGUgU3BhcnRhY3VzIExvZ2dlclNlcnZpY2UuXG4gKiBUaGUgbG9nZ2VyIHBsdWdpbiBpcyB1c2VkIHRvIGxvZyBpMThuZXh0IGV2ZW50cy5cbiAqIFNlZSBtb3JlOiBodHRwczovL3d3dy5pMThuZXh0LmNvbS9taXNjL2NyZWF0aW5nLW93bi1wbHVnaW5zI2xvZ2dlclxuICovXG5leHBvcnQgY29uc3QgSTE4TkVYVF9MT0dHRVJfUExVR0lOID0gbmV3IEluamVjdGlvblRva2VuPExvZ2dlck1vZHVsZT4oXG4gICdJMThORVhUX0xPR0dFUl9QTFVHSU4nLFxuICB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3Rvcnk6ICgpID0+IHtcbiAgICAgIGNvbnN0IGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdsb2dnZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIGFyZ3MgLSBBcnJheSBvZiBhcmd1bWVudHMuIFRoaXMgaXMgdGhlIG9ubHkgcGFyYW1ldGVyIHRoYXQgaXMgYW4gYXJyYXkuIFNlZSBtb3JlOiBodHRwczovL3d3dy5pMThuZXh0LmNvbS9taXNjL2NyZWF0aW5nLW93bi1wbHVnaW5zI2xvZ2dlclxuICAgICAgICAgKi9cbiAgICAgICAgbG9nOiAoYXJncykgPT4gbG9nZ2VyLmxvZyguLi5hcmdzKSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBhcmdzIC0gQXJyYXkgb2YgYXJndW1lbnRzLiBUaGlzIGlzIHRoZSBvbmx5IHBhcmFtZXRlciB0aGF0IGlzIGFuIGFycmF5LiBTZWUgbW9yZTogaHR0cHM6Ly93d3cuaTE4bmV4dC5jb20vbWlzYy9jcmVhdGluZy1vd24tcGx1Z2lucyNsb2dnZXJcbiAgICAgICAgICovXG4gICAgICAgIHdhcm46IChhcmdzKSA9PiBsb2dnZXIud2FybiguLi5hcmdzKSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBhcmdzIC0gQXJyYXkgb2YgYXJndW1lbnRzLiBUaGlzIGlzIHRoZSBvbmx5IHBhcmFtZXRlciB0aGF0IGlzIGFuIGFycmF5LiBTZWUgbW9yZTogaHR0cHM6Ly93d3cuaTE4bmV4dC5jb20vbWlzYy9jcmVhdGluZy1vd24tcGx1Z2lucyNsb2dnZXJcbiAgICAgICAgICovXG4gICAgICAgIGVycm9yOiAoYXJncykgPT4gbG9nZ2VyLmVycm9yKC4uLmFyZ3MpLFxuICAgICAgfTtcbiAgICB9LFxuICB9XG4pO1xuIl19