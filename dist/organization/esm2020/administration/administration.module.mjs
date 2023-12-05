/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { AdministrationComponentsModule } from '@spartacus/organization/administration/components';
import { AdministrationCoreModule } from '@spartacus/organization/administration/core';
import { AdministrationOccModule } from '@spartacus/organization/administration/occ';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/organization/administration/core";
export class AdministrationModule {
}
AdministrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, imports: [i1.AdministrationCoreModule, AdministrationOccModule,
        AdministrationComponentsModule] });
AdministrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, imports: [AdministrationCoreModule.forRoot(),
        AdministrationOccModule,
        AdministrationComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdministrationCoreModule.forRoot(),
                        AdministrationOccModule,
                        AdministrationComponentsModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hZG1pbmlzdHJhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDbkcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNENBQTRDLENBQUM7OztBQVNyRixNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IseUNBSjdCLHVCQUF1QjtRQUN2Qiw4QkFBOEI7a0hBR3JCLG9CQUFvQixZQUw3Qix3QkFBd0IsQ0FBQyxPQUFPLEVBQUU7UUFDbEMsdUJBQXVCO1FBQ3ZCLDhCQUE4QjsyRkFHckIsb0JBQW9CO2tCQVBoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCx3QkFBd0IsQ0FBQyxPQUFPLEVBQUU7d0JBQ2xDLHVCQUF1Qjt3QkFDdkIsOEJBQThCO3FCQUMvQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZG1pbmlzdHJhdGlvbkNvbXBvbmVudHNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzJztcbmltcG9ydCB7IEFkbWluaXN0cmF0aW9uQ29yZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgQWRtaW5pc3RyYXRpb25PY2NNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9vY2MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQWRtaW5pc3RyYXRpb25Db3JlTW9kdWxlLmZvclJvb3QoKSxcbiAgICBBZG1pbmlzdHJhdGlvbk9jY01vZHVsZSxcbiAgICBBZG1pbmlzdHJhdGlvbkNvbXBvbmVudHNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluaXN0cmF0aW9uTW9kdWxlIHt9XG4iXX0=