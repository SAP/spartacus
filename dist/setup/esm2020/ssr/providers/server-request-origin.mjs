/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject } from '@angular/core';
import { SERVER_REQUEST_ORIGIN } from '@spartacus/core';
/**
 * Returns a factory function which resolves the server request origin.
 */
export function serverRequestOriginFactory(options) {
    return () => {
        const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN, {
            optional: true,
            skipSelf: true,
        });
        // usually prerendering mode, but can be SSR
        if (options?.serverRequestOrigin) {
            return options.serverRequestOrigin;
        }
        // SSR mode, from express engine
        if (serverRequestOrigin) {
            return serverRequestOrigin;
        }
        throw new Error(`The request origin is not set. 
    If you are using the default environment variable, please specify it when initiating the process.
    
    E.g.
    > SERVER_REQUEST_ORIGIN=https://my.domain.com yarn prerender
    > SERVER_REQUEST_ORIGIN=http://localhost:4200 yarn serve:ssr
    
    
    Alternatively, you can pass it as an argument to provideServer
    function, but beware it will be used for server-side rendering as well.
    
    E.g.
    @NgModule({
      // ...
      providers: [
        provideServer({
          serverRequestOrigin: 'https://my.domain.com',
        }),
      ],
    })
    export class AppServerModule {}`);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXJlcXVlc3Qtb3JpZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29yZS1saWJzL3NldHVwL3Nzci9wcm92aWRlcnMvc2VydmVyLXJlcXVlc3Qtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3hEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE9BQXVCO0lBQ2hFLE9BQU8sR0FBVyxFQUFFO1FBQ2xCLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFO1lBQ3hELFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCw0Q0FBNEM7UUFDNUMsSUFBSSxPQUFPLEVBQUUsbUJBQW1CLEVBQUU7WUFDaEMsT0FBTyxPQUFPLENBQUMsbUJBQW1CLENBQUM7U0FDcEM7UUFFRCxnQ0FBZ0M7UUFDaEMsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixPQUFPLG1CQUFtQixDQUFDO1NBQzVCO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBb0I4QixDQUMvQixDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU0VSVkVSX1JFUVVFU1RfT1JJR0lOIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tICcuL21vZGVsJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZmFjdG9yeSBmdW5jdGlvbiB3aGljaCByZXNvbHZlcyB0aGUgc2VydmVyIHJlcXVlc3Qgb3JpZ2luLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VydmVyUmVxdWVzdE9yaWdpbkZhY3Rvcnkob3B0aW9ucz86IFNlcnZlck9wdGlvbnMpOiBGdW5jdGlvbiB7XG4gIHJldHVybiAoKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBzZXJ2ZXJSZXF1ZXN0T3JpZ2luID0gaW5qZWN0KFNFUlZFUl9SRVFVRVNUX09SSUdJTiwge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICBza2lwU2VsZjogdHJ1ZSxcbiAgICB9KTtcblxuICAgIC8vIHVzdWFsbHkgcHJlcmVuZGVyaW5nIG1vZGUsIGJ1dCBjYW4gYmUgU1NSXG4gICAgaWYgKG9wdGlvbnM/LnNlcnZlclJlcXVlc3RPcmlnaW4pIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlcnZlclJlcXVlc3RPcmlnaW47XG4gICAgfVxuXG4gICAgLy8gU1NSIG1vZGUsIGZyb20gZXhwcmVzcyBlbmdpbmVcbiAgICBpZiAoc2VydmVyUmVxdWVzdE9yaWdpbikge1xuICAgICAgcmV0dXJuIHNlcnZlclJlcXVlc3RPcmlnaW47XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFRoZSByZXF1ZXN0IG9yaWdpbiBpcyBub3Qgc2V0LiBcbiAgICBJZiB5b3UgYXJlIHVzaW5nIHRoZSBkZWZhdWx0IGVudmlyb25tZW50IHZhcmlhYmxlLCBwbGVhc2Ugc3BlY2lmeSBpdCB3aGVuIGluaXRpYXRpbmcgdGhlIHByb2Nlc3MuXG4gICAgXG4gICAgRS5nLlxuICAgID4gU0VSVkVSX1JFUVVFU1RfT1JJR0lOPWh0dHBzOi8vbXkuZG9tYWluLmNvbSB5YXJuIHByZXJlbmRlclxuICAgID4gU0VSVkVSX1JFUVVFU1RfT1JJR0lOPWh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCB5YXJuIHNlcnZlOnNzclxuICAgIFxuICAgIFxuICAgIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gcGFzcyBpdCBhcyBhbiBhcmd1bWVudCB0byBwcm92aWRlU2VydmVyXG4gICAgZnVuY3Rpb24sIGJ1dCBiZXdhcmUgaXQgd2lsbCBiZSB1c2VkIGZvciBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgYXMgd2VsbC5cbiAgICBcbiAgICBFLmcuXG4gICAgQE5nTW9kdWxlKHtcbiAgICAgIC8vIC4uLlxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHByb3ZpZGVTZXJ2ZXIoe1xuICAgICAgICAgIHNlcnZlclJlcXVlc3RPcmlnaW46ICdodHRwczovL215LmRvbWFpbi5jb20nLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSlcbiAgICBleHBvcnQgY2xhc3MgQXBwU2VydmVyTW9kdWxlIHt9YFxuICAgICk7XG4gIH07XG59XG4iXX0=