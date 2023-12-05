/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { defaultOccStoreFinderConfig } from './adapters/default-occ-store-finder-config';
import { OccStoreFinderAdapter } from './adapters/occ-store-finder.adapter';
import { provideDefaultConfig } from '@spartacus/core';
import { StoreFinderAdapter } from '@spartacus/storefinder/core';
import * as i0 from "@angular/core";
export class StoreFinderOccModule {
}
StoreFinderOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule });
StoreFinderOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule, providers: [
        provideDefaultConfig(defaultOccStoreFinderConfig),
        { provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccStoreFinderConfig),
                        { provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvc3RvcmVmaW5kZXIvb2NjL3N0b3JlLWZpbmRlci1vY2MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQVFqRSxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixhQUxwQjtRQUNULG9CQUFvQixDQUFDLDJCQUEyQixDQUFDO1FBQ2pELEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRTtLQUNqRTsyRkFFVSxvQkFBb0I7a0JBTmhDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLDJCQUEyQixDQUFDO3dCQUNqRCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7cUJBQ2pFO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgZGVmYXVsdE9jY1N0b3JlRmluZGVyQ29uZmlnIH0gZnJvbSAnLi9hZGFwdGVycy9kZWZhdWx0LW9jYy1zdG9yZS1maW5kZXItY29uZmlnJztcbmltcG9ydCB7IE9jY1N0b3JlRmluZGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLXN0b3JlLWZpbmRlci5hZGFwdGVyJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN0b3JlRmluZGVyQWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmaW5kZXIvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NTdG9yZUZpbmRlckNvbmZpZyksXG4gICAgeyBwcm92aWRlOiBTdG9yZUZpbmRlckFkYXB0ZXIsIHVzZUNsYXNzOiBPY2NTdG9yZUZpbmRlckFkYXB0ZXIgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVGaW5kZXJPY2NNb2R1bGUge31cbiJdfQ==