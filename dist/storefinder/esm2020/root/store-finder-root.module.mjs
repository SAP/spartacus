/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { defaultStoreFinderLayoutConfig } from './config/default-store-finder-layout-config';
import { STORE_FINDER_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultStoreFinderComponentsConfig() {
    const config = {
        featureModules: {
            [STORE_FINDER_FEATURE]: {
                cmsComponents: ['StoreFinderComponent'],
            },
        },
    };
    return config;
}
export class StoreFinderRootModule {
}
StoreFinderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule });
StoreFinderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule, providers: [
        provideDefaultConfig(defaultStoreFinderLayoutConfig),
        provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    providers: [
                        provideDefaultConfig(defaultStoreFinderLayoutConfig),
                        provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL3Jvb3Qvc3RvcmUtZmluZGVyLXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsMkJBQTJCLEdBQzVCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDN0YsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXRELDJFQUEyRTtBQUMzRSxNQUFNLFVBQVUsa0NBQWtDO0lBQ2hELE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDdEIsYUFBYSxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDeEM7U0FDRjtLQUNGLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBU0QsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsYUFMckI7UUFDVCxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQztRQUNwRCwyQkFBMkIsQ0FBQyxrQ0FBa0MsQ0FBQztLQUNoRTsyRkFFVSxxQkFBcUI7a0JBUGpDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQzt3QkFDcEQsMkJBQTJCLENBQUMsa0NBQWtDLENBQUM7cUJBQ2hFO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRTdG9yZUZpbmRlckxheW91dENvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtc3RvcmUtZmluZGVyLWxheW91dC1jb25maWcnO1xuaW1wb3J0IHsgU1RPUkVfRklOREVSX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5cbi8vIFRPRE86IElubGluZSB0aGlzIGZhY3Rvcnkgd2hlbiB3ZSBzdGFydCByZWxlYXNpbmcgSXZ5IGNvbXBpbGVkIGxpYnJhcmllc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRTdG9yZUZpbmRlckNvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtTVE9SRV9GSU5ERVJfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydTdG9yZUZpbmRlckNvbXBvbmVudCddLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRTdG9yZUZpbmRlckxheW91dENvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRTdG9yZUZpbmRlckNvbXBvbmVudHNDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZUZpbmRlclJvb3RNb2R1bGUge31cbiJdfQ==