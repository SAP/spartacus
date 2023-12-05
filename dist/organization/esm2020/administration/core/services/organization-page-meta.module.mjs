/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { OrganizationPageMetaResolver } from './organization-page-meta.resolver';
import * as i0 from "@angular/core";
export class OrganizationPageMetaModule {
}
OrganizationPageMetaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationPageMetaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationPageMetaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrganizationPageMetaModule });
OrganizationPageMetaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationPageMetaModule, providers: [
        {
            provide: PageMetaResolver,
            useExisting: OrganizationPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationPageMetaModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: PageMetaResolver,
                            useExisting: OrganizationPageMetaResolver,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLXBhZ2UtbWV0YS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvc2VydmljZXMvb3JnYW5pemF0aW9uLXBhZ2UtbWV0YS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBV2pGLE1BQU0sT0FBTywwQkFBMEI7O3VIQUExQiwwQkFBMEI7d0hBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCLGFBUjFCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLDBCQUEwQjtrQkFUdEMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGdCQUFnQjs0QkFDekIsV0FBVyxFQUFFLDRCQUE0Qjs0QkFDekMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25QYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi9vcmdhbml6YXRpb24tcGFnZS1tZXRhLnJlc29sdmVyJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogUGFnZU1ldGFSZXNvbHZlcixcbiAgICAgIHVzZUV4aXN0aW5nOiBPcmdhbml6YXRpb25QYWdlTWV0YVJlc29sdmVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uUGFnZU1ldGFNb2R1bGUge31cbiJdfQ==