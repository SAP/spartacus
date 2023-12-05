/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultGoogleTagManagerConfig } from './config/default-gtm.config';
import * as i0 from "@angular/core";
export class GtmModule {
}
GtmModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GtmModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: GtmModule });
GtmModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmModule, providers: [provideDefaultConfig(defaultGoogleTagManagerConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfig(defaultGoogleTagManagerConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3RtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy90cmFja2luZy90bXMvZ3RtL2d0bS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBSzVFLE1BQU0sT0FBTyxTQUFTOztzR0FBVCxTQUFTO3VHQUFULFNBQVM7dUdBQVQsU0FBUyxhQUZULENBQUMsb0JBQW9CLENBQUMsNkJBQTZCLENBQUMsQ0FBQzsyRkFFckQsU0FBUztrQkFIckIsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2lCQUNqRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0R29vZ2xlVGFnTWFuYWdlckNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtZ3RtLmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW3Byb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRHb29nbGVUYWdNYW5hZ2VyQ29uZmlnKV0sXG59KVxuZXhwb3J0IGNsYXNzIEd0bU1vZHVsZSB7fVxuIl19