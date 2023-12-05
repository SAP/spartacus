/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { B2BUserConnector } from './connectors/b2b-user/b2b-user.connector';
import { BudgetConnector } from './connectors/budget/budget.connector';
import { CostCenterConnector } from './connectors/cost-center/cost-center.connector';
import { OrgUnitConnector } from './connectors/org-unit/org-unit.connector';
import { PermissionConnector } from './connectors/permission/permission.connector';
import { UserGroupConnector } from './connectors/user-group/user-group.connector';
import { OrganizationsGuardsModule } from './guards/organization-guards.module';
import { OrganizationBadRequestHandler } from './http-interceptors/bad-request/bad-request.handler';
import { OrganizationConflictHandler } from './http-interceptors/conflict/conflict.handler';
import { OrganizationPageMetaModule } from './services/organization-page-meta.module';
import { OrganizationStoreModule } from './store/organization-store.module';
import * as i0 from "@angular/core";
export class AdministrationCoreModule {
    static forRoot() {
        return {
            ngModule: AdministrationCoreModule,
            providers: [
                BudgetConnector,
                OrgUnitConnector,
                UserGroupConnector,
                PermissionConnector,
                CostCenterConnector,
                B2BUserConnector,
            ],
        };
    }
}
AdministrationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AdministrationCoreModule, imports: [OrganizationPageMetaModule,
        OrganizationStoreModule,
        OrganizationsGuardsModule] });
AdministrationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationCoreModule, providers: [
        {
            provide: HttpErrorHandler,
            useExisting: OrganizationConflictHandler,
            multi: true,
        },
        {
            provide: HttpErrorHandler,
            useExisting: OrganizationBadRequestHandler,
            multi: true,
        },
    ], imports: [OrganizationPageMetaModule,
        OrganizationStoreModule,
        OrganizationsGuardsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OrganizationPageMetaModule,
                        OrganizationStoreModule,
                        OrganizationsGuardsModule,
                    ],
                    providers: [
                        {
                            provide: HttpErrorHandler,
                            useExisting: OrganizationConflictHandler,
                            multi: true,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: OrganizationBadRequestHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRpb24tY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvYWRtaW5pc3RyYXRpb24tY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFxQjVFLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZixnQkFBZ0I7Z0JBQ2hCLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixtQkFBbUI7Z0JBQ25CLGdCQUFnQjthQUNqQjtTQUNGLENBQUM7SUFDSixDQUFDOztxSEFiVSx3QkFBd0I7c0hBQXhCLHdCQUF3QixZQWpCakMsMEJBQTBCO1FBQzFCLHVCQUF1QjtRQUN2Qix5QkFBeUI7c0hBZWhCLHdCQUF3QixhQWJ4QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFmQywwQkFBMEI7UUFDMUIsdUJBQXVCO1FBQ3ZCLHlCQUF5QjsyRkFlaEIsd0JBQXdCO2tCQW5CcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsMEJBQTBCO3dCQUMxQix1QkFBdUI7d0JBQ3ZCLHlCQUF5QjtxQkFDMUI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSwyQkFBMkI7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSw2QkFBNkI7NEJBQzFDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlckNvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9iMmItdXNlci9iMmItdXNlci5jb25uZWN0b3InO1xuaW1wb3J0IHsgQnVkZ2V0Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL2J1ZGdldC9idWRnZXQuY29ubmVjdG9yJztcbmltcG9ydCB7IENvc3RDZW50ZXJDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY29zdC1jZW50ZXIvY29zdC1jZW50ZXIuY29ubmVjdG9yJztcbmltcG9ydCB7IE9yZ1VuaXRDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvb3JnLXVuaXQvb3JnLXVuaXQuY29ubmVjdG9yJztcbmltcG9ydCB7IFBlcm1pc3Npb25Db25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvcGVybWlzc2lvbi9wZXJtaXNzaW9uLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBVc2VyR3JvdXBDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvdXNlci1ncm91cC91c2VyLWdyb3VwLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25zR3VhcmRzTW9kdWxlIH0gZnJvbSAnLi9ndWFyZHMvb3JnYW5pemF0aW9uLWd1YXJkcy5tb2R1bGUnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uQmFkUmVxdWVzdEhhbmRsZXIgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2JhZC1yZXF1ZXN0L2JhZC1yZXF1ZXN0LmhhbmRsZXInO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uQ29uZmxpY3RIYW5kbGVyIH0gZnJvbSAnLi9odHRwLWludGVyY2VwdG9ycy9jb25mbGljdC9jb25mbGljdC5oYW5kbGVyJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblBhZ2VNZXRhTW9kdWxlIH0gZnJvbSAnLi9zZXJ2aWNlcy9vcmdhbml6YXRpb24tcGFnZS1tZXRhLm1vZHVsZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25TdG9yZU1vZHVsZSB9IGZyb20gJy4vc3RvcmUvb3JnYW5pemF0aW9uLXN0b3JlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBPcmdhbml6YXRpb25QYWdlTWV0YU1vZHVsZSxcbiAgICBPcmdhbml6YXRpb25TdG9yZU1vZHVsZSxcbiAgICBPcmdhbml6YXRpb25zR3VhcmRzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBIdHRwRXJyb3JIYW5kbGVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9yZ2FuaXphdGlvbkNvbmZsaWN0SGFuZGxlcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogSHR0cEVycm9ySGFuZGxlcixcbiAgICAgIHVzZUV4aXN0aW5nOiBPcmdhbml6YXRpb25CYWRSZXF1ZXN0SGFuZGxlcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluaXN0cmF0aW9uQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWRtaW5pc3RyYXRpb25Db3JlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBZG1pbmlzdHJhdGlvbkNvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQnVkZ2V0Q29ubmVjdG9yLFxuICAgICAgICBPcmdVbml0Q29ubmVjdG9yLFxuICAgICAgICBVc2VyR3JvdXBDb25uZWN0b3IsXG4gICAgICAgIFBlcm1pc3Npb25Db25uZWN0b3IsXG4gICAgICAgIENvc3RDZW50ZXJDb25uZWN0b3IsXG4gICAgICAgIEIyQlVzZXJDb25uZWN0b3IsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==