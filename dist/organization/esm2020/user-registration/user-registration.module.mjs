/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { UserRegistrationComponentsModule } from '@spartacus/organization/user-registration/components';
import { UserRegistrationCoreModule } from '@spartacus/organization/user-registration/core';
import { UserRegistrationOccModule } from '@spartacus/organization/user-registration/occ';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/organization/user-registration/core";
export class OrganizationUserRegistrationModule {
}
OrganizationUserRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationUserRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, imports: [i1.UserRegistrationCoreModule, UserRegistrationComponentsModule,
        UserRegistrationOccModule] });
OrganizationUserRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, imports: [UserRegistrationCoreModule.forRoot(),
        UserRegistrationComponentsModule,
        UserRegistrationOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        UserRegistrationCoreModule.forRoot(),
                        UserRegistrationComponentsModule,
                        UserRegistrationOccModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDeEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDNUYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0NBQStDLENBQUM7OztBQVMxRixNQUFNLE9BQU8sa0NBQWtDOzsrSEFBbEMsa0NBQWtDO2dJQUFsQyxrQ0FBa0MsMkNBSjNDLGdDQUFnQztRQUNoQyx5QkFBeUI7Z0lBR2hCLGtDQUFrQyxZQUwzQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUU7UUFDcEMsZ0NBQWdDO1FBQ2hDLHlCQUF5QjsyRkFHaEIsa0NBQWtDO2tCQVA5QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCwwQkFBMEIsQ0FBQyxPQUFPLEVBQUU7d0JBQ3BDLGdDQUFnQzt3QkFDaEMseUJBQXlCO3FCQUMxQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyUmVnaXN0cmF0aW9uQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL3VzZXItcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgVXNlclJlZ2lzdHJhdGlvbkNvcmVNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFVzZXJSZWdpc3RyYXRpb25PY2NNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9vY2MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVXNlclJlZ2lzdHJhdGlvbkNvcmVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFVzZXJSZWdpc3RyYXRpb25Db21wb25lbnRzTW9kdWxlLFxuICAgIFVzZXJSZWdpc3RyYXRpb25PY2NNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25Nb2R1bGUge31cbiJdfQ==