/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * Provides configuration specific to Media, such as images. This is used to optimize
 * rendering of the media, SEO and performance.
 */
export class MediaConfig {
}
MediaConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MediaConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9tZWRpYS9tZWRpYS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUd6Qzs7O0dBR0c7QUFLSCxNQUFNLE9BQWdCLFdBQVc7O3dHQUFYLFdBQVc7NEdBQVgsV0FBVyxjQUhuQixNQUFNLGVBQ0wsTUFBTTsyRkFFQyxXQUFXO2tCQUpoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixXQUFXLEVBQUUsTUFBTTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSW1hZ2VMb2FkaW5nU3RyYXRlZ3ksIE1lZGlhRm9ybWF0U2l6ZSB9IGZyb20gJy4vbWVkaWEubW9kZWwnO1xuXG4vKipcbiAqIFByb3ZpZGVzIGNvbmZpZ3VyYXRpb24gc3BlY2lmaWMgdG8gTWVkaWEsIHN1Y2ggYXMgaW1hZ2VzLiBUaGlzIGlzIHVzZWQgdG8gb3B0aW1pemVcbiAqIHJlbmRlcmluZyBvZiB0aGUgbWVkaWEsIFNFTyBhbmQgcGVyZm9ybWFuY2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VFeGlzdGluZzogQ29uZmlnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZWRpYUNvbmZpZyB7XG4gIC8qKlxuICAgKiBNZWRpYSBfZm9ybWF0XyBjb25maWd1cmF0aW9uIGhvbGRzIHRoZSBzaXplIG9mIHRoZSBtZWRpYSdzIGFzc2lnbmVkIHRvXG4gICAqIGEgZm9ybWF0LlxuICAgKi9cbiAgbWVkaWFGb3JtYXRzPzoge1xuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudHMgdGhlIG1lZGlhIGZvcm1hdCBjb2RlLCB0aGF0IGlzIHRoZSBrZXkgdG8gZGlzdGluZ3Vpc2ggZGlmZmVyZW50XG4gICAgICogbWVkaWEgaW4gYSBjb250YWluZXIuXG4gICAgICovXG4gICAgW2Zvcm1hdDogc3RyaW5nXTogTWVkaWFGb3JtYXRTaXplO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRoZSBicm93c2VyIHNob3VsZCBsb2FkIHRoZSBpbWFnZS4gVGhlcmUncyBvbmx5IG9uZVxuICAgKiBnbG9iYWwgc3RyYXRlZ3kgZm9yIGFsbCBtZWRpYSBjcm9zcyBtZWRpYSBpbiBTcGFydGFjdXMuXG4gICAqXG4gICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvaW1nIGZvciBtb3JlXG4gICAqIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBJZiB0aGUgYGxhenlgIHN0cmF0ZWd5IGlzIGluIHBsYWNlLCB0aGUgYGxvYWRpbmc9XCJsYXp5XCJgIGF0dHJpYnV0ZSBpcyBhZGRlZCB0byB0aGVcbiAgICogaW1nIGVsZW1lbnQuXG4gICAqL1xuICBpbWFnZUxvYWRpbmdTdHJhdGVneT86IEltYWdlTG9hZGluZ1N0cmF0ZWd5O1xufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHNwYXJ0YWN1cy9jb3JlJyB7XG4gIGludGVyZmFjZSBDb25maWcgZXh0ZW5kcyBNZWRpYUNvbmZpZyB7fVxufVxuIl19