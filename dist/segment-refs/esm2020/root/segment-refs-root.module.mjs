/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultSegmentRefsConfig } from './config/default-segment-refs-config';
import { segmentRefsInterceptors } from './http-interceptors';
import * as i0 from "@angular/core";
export class SegmentRefsRootModule {
}
SegmentRefsRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SegmentRefsRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule });
SegmentRefsRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule, providers: [
        ...segmentRefsInterceptors,
        provideDefaultConfig(defaultSegmentRefsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [],
                    providers: [
                        ...segmentRefsInterceptors,
                        provideDefaultConfig(defaultSegmentRefsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudC1yZWZzLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9zZWdtZW50LXJlZnMvcm9vdC9zZWdtZW50LXJlZnMtcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBVTlELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBTHJCO1FBQ1QsR0FBRyx1QkFBdUI7UUFDMUIsb0JBQW9CLENBQUMsd0JBQXdCLENBQUM7S0FDL0M7MkZBRVUscUJBQXFCO2tCQVJqQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxTQUFTLEVBQUU7d0JBQ1QsR0FBRyx1QkFBdUI7d0JBQzFCLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDO3FCQUMvQztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0U2VnbWVudFJlZnNDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LXNlZ21lbnQtcmVmcy1jb25maWcnO1xuaW1wb3J0IHsgc2VnbWVudFJlZnNJbnRlcmNlcHRvcnMgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLnNlZ21lbnRSZWZzSW50ZXJjZXB0b3JzLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRTZWdtZW50UmVmc0NvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNlZ21lbnRSZWZzUm9vdE1vZHVsZSB7fVxuIl19