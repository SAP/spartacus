/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
/**
 * Function to be used by the `i18next-http-backend` plugin for loading translations via http.
 */
export const I18NEXT_HTTP_BACKEND_CLIENT = new InjectionToken('I18NEXT_HTTP_BACKEND_CLIENT', {
    providedIn: 'root',
    factory: () => {
        const httpClient = inject(HttpClient);
        // Function appropriate for i18next to make http calls for lazy-loaded translation files.
        // See docs for `i18next-http-backend`: https://github.com/i18next/i18next-http-backend#backend-options
        //
        // It uses Angular HttpClient under the hood, so it works in SSR.
        return (_options, url, _payload, callback) => {
            httpClient.get(url, { responseType: 'text' }).subscribe({
                next: (data) => callback(null, { status: 200, data }),
                error: (error) => callback(error, {
                    // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
                    data: null,
                    status: error.status,
                }),
            });
        };
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1odHRwLWJhY2tlbmQtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaTE4bi9pMThuZXh0L2kxOG5leHQtYmFja2VuZC9pMThuZXh0LWh0dHAtYmFja2VuZC1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUt2RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLElBQUksY0FBYyxDQUUzRCw2QkFBNkIsRUFBRTtJQUMvQixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsR0FBNkIsRUFBRTtRQUN0QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdEMseUZBQXlGO1FBQ3pGLHVHQUF1RztRQUN2RyxFQUFFO1FBQ0YsaUVBQWlFO1FBQ2pFLE9BQU8sQ0FDTCxRQUF3QixFQUN4QixHQUFXLEVBQ1gsUUFBeUIsRUFDekIsUUFBeUIsRUFDekIsRUFBRTtZQUNGLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN0RCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyRCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNmLFFBQVEsQ0FBQyxLQUFLLEVBQUU7b0JBQ2QsNkVBQTZFO29CQUM3RSxJQUFJLEVBQUUsSUFBVztvQkFDakIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNyQixDQUFDO2FBQ0wsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IEJhY2tlbmRPcHRpb25zLCBSZXF1ZXN0Q2FsbGJhY2sgfSBmcm9tICdpMThuZXh0LWh0dHAtYmFja2VuZCc7XG5cbmV4cG9ydCB0eXBlIEkxOG5leHRIdHRwQmFja2VuZENsaWVudCA9IEJhY2tlbmRPcHRpb25zWydyZXF1ZXN0J107XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gYmUgdXNlZCBieSB0aGUgYGkxOG5leHQtaHR0cC1iYWNrZW5kYCBwbHVnaW4gZm9yIGxvYWRpbmcgdHJhbnNsYXRpb25zIHZpYSBodHRwLlxuICovXG5leHBvcnQgY29uc3QgSTE4TkVYVF9IVFRQX0JBQ0tFTkRfQ0xJRU5UID0gbmV3IEluamVjdGlvblRva2VuPFxuICBCYWNrZW5kT3B0aW9uc1sncmVxdWVzdCddXG4+KCdJMThORVhUX0hUVFBfQkFDS0VORF9DTElFTlQnLCB7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZmFjdG9yeTogKCk6IEkxOG5leHRIdHRwQmFja2VuZENsaWVudCA9PiB7XG4gICAgY29uc3QgaHR0cENsaWVudCA9IGluamVjdChIdHRwQ2xpZW50KTtcblxuICAgIC8vIEZ1bmN0aW9uIGFwcHJvcHJpYXRlIGZvciBpMThuZXh0IHRvIG1ha2UgaHR0cCBjYWxscyBmb3IgbGF6eS1sb2FkZWQgdHJhbnNsYXRpb24gZmlsZXMuXG4gICAgLy8gU2VlIGRvY3MgZm9yIGBpMThuZXh0LWh0dHAtYmFja2VuZGA6IGh0dHBzOi8vZ2l0aHViLmNvbS9pMThuZXh0L2kxOG5leHQtaHR0cC1iYWNrZW5kI2JhY2tlbmQtb3B0aW9uc1xuICAgIC8vXG4gICAgLy8gSXQgdXNlcyBBbmd1bGFyIEh0dHBDbGllbnQgdW5kZXIgdGhlIGhvb2QsIHNvIGl0IHdvcmtzIGluIFNTUi5cbiAgICByZXR1cm4gKFxuICAgICAgX29wdGlvbnM6IEJhY2tlbmRPcHRpb25zLFxuICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICBfcGF5bG9hZDogb2JqZWN0IHwgc3RyaW5nLFxuICAgICAgY2FsbGJhY2s6IFJlcXVlc3RDYWxsYmFja1xuICAgICkgPT4ge1xuICAgICAgaHR0cENsaWVudC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChkYXRhKSA9PiBjYWxsYmFjayhudWxsLCB7IHN0YXR1czogMjAwLCBkYXRhIH0pLFxuICAgICAgICBlcnJvcjogKGVycm9yKSA9PlxuICAgICAgICAgIGNhbGxiYWNrKGVycm9yLCB7XG4gICAgICAgICAgICAvLyBhIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9pMThuZXh0L2kxOG5leHQtaHR0cC1iYWNrZW5kL2lzc3Vlcy84MlxuICAgICAgICAgICAgZGF0YTogbnVsbCBhcyBhbnksXG4gICAgICAgICAgICBzdGF0dXM6IGVycm9yLnN0YXR1cyxcbiAgICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIH07XG4gIH0sXG59KTtcbiJdfQ==