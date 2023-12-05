/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { QUALTRICS_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultQualtricsComponentsConfig() {
    const config = {
        featureModules: {
            [QUALTRICS_FEATURE]: {
                cmsComponents: ['QualtricsComponent'],
            },
        },
    };
    return config;
}
export class QualtricsRootModule {
}
QualtricsRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QualtricsRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule });
QualtricsRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule, providers: [provideDefaultConfigFactory(defaultQualtricsComponentsConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfigFactory(defaultQualtricsComponentsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbHRyaWNzLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3F1YWx0cmljcy9yb290L3F1YWx0cmljcy1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFbkQsMkVBQTJFO0FBQzNFLE1BQU0sVUFBVSxnQ0FBZ0M7SUFDOUMsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNuQixhQUFhLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUN0QztTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFLRCxNQUFNLE9BQU8sbUJBQW1COztnSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixhQUZuQixDQUFDLDJCQUEyQixDQUFDLGdDQUFnQyxDQUFDLENBQUM7MkZBRS9ELG1CQUFtQjtrQkFIL0IsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2lCQUMzRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBRVUFMVFJJQ1NfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFF1YWx0cmljc0NvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtRVUFMVFJJQ1NfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydRdWFsdHJpY3NDb21wb25lbnQnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdFF1YWx0cmljc0NvbXBvbmVudHNDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVhbHRyaWNzUm9vdE1vZHVsZSB7fVxuIl19