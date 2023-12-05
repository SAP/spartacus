/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { defaultCmsModuleConfig, defaultUserCmsModuleConfig, } from './config/default-cms-config';
import { CmsService } from './facade/cms.service';
import { PageMetaModule } from './page/page-meta.module';
import { CmsStoreModule } from './store/cms-store.module';
import { ConfigChunk, provideDefaultConfigFactory } from '../config';
import { USER_CMS_ENDPOINTS } from '../model';
import * as i0 from "@angular/core";
import * as i1 from "./page/page-meta.module";
function getDefaultCmsConfig(configChunk) {
    let isUserCmsEndpoint = false;
    configChunk.find((config) => {
        const userCmsEndpoints = config.features?.[USER_CMS_ENDPOINTS];
        if (Boolean(userCmsEndpoints)) {
            isUserCmsEndpoint = userCmsEndpoints;
        }
    });
    if (isUserCmsEndpoint) {
        return defaultUserCmsModuleConfig;
    }
    return defaultCmsModuleConfig;
}
export class CmsModule {
    static forRoot() {
        return {
            ngModule: CmsModule,
            providers: [
                CmsService,
                // TODO: (CXSPA-4886) In the major change to provideDefaultConfig(defaultCmsModuleConfig)
                provideDefaultConfigFactory(getDefaultCmsConfig, [ConfigChunk]),
            ],
        };
    }
}
CmsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CmsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CmsModule, imports: [CmsStoreModule, i1.PageMetaModule] });
CmsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsModule, imports: [CmsStoreModule, PageMetaModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CmsStoreModule, PageMetaModule.forRoot()],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Ntcy9jbXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLDBCQUEwQixHQUMzQixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7QUFFOUMsU0FBUyxtQkFBbUIsQ0FBQyxXQUFnQjtJQUMzQyxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUU5QixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7UUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUUvRCxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzdCLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1NBQ3RDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLGlCQUFpQixFQUFFO1FBQ3JCLE9BQU8sMEJBQTBCLENBQUM7S0FDbkM7SUFDRCxPQUFPLHNCQUFzQixDQUFDO0FBQ2hDLENBQUM7QUFLRCxNQUFNLE9BQU8sU0FBUztJQUNwQixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1QsVUFBVTtnQkFDVix5RkFBeUY7Z0JBQ3pGLDJCQUEyQixDQUFDLG1CQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7c0dBVlUsU0FBUzt1R0FBVCxTQUFTLFlBRlYsY0FBYzt1R0FFYixTQUFTLFlBRlYsY0FBYyxFQUFFLGNBQWMsQ0FBQyxPQUFPLEVBQUU7MkZBRXZDLFNBQVM7a0JBSHJCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDcEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZGVmYXVsdENtc01vZHVsZUNvbmZpZyxcbiAgZGVmYXVsdFVzZXJDbXNNb2R1bGVDb25maWcsXG59IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtY21zLWNvbmZpZyc7XG5pbXBvcnQgeyBDbXNTZXJ2aWNlIH0gZnJvbSAnLi9mYWNhZGUvY21zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZU1ldGFNb2R1bGUgfSBmcm9tICcuL3BhZ2UvcGFnZS1tZXRhLm1vZHVsZSc7XG5pbXBvcnQgeyBDbXNTdG9yZU1vZHVsZSB9IGZyb20gJy4vc3RvcmUvY21zLXN0b3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWdDaHVuaywgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5IH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7IFVTRVJfQ01TX0VORFBPSU5UUyB9IGZyb20gJy4uL21vZGVsJztcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdENtc0NvbmZpZyhjb25maWdDaHVuazogYW55KSB7XG4gIGxldCBpc1VzZXJDbXNFbmRwb2ludCA9IGZhbHNlO1xuXG4gIGNvbmZpZ0NodW5rLmZpbmQoKGNvbmZpZzogYW55KSA9PiB7XG4gICAgY29uc3QgdXNlckNtc0VuZHBvaW50cyA9IGNvbmZpZy5mZWF0dXJlcz8uW1VTRVJfQ01TX0VORFBPSU5UU107XG5cbiAgICBpZiAoQm9vbGVhbih1c2VyQ21zRW5kcG9pbnRzKSkge1xuICAgICAgaXNVc2VyQ21zRW5kcG9pbnQgPSB1c2VyQ21zRW5kcG9pbnRzO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGlzVXNlckNtc0VuZHBvaW50KSB7XG4gICAgcmV0dXJuIGRlZmF1bHRVc2VyQ21zTW9kdWxlQ29uZmlnO1xuICB9XG4gIHJldHVybiBkZWZhdWx0Q21zTW9kdWxlQ29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ21zU3RvcmVNb2R1bGUsIFBhZ2VNZXRhTW9kdWxlLmZvclJvb3QoKV0sXG59KVxuZXhwb3J0IGNsYXNzIENtc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q21zTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDbXNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ21zU2VydmljZSxcbiAgICAgICAgLy8gVE9ETzogKENYU1BBLTQ4ODYpIEluIHRoZSBtYWpvciBjaGFuZ2UgdG8gcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENtc01vZHVsZUNvbmZpZylcbiAgICAgICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGdldERlZmF1bHRDbXNDb25maWcsIFtDb25maWdDaHVua10pLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=