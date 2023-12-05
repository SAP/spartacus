/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import '@spartacus/product-configurator/common';
import * as i0 from "@angular/core";
export class CpqConfiguratorAuthConfig {
}
CpqConfiguratorAuthConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorAuthConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorAuthConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorAuthConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorAuthConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1hdXRoLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC9jcHEvaW50ZXJjZXB0b3IvY3BxLWNvbmZpZ3VyYXRvci1hdXRoLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyx3Q0FBd0MsQ0FBQzs7QUFzQmhELE1BQU0sT0FBZ0IseUJBQXlCOztzSEFBekIseUJBQXlCOzBIQUF6Qix5QkFBeUIsY0FIakMsTUFBTSxlQUNMLE1BQU07MkZBRUMseUJBQXlCO2tCQUo5QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixXQUFXLEVBQUUsTUFBTTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0ICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdENvbmZpZ3VyYXRvckNwcUF1dGhDb25maWcge1xuICBjcHE/OiB7XG4gICAgYXV0aGVudGljYXRpb246IHtcbiAgICAgIC8qKiBXZSBzaG91bGQgc3RvcCB1c2luZy9zZW5kaW5nIGEgdG9rZW4gc2hvcnRseSBiZWZvcmUgZXhwaXJhdGlvbixcbiAgICAgICAqIHRvIGF2b2lkIHRoYXQgaXQgaXMgYWN0dWFsbHkgZXhwaXJlZCB3aGVuIGV2YWx1YXRlZCBpbiB0aGUgdGFyZ2V0IHN5c3RlbS5cbiAgICAgICAqIFRpbWUgZ2l2ZW4gaW4gbXMuICovXG4gICAgICB0b2tlbkV4cGlyYXRpb25CdWZmZXI6IG51bWJlcjtcbiAgICAgIC8qKiBtYXggdGltZSBpbiBtcyB0byBwYXNzIHVudGlsIGEgdG9rZW4gaXMgY29uc2lkZXJlZCBleHBpcmVkIGFuZCByZS1mZXRjaGVkLFxuICAgICAgICogZXZlbiBpZiB0b2tlbiBleHBpcmF0aW9uIHRpbWUgaXMgbG9uZ2VyICovXG4gICAgICB0b2tlbk1heFZhbGlkaXR5OiBudW1iZXI7XG4gICAgICAvKiogbWluIHRpbWUgdG8gcGFzcyB1bnRpbCBhIHRva2VuIGlzIHJlLWZldGNoZWQsIGV2ZW4gaWYgdG9rZW4gZXhwaXJhdGlvbiB0aW1lIGlzIHNob3J0ZXIgKi9cbiAgICAgIHRva2VuTWluVmFsaWRpdHk6IG51bWJlcjtcbiAgICB9O1xuICB9O1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRXhpc3Rpbmc6IENvbmZpZyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3BxQ29uZmlndXJhdG9yQXV0aENvbmZpZyB7XG4gIHByb2R1Y3RDb25maWd1cmF0b3I6IFByb2R1Y3RDb25maWd1cmF0b3JDcHFBdXRoQ29uZmlnO1xufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nIHtcbiAgaW50ZXJmYWNlIFByb2R1Y3RDb25maWd1cmF0b3JDb25maWdcbiAgICBleHRlbmRzIFByb2R1Y3RDb25maWd1cmF0b3JDcHFBdXRoQ29uZmlnIHt9XG59XG4iXX0=