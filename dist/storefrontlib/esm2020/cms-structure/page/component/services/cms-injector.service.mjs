/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Injector } from '@angular/core';
import { CmsComponentData } from '../../model/cms-component-data';
import { ComponentDataProvider } from './component-data.provider';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/cms-components.service";
/**
 * Used to prepare injector for CMS components.
 *
 * Injector will take into account configured providers and provides CmsComponentData
 * for specified component's uid
 */
export class CmsInjectorService {
    constructor(cmsComponentsService, injector) {
        this.cmsComponentsService = cmsComponentsService;
        this.injector = injector;
    }
    getInjector(type, uid, parentInjector) {
        const configProviders = this.cmsComponentsService.getMapping(type)?.providers ?? [];
        return Injector.create({
            providers: [
                {
                    provide: CmsComponentData,
                    useFactory: (dataProvider) => ({
                        uid,
                        data$: dataProvider.get(uid, type),
                    }),
                    deps: [ComponentDataProvider],
                },
                ...configProviders,
            ],
            parent: parentInjector ?? this.injector,
        });
    }
}
CmsInjectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsInjectorService, deps: [{ token: i1.CmsComponentsService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
CmsInjectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsInjectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsInjectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentsService }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWluamVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9jb21wb25lbnQvc2VydmljZXMvY21zLWluamVjdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFFbEU7Ozs7O0dBS0c7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQ1ksb0JBQTBDLEVBQzFDLFFBQWtCO1FBRGxCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUMzQixDQUFDO0lBRUcsV0FBVyxDQUNoQixJQUFZLEVBQ1osR0FBVyxFQUNYLGNBQXlCO1FBRXpCLE1BQU0sZUFBZSxHQUNuQixJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDOUQsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixVQUFVLEVBQUUsQ0FBQyxZQUFtQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRCxHQUFHO3dCQUNILEtBQUssRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7cUJBQ25DLENBQUM7b0JBQ0YsSUFBSSxFQUFFLENBQUMscUJBQXFCLENBQUM7aUJBQzlCO2dCQUNELEdBQUcsZUFBZTthQUNuQjtZQUNELE1BQU0sRUFBRSxjQUFjLElBQUksSUFBSSxDQUFDLFFBQVE7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7K0dBM0JVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2Ntcy1jb21wb25lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50RGF0YSB9IGZyb20gJy4uLy4uL21vZGVsL2Ntcy1jb21wb25lbnQtZGF0YSc7XG5pbXBvcnQgeyBDb21wb25lbnREYXRhUHJvdmlkZXIgfSBmcm9tICcuL2NvbXBvbmVudC1kYXRhLnByb3ZpZGVyJztcblxuLyoqXG4gKiBVc2VkIHRvIHByZXBhcmUgaW5qZWN0b3IgZm9yIENNUyBjb21wb25lbnRzLlxuICpcbiAqIEluamVjdG9yIHdpbGwgdGFrZSBpbnRvIGFjY291bnQgY29uZmlndXJlZCBwcm92aWRlcnMgYW5kIHByb3ZpZGVzIENtc0NvbXBvbmVudERhdGFcbiAqIGZvciBzcGVjaWZpZWQgY29tcG9uZW50J3MgdWlkXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbXNJbmplY3RvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY21zQ29tcG9uZW50c1NlcnZpY2U6IENtc0NvbXBvbmVudHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7fVxuXG4gIHB1YmxpYyBnZXRJbmplY3RvcihcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgdWlkOiBzdHJpbmcsXG4gICAgcGFyZW50SW5qZWN0b3I/OiBJbmplY3RvclxuICApOiBJbmplY3RvciB7XG4gICAgY29uc3QgY29uZmlnUHJvdmlkZXJzID1cbiAgICAgIHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2UuZ2V0TWFwcGluZyh0eXBlKT8ucHJvdmlkZXJzID8/IFtdO1xuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDbXNDb21wb25lbnREYXRhLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IChkYXRhUHJvdmlkZXI6IENvbXBvbmVudERhdGFQcm92aWRlcikgPT4gKHtcbiAgICAgICAgICAgIHVpZCxcbiAgICAgICAgICAgIGRhdGEkOiBkYXRhUHJvdmlkZXIuZ2V0KHVpZCwgdHlwZSksXG4gICAgICAgICAgfSksXG4gICAgICAgICAgZGVwczogW0NvbXBvbmVudERhdGFQcm92aWRlcl0sXG4gICAgICAgIH0sXG4gICAgICAgIC4uLmNvbmZpZ1Byb3ZpZGVycyxcbiAgICAgIF0sXG4gICAgICBwYXJlbnQ6IHBhcmVudEluamVjdG9yID8/IHRoaXMuaW5qZWN0b3IsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==