/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, ConfigModule, I18nModule, UrlModule, } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { ApproverGuard } from '../../core/guards/approver.guard';
import { OrderApprovalListComponent } from './order-approval-list.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OrderApprovalListModule {
}
OrderApprovalListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, declarations: [OrderApprovalListComponent], imports: [CommonModule, i1.ConfigModule, UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule], exports: [OrderApprovalListComponent] });
OrderApprovalListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, imports: [CommonModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrderApprovalListComponent: {
                    component: OrderApprovalListComponent,
                    guards: [AuthGuard, ApproverGuard],
                },
            },
        }),
        UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrderApprovalListComponent: {
                                    component: OrderApprovalListComponent,
                                    guards: [AuthGuard, ApproverGuard],
                                },
                            },
                        }),
                        UrlModule,
                        RouterModule,
                        ListNavigationModule,
                        I18nModule,
                    ],
                    declarations: [OrderApprovalListComponent],
                    exports: [OrderApprovalListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwtbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL2NvbXBvbmVudHMvbGlzdC9vcmRlci1hcHByb3ZhbC1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7OztBQXFCN0UsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLGlCQUhuQiwwQkFBMEIsYUFkdkMsWUFBWSxtQkFTWixTQUFTO1FBQ1QsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixVQUFVLGFBR0YsMEJBQTBCO3FIQUV6Qix1QkFBdUIsWUFqQmhDLFlBQVk7UUFDWixZQUFZLENBQUMsVUFBVSxDQUFZO1lBQ2pDLGFBQWEsRUFBRTtnQkFDYiwwQkFBMEIsRUFBRTtvQkFDMUIsU0FBUyxFQUFFLDBCQUEwQjtvQkFDckMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztpQkFDbkM7YUFDRjtTQUNGLENBQUM7UUFDRixTQUFTO1FBQ1QsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixVQUFVOzJGQUtELHVCQUF1QjtrQkFuQm5DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWSxDQUFDLFVBQVUsQ0FBWTs0QkFDakMsYUFBYSxFQUFFO2dDQUNiLDBCQUEwQixFQUFFO29DQUMxQixTQUFTLEVBQUUsMEJBQTBCO29DQUNyQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDO2lDQUNuQzs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExpc3ROYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFwcHJvdmVyR3VhcmQgfSBmcm9tICcuLi8uLi9jb3JlL2d1YXJkcy9hcHByb3Zlci5ndWFyZCc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsTGlzdENvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItYXBwcm92YWwtbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS53aXRoQ29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBPcmRlckFwcHJvdmFsTGlzdENvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJBcHByb3ZhbExpc3RDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkLCBBcHByb3Zlckd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgVXJsTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBMaXN0TmF2aWdhdGlvbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtPcmRlckFwcHJvdmFsTGlzdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtPcmRlckFwcHJvdmFsTGlzdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQXBwcm92YWxMaXN0TW9kdWxlIHt9XG4iXX0=