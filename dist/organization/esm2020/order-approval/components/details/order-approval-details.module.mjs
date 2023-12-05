/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard, ConfigModule, I18nModule, UrlModule, } from '@spartacus/core';
import { OrderDetailItemsComponent, OrderDetailsService, OrderDetailTotalsComponent, OrderOverviewComponent, } from '@spartacus/order/components';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { ApproverGuard } from '../../core/guards/approver.guard';
import { OrderApprovalDetailFormComponent } from './order-approval-detail-form/order-approval-detail-form.component';
import { OrderApprovalDetailService } from './order-approval-detail.service';
import { OrderDetailPermissionResultsComponent } from './order-detail-permission-results/order-detail-permission-results.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OrderApprovalDetailsModule {
}
OrderApprovalDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, declarations: [OrderApprovalDetailFormComponent,
        OrderDetailPermissionResultsComponent], imports: [ReactiveFormsModule,
        CommonModule,
        I18nModule,
        UrlModule,
        FormErrorsModule,
        SpinnerModule,
        RouterModule, i1.ConfigModule], exports: [OrderApprovalDetailFormComponent,
        OrderDetailPermissionResultsComponent] });
OrderApprovalDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, imports: [ReactiveFormsModule,
        CommonModule,
        I18nModule,
        UrlModule,
        FormErrorsModule,
        SpinnerModule,
        RouterModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrderApprovalDetailTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                OrderApprovalDetailApprovalDetailsComponent: {
                    component: OrderDetailPermissionResultsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                AccountOrderDetailsApprovalDetailsComponent: {
                    component: OrderDetailPermissionResultsComponent,
                },
                OrderApprovalDetailShippingComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                OrderApprovalDetailItemsComponent: {
                    component: OrderDetailItemsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderApprovalDetailService,
                        },
                    ],
                    guards: [AuthGuard, ApproverGuard],
                },
                OrderApprovalDetailFormComponent: {
                    component: OrderApprovalDetailFormComponent,
                    guards: [AuthGuard, ApproverGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        FormErrorsModule,
                        SpinnerModule,
                        RouterModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrderApprovalDetailTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                OrderApprovalDetailApprovalDetailsComponent: {
                                    component: OrderDetailPermissionResultsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                AccountOrderDetailsApprovalDetailsComponent: {
                                    component: OrderDetailPermissionResultsComponent,
                                },
                                OrderApprovalDetailShippingComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                OrderApprovalDetailItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderApprovalDetailService,
                                        },
                                    ],
                                    guards: [AuthGuard, ApproverGuard],
                                },
                                OrderApprovalDetailFormComponent: {
                                    component: OrderApprovalDetailFormComponent,
                                    guards: [AuthGuard, ApproverGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        OrderApprovalDetailFormComponent,
                        OrderDetailPermissionResultsComponent,
                    ],
                    exports: [
                        OrderApprovalDetailFormComponent,
                        OrderDetailPermissionResultsComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwtZGV0YWlscy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL2NvbXBvbmVudHMvZGV0YWlscy9vcmRlci1hcHByb3ZhbC1kZXRhaWxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLG1CQUFtQixFQUNuQiwwQkFBMEIsRUFDMUIsc0JBQXNCLEdBQ3ZCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNySCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQzs7O0FBd0VwSSxNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsaUJBUm5DLGdDQUFnQztRQUNoQyxxQ0FBcUMsYUE3RHJDLG1CQUFtQjtRQUNuQixZQUFZ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bkM7Z0NBQ0QsaUNBQWlDLEVBQUU7b0NBQ2pDLFNBQVMsRUFBRSx5QkFBeUI7b0NBQ3BDLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsbUJBQW1COzRDQUM1QixXQUFXLEVBQUUsMEJBQTBCO3lDQUN4QztxQ0FDRjtvQ0FDRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDO2lDQUNuQztnQ0FDRCxnQ0FBZ0MsRUFBRTtvQ0FDaEMsU0FBUyxFQUFFLGdDQUFnQztvQ0FDM0MsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztpQ0FDbkM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osZ0NBQWdDO3dCQUNoQyxxQ0FBcUM7cUJBQ3RDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQ0FBZ0M7d0JBQ2hDLHFDQUFxQztxQkFDdEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIENvbmZpZ01vZHVsZSxcbiAgSTE4bk1vZHVsZSxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCxcbiAgT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQsXG4gIE9yZGVyT3ZlcnZpZXdDb21wb25lbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzTW9kdWxlLCBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFwcHJvdmVyR3VhcmQgfSBmcm9tICcuLi8uLi9jb3JlL2d1YXJkcy9hcHByb3Zlci5ndWFyZCc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsRGV0YWlsRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItYXBwcm92YWwtZGV0YWlsLWZvcm0vb3JkZXItYXBwcm92YWwtZGV0YWlsLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyQXBwcm92YWxEZXRhaWxTZXJ2aWNlIH0gZnJvbSAnLi9vcmRlci1hcHByb3ZhbC1kZXRhaWwuc2VydmljZSc7XG5pbXBvcnQgeyBPcmRlckRldGFpbFBlcm1pc3Npb25SZXN1bHRzQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtcGVybWlzc2lvbi1yZXN1bHRzL29yZGVyLWRldGFpbC1wZXJtaXNzaW9uLXJlc3VsdHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIE9yZGVyQXBwcm92YWxEZXRhaWxUb3RhbHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsVG90YWxzQ29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogT3JkZXJBcHByb3ZhbERldGFpbFNlcnZpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkLCBBcHByb3Zlckd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgT3JkZXJBcHByb3ZhbERldGFpbEFwcHJvdmFsRGV0YWlsc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJEZXRhaWxQZXJtaXNzaW9uUmVzdWx0c0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyQXBwcm92YWxEZXRhaWxTZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZCwgQXBwcm92ZXJHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNBcHByb3ZhbERldGFpbHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsUGVybWlzc2lvblJlc3VsdHNDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICAgIE9yZGVyQXBwcm92YWxEZXRhaWxTaGlwcGluZ0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJPdmVydmlld0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyQXBwcm92YWxEZXRhaWxTZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZCwgQXBwcm92ZXJHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIE9yZGVyQXBwcm92YWxEZXRhaWxJdGVtc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyQXBwcm92YWxEZXRhaWxTZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZCwgQXBwcm92ZXJHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIE9yZGVyQXBwcm92YWxEZXRhaWxGb3JtQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckFwcHJvdmFsRGV0YWlsRm9ybUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIEFwcHJvdmVyR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgT3JkZXJBcHByb3ZhbERldGFpbEZvcm1Db21wb25lbnQsXG4gICAgT3JkZXJEZXRhaWxQZXJtaXNzaW9uUmVzdWx0c0NvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE9yZGVyQXBwcm92YWxEZXRhaWxGb3JtQ29tcG9uZW50LFxuICAgIE9yZGVyRGV0YWlsUGVybWlzc2lvblJlc3VsdHNDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQXBwcm92YWxEZXRhaWxzTW9kdWxlIHt9XG4iXX0=