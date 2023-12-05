/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { AdminGuard } from './admin.guard';
import { OrgUnitGuard } from './org-unit.guard';
import { UserGuard } from './user.guard';
import * as i0 from "@angular/core";
export class OrganizationsGuardsModule {
}
OrganizationsGuardsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationsGuardsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationsGuardsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrganizationsGuardsModule });
OrganizationsGuardsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationsGuardsModule, providers: [AdminGuard, UserGuard, OrgUnitGuard] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationsGuardsModule, decorators: [{
            type: NgModule,
            args: [{
                    // To ensure effective over-providing from within the child injector of a lazy-loaded module
                    // by other extension libraries or end-user customizations, it's essential to provide guards manually
                    // in the child injector and not in the root injector (providedIn: 'root').
                    //
                    // If guards were provided in the root injector, the only place to over-provide them or their dependencies
                    // would be the root injector (root module), which would break lazy loading for those guards and their dependencies.
                    providers: [AdminGuard, UserGuard, OrgUnitGuard],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWd1YXJkcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvZ3VhcmRzL29yZ2FuaXphdGlvbi1ndWFyZHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBV3pDLE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLGFBRnpCLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUM7MkZBRXJDLHlCQUF5QjtrQkFUckMsUUFBUTttQkFBQztvQkFDUiw0RkFBNEY7b0JBQzVGLHFHQUFxRztvQkFDckcsMkVBQTJFO29CQUMzRSxFQUFFO29CQUNGLDBHQUEwRztvQkFDMUcsb0hBQW9IO29CQUNwSCxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQztpQkFDakQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJy4vYWRtaW4uZ3VhcmQnO1xuaW1wb3J0IHsgT3JnVW5pdEd1YXJkIH0gZnJvbSAnLi9vcmctdW5pdC5ndWFyZCc7XG5pbXBvcnQgeyBVc2VyR3VhcmQgfSBmcm9tICcuL3VzZXIuZ3VhcmQnO1xuXG5ATmdNb2R1bGUoe1xuICAvLyBUbyBlbnN1cmUgZWZmZWN0aXZlIG92ZXItcHJvdmlkaW5nIGZyb20gd2l0aGluIHRoZSBjaGlsZCBpbmplY3RvciBvZiBhIGxhenktbG9hZGVkIG1vZHVsZVxuICAvLyBieSBvdGhlciBleHRlbnNpb24gbGlicmFyaWVzIG9yIGVuZC11c2VyIGN1c3RvbWl6YXRpb25zLCBpdCdzIGVzc2VudGlhbCB0byBwcm92aWRlIGd1YXJkcyBtYW51YWxseVxuICAvLyBpbiB0aGUgY2hpbGQgaW5qZWN0b3IgYW5kIG5vdCBpbiB0aGUgcm9vdCBpbmplY3RvciAocHJvdmlkZWRJbjogJ3Jvb3QnKS5cbiAgLy9cbiAgLy8gSWYgZ3VhcmRzIHdlcmUgcHJvdmlkZWQgaW4gdGhlIHJvb3QgaW5qZWN0b3IsIHRoZSBvbmx5IHBsYWNlIHRvIG92ZXItcHJvdmlkZSB0aGVtIG9yIHRoZWlyIGRlcGVuZGVuY2llc1xuICAvLyB3b3VsZCBiZSB0aGUgcm9vdCBpbmplY3RvciAocm9vdCBtb2R1bGUpLCB3aGljaCB3b3VsZCBicmVhayBsYXp5IGxvYWRpbmcgZm9yIHRob3NlIGd1YXJkcyBhbmQgdGhlaXIgZGVwZW5kZW5jaWVzLlxuICBwcm92aWRlcnM6IFtBZG1pbkd1YXJkLCBVc2VyR3VhcmQsIE9yZ1VuaXRHdWFyZF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvbnNHdWFyZHNNb2R1bGUge31cbiJdfQ==