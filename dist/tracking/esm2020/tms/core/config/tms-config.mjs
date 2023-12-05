/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * TMS configuration
 */
export class TmsConfig {
}
TmsConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TmsConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1zLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy90cmFja2luZy90bXMvY29yZS9jb25maWcvdG1zLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFnQixVQUFVLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLGlCQUFpQixDQUFDOztBQTJCbEQ7O0dBRUc7QUFLSCxNQUFNLE9BQWdCLFNBQVM7O3NHQUFULFNBQVM7MEdBQVQsU0FBUyxjQUhqQixNQUFNLGVBQ0wsTUFBTTsyRkFFQyxTQUFTO2tCQUo5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixXQUFXLEVBQUUsTUFBTTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBYnN0cmFjdFR5cGUsIEluamVjdGFibGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZywgQ3hFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBUbXNDb2xsZWN0b3IgfSBmcm9tICcuLi9tb2RlbC90bXMubW9kZWwnO1xuXG4vKipcbiAqIENvbGxlY3RvciBjb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG1zQ29sbGVjdG9yQ29uZmlnIHtcbiAgLyoqIFNob3VsZCBiZSBlbmFibGVkIGluIGRldmVsb3BtZW50IG1vZGUgb25seSAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBmb3IgdGhlIGRhdGEgbGF5ZXIgb2JqZWN0LlxuICAgKi9cbiAgZGF0YUxheWVyUHJvcGVydHk/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBFdmVudHMgdG8gc2VuZCB0byB0aGUgY29uZmlndXJlZCBUTVMuXG4gICAqL1xuICBldmVudHM/OiBBYnN0cmFjdFR5cGU8Q3hFdmVudD5bXTtcbiAgLyoqXG4gICAqIFRoZSBjb2xsZWN0b3Igc2VydmljZSBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIGNvbGxlY3Rvcj86IFR5cGU8VG1zQ29sbGVjdG9yPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUbXNDb2xsZWN0b3JzIHtcbiAgW3Rtczogc3RyaW5nXTogVG1zQ29sbGVjdG9yQ29uZmlnIHwgdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRNUyBjb25maWd1cmF0aW9uXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VFeGlzdGluZzogQ29uZmlnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUbXNDb25maWcge1xuICAvKipcbiAgICogVGFnIG1hbmFnZXIgY29uZmlnXG4gICAqL1xuICB0YWdNYW5hZ2VyPzogVG1zQ29sbGVjdG9ycztcbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BzcGFydGFjdXMvY29yZScge1xuICBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgVG1zQ29uZmlnIHt9XG59XG4iXX0=