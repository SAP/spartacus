/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * The direction config provides an easy way to configure "ltr" versus "rtl" direction
 * for the storefront. The direction can be configured to detect the direction by language.
 *
 * The following configuration detects rtl languages by isoCode for Arabic and Hebrew:
 *
 * ```typescript
 * direction: {
 *   detect: true,
 *   default: DirectionMode.LTR,
 *   rtlLanguages: ['ar', 'he']
 * }
 * ```
 */
export class DirectionConfig {
}
DirectionConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DirectionConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9uLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2RpcmVjdGlvbi9jb25maWcvZGlyZWN0aW9uLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBR3pDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFLSCxNQUFNLE9BQWdCLGVBQWU7OzRHQUFmLGVBQWU7Z0hBQWYsZUFBZSxjQUh2QixNQUFNLGVBQ0wsTUFBTTsyRkFFQyxlQUFlO2tCQUpwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixXQUFXLEVBQUUsTUFBTTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnLi9kaXJlY3Rpb24ubW9kZWwnO1xuXG4vKipcbiAqIFRoZSBkaXJlY3Rpb24gY29uZmlnIHByb3ZpZGVzIGFuIGVhc3kgd2F5IHRvIGNvbmZpZ3VyZSBcImx0clwiIHZlcnN1cyBcInJ0bFwiIGRpcmVjdGlvblxuICogZm9yIHRoZSBzdG9yZWZyb250LiBUaGUgZGlyZWN0aW9uIGNhbiBiZSBjb25maWd1cmVkIHRvIGRldGVjdCB0aGUgZGlyZWN0aW9uIGJ5IGxhbmd1YWdlLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgY29uZmlndXJhdGlvbiBkZXRlY3RzIHJ0bCBsYW5ndWFnZXMgYnkgaXNvQ29kZSBmb3IgQXJhYmljIGFuZCBIZWJyZXc6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogZGlyZWN0aW9uOiB7XG4gKiAgIGRldGVjdDogdHJ1ZSxcbiAqICAgZGVmYXVsdDogRGlyZWN0aW9uTW9kZS5MVFIsXG4gKiAgIHJ0bExhbmd1YWdlczogWydhcicsICdoZSddXG4gKiB9XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUV4aXN0aW5nOiBDb25maWcsXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpcmVjdGlvbkNvbmZpZyB7XG4gIGRpcmVjdGlvbj86IERpcmVjdGlvbjtcbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BzcGFydGFjdXMvY29yZScge1xuICBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgRGlyZWN0aW9uQ29uZmlnIHt9XG59XG4iXX0=