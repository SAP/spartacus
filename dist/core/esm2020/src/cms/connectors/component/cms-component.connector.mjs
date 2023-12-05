/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../services/cms-structure-config.service";
import * as i2 from "./cms-component.adapter";
import * as i3 from "../../config/cms-config";
export class CmsComponentConnector {
    constructor(cmsStructureConfigService, cmsComponentAdapter, config) {
        this.cmsStructureConfigService = cmsStructureConfigService;
        this.cmsComponentAdapter = cmsComponentAdapter;
        this.config = config;
    }
    get(id, pageContext) {
        return this.cmsStructureConfigService
            .getComponentFromConfig(id)
            .pipe(switchMap((configuredComponent) => configuredComponent
            ? of(configuredComponent)
            : this.cmsComponentAdapter.load(id, pageContext)));
    }
    getList(ids, pageContext) {
        return this.cmsStructureConfigService.getComponentsFromConfig(ids).pipe(switchMap((configuredComponents) => {
            // check if we have some components that are not loaded from configuration
            const missingIds = configuredComponents.reduce((acc, component, index) => {
                if (component === undefined) {
                    acc.push(ids[index]);
                }
                return acc;
            }, []);
            if (missingIds.length > 0) {
                const pageSize = this.config.componentsLoading?.pageSize || missingIds.length;
                const totalPages = Math.ceil(missingIds.length / pageSize);
                const cmsComponents = [];
                let currentPage = 0;
                while (currentPage < totalPages) {
                    cmsComponents.push(this.cmsComponentAdapter.findComponentsByIds(missingIds.slice(currentPage * pageSize, (currentPage + 1) * pageSize), pageContext));
                    currentPage++;
                }
                return zip(...cmsComponents).pipe(map((loadedComponents) => [...configuredComponents.filter(Boolean)].concat(...loadedComponents)));
            }
            else {
                return of(configuredComponents);
            }
        }));
    }
}
CmsComponentConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsComponentConnector, deps: [{ token: i1.CmsStructureConfigService }, { token: i2.CmsComponentAdapter }, { token: i3.CmsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CmsComponentConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsComponentConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsComponentConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsStructureConfigService }, { type: i2.CmsComponentAdapter }, { type: i3.CmsConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWNvbXBvbmVudC5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jbXMvY29ubmVjdG9ycy9jb21wb25lbnQvY21zLWNvbXBvbmVudC5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFVaEQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNZLHlCQUFvRCxFQUNwRCxtQkFBd0MsRUFDeEMsTUFBaUI7UUFGakIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDMUIsQ0FBQztJQUVKLEdBQUcsQ0FDRCxFQUFVLEVBQ1YsV0FBd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMseUJBQXlCO2FBQ2xDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQzthQUMxQixJQUFJLENBQ0gsU0FBUyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUNoQyxtQkFBbUI7WUFDakIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQ25ELENBQ0YsQ0FBQztJQUNOLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBYSxFQUFFLFdBQXdCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDckUsU0FBUyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsRUFBRTtZQUNqQywwRUFBMEU7WUFDMUUsTUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUM1QyxDQUFDLEdBQWEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtvQkFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDdEI7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7WUFDYixDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUM7WUFFRixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixNQUFNLFFBQVEsR0FDWixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO2dCQUMvRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQzNELE1BQU0sYUFBYSxHQUFpQyxFQUFFLENBQUM7Z0JBRXZELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxXQUFXLEdBQUcsVUFBVSxFQUFFO29CQUMvQixhQUFhLENBQUMsSUFBSSxDQUNoQixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQzFDLFVBQVUsQ0FBQyxLQUFLLENBQ2QsV0FBVyxHQUFHLFFBQVEsRUFDdEIsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUM3QixFQUNELFdBQVcsQ0FDWixDQUNGLENBQUM7b0JBQ0YsV0FBVyxFQUFFLENBQUM7aUJBQ2Y7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQy9CLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkIsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDOUMsR0FBRyxnQkFBZ0IsQ0FDcEIsQ0FDRixDQUNGLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O2tIQW5FVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgemlwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2Ntcy5tb2RlbCc7XG5pbXBvcnQgeyBQYWdlQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL3JvdXRpbmcvbW9kZWxzL3BhZ2UtY29udGV4dC5tb2RlbCc7XG5pbXBvcnQgeyBDbXNDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcvY21zLWNvbmZpZyc7XG5pbXBvcnQgeyBDbXNTdHJ1Y3R1cmVDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY21zLXN0cnVjdHVyZS1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnRBZGFwdGVyIH0gZnJvbSAnLi9jbXMtY29tcG9uZW50LmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ21zQ29tcG9uZW50Q29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNtc1N0cnVjdHVyZUNvbmZpZ1NlcnZpY2U6IENtc1N0cnVjdHVyZUNvbmZpZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNtc0NvbXBvbmVudEFkYXB0ZXI6IENtc0NvbXBvbmVudEFkYXB0ZXIsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQ21zQ29uZmlnXG4gICkge31cblxuICBnZXQ8VCBleHRlbmRzIENtc0NvbXBvbmVudD4oXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHRcbiAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuY21zU3RydWN0dXJlQ29uZmlnU2VydmljZVxuICAgICAgLmdldENvbXBvbmVudEZyb21Db25maWcoaWQpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjb25maWd1cmVkQ29tcG9uZW50KSA9PlxuICAgICAgICAgIGNvbmZpZ3VyZWRDb21wb25lbnRcbiAgICAgICAgICAgID8gb2YoY29uZmlndXJlZENvbXBvbmVudClcbiAgICAgICAgICAgIDogdGhpcy5jbXNDb21wb25lbnRBZGFwdGVyLmxvYWQoaWQsIHBhZ2VDb250ZXh0KVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZ2V0TGlzdChpZHM6IHN0cmluZ1tdLCBwYWdlQ29udGV4dDogUGFnZUNvbnRleHQpOiBPYnNlcnZhYmxlPENtc0NvbXBvbmVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuY21zU3RydWN0dXJlQ29uZmlnU2VydmljZS5nZXRDb21wb25lbnRzRnJvbUNvbmZpZyhpZHMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNvbmZpZ3VyZWRDb21wb25lbnRzKSA9PiB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIGhhdmUgc29tZSBjb21wb25lbnRzIHRoYXQgYXJlIG5vdCBsb2FkZWQgZnJvbSBjb25maWd1cmF0aW9uXG4gICAgICAgIGNvbnN0IG1pc3NpbmdJZHMgPSBjb25maWd1cmVkQ29tcG9uZW50cy5yZWR1Y2UoXG4gICAgICAgICAgKGFjYzogc3RyaW5nW10sIGNvbXBvbmVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBhY2MucHVzaChpZHNbaW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChtaXNzaW5nSWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBwYWdlU2l6ZSA9XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jb21wb25lbnRzTG9hZGluZz8ucGFnZVNpemUgfHwgbWlzc2luZ0lkcy5sZW5ndGg7XG4gICAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChtaXNzaW5nSWRzLmxlbmd0aCAvIHBhZ2VTaXplKTtcbiAgICAgICAgICBjb25zdCBjbXNDb21wb25lbnRzOiBPYnNlcnZhYmxlPENtc0NvbXBvbmVudFtdPltdID0gW107XG5cbiAgICAgICAgICBsZXQgY3VycmVudFBhZ2UgPSAwO1xuICAgICAgICAgIHdoaWxlIChjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgICAgIGNtc0NvbXBvbmVudHMucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5jbXNDb21wb25lbnRBZGFwdGVyLmZpbmRDb21wb25lbnRzQnlJZHMoXG4gICAgICAgICAgICAgICAgbWlzc2luZ0lkcy5zbGljZShcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlICogcGFnZVNpemUsXG4gICAgICAgICAgICAgICAgICAoY3VycmVudFBhZ2UgKyAxKSAqIHBhZ2VTaXplXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBwYWdlQ29udGV4dFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY3VycmVudFBhZ2UrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHppcCguLi5jbXNDb21wb25lbnRzKS5waXBlKFxuICAgICAgICAgICAgbWFwKChsb2FkZWRDb21wb25lbnRzKSA9PlxuICAgICAgICAgICAgICBbLi4uY29uZmlndXJlZENvbXBvbmVudHMuZmlsdGVyKEJvb2xlYW4pXS5jb25jYXQoXG4gICAgICAgICAgICAgICAgLi4ubG9hZGVkQ29tcG9uZW50c1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2YoY29uZmlndXJlZENvbXBvbmVudHMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==