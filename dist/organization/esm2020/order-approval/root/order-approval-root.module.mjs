/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { ORGANIZATION_ORDER_APPROVAL_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationOrderApprovalComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_ORDER_APPROVAL_FEATURE]: {
                cmsComponents: [
                    'OrderApprovalListComponent',
                    'OrderApprovalDetailTotalsComponent',
                    'OrderApprovalDetailApprovalDetailsComponent',
                    'OrderApprovalDetailShippingComponent',
                    'OrderApprovalDetailItemsComponent',
                    'OrderApprovalDetailFormComponent',
                    'AccountOrderDetailsApprovalDetailsComponent',
                ],
                dependencies: [ORDER_FEATURE],
            },
        },
    };
    return config;
}
export class OrderApprovalRootModule {
}
OrderApprovalRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderApprovalRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalRootModule, imports: [i1.RouterModule] });
OrderApprovalRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalRootModule, providers: [
        provideDefaultConfigFactory(defaultOrganizationOrderApprovalComponentsConfig),
        provideDefaultConfig({
            routing: {
                routes: {
                    orderApprovals: {
                        paths: ['my-account/approval-dashboard'],
                    },
                    orderApprovalDetails: {
                        paths: ['my-account/approval/:approvalCode'],
                    },
                },
            },
        }),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderApprovalDetails' },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderApprovalDetails' },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultOrganizationOrderApprovalComponentsConfig),
                        provideDefaultConfig({
                            routing: {
                                routes: {
                                    orderApprovals: {
                                        paths: ['my-account/approval-dashboard'],
                                    },
                                    orderApprovalDetails: {
                                        paths: ['my-account/approval/:approvalCode'],
                                    },
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwtcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL3Jvb3Qvb3JkZXItYXBwcm92YWwtcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxTQUFTLEVBRVQsb0JBQW9CLEVBQ3BCLDJCQUEyQixHQUU1QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVyRSwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLGdEQUFnRDtJQUM5RCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLG1DQUFtQyxDQUFDLEVBQUU7Z0JBQ3JDLGFBQWEsRUFBRTtvQkFDYiw0QkFBNEI7b0JBQzVCLG9DQUFvQztvQkFDcEMsNkNBQTZDO29CQUM3QyxzQ0FBc0M7b0JBQ3RDLG1DQUFtQztvQkFDbkMsa0NBQWtDO29CQUNsQyw2Q0FBNkM7aUJBQzlDO2dCQUNELFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQzthQUM5QjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFnQ0QsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCO3FIQUF2Qix1QkFBdUIsYUFsQnZCO1FBQ1QsMkJBQTJCLENBQ3pCLGdEQUFnRCxDQUNqRDtRQUNELG9CQUFvQixDQUFnQjtZQUNsQyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFO29CQUNOLGNBQWMsRUFBRTt3QkFDZCxLQUFLLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztxQkFDekM7b0JBQ0Qsb0JBQW9CLEVBQUU7d0JBQ3BCLEtBQUssRUFBRSxDQUFDLG1DQUFtQyxDQUFDO3FCQUM3QztpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBMUJDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dCQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUU7YUFDMUM7U0FDRixDQUFDOzJGQW9CTyx1QkFBdUI7a0JBOUJuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs2QkFDMUM7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsMkJBQTJCLENBQ3pCLGdEQUFnRCxDQUNqRDt3QkFDRCxvQkFBb0IsQ0FBZ0I7NEJBQ2xDLE9BQU8sRUFBRTtnQ0FDUCxNQUFNLEVBQUU7b0NBQ04sY0FBYyxFQUFFO3dDQUNkLEtBQUssRUFBRSxDQUFDLCtCQUErQixDQUFDO3FDQUN6QztvQ0FDRCxvQkFBb0IsRUFBRTt3Q0FDcEIsS0FBSyxFQUFFLENBQUMsbUNBQW1DLENBQUM7cUNBQzdDO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxuICBSb3V0aW5nQ29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT1JERVJfRkVBVFVSRSB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQsIFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT1JHQU5JWkFUSU9OX09SREVSX0FQUFJPVkFMX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5cbi8vIFRPRE86IElubGluZSB0aGlzIGZhY3Rvcnkgd2hlbiB3ZSBzdGFydCByZWxlYXNpbmcgSXZ5IGNvbXBpbGVkIGxpYnJhcmllc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRPcmdhbml6YXRpb25PcmRlckFwcHJvdmFsQ29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW09SR0FOSVpBVElPTl9PUkRFUl9BUFBST1ZBTF9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbXG4gICAgICAgICAgJ09yZGVyQXBwcm92YWxMaXN0Q29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJBcHByb3ZhbERldGFpbFRvdGFsc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ09yZGVyQXBwcm92YWxEZXRhaWxBcHByb3ZhbERldGFpbHNDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckFwcHJvdmFsRGV0YWlsU2hpcHBpbmdDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckFwcHJvdmFsRGV0YWlsSXRlbXNDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckFwcHJvdmFsRGV0YWlsRm9ybUNvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNBcHByb3ZhbERldGFpbHNDb21wb25lbnQnLFxuICAgICAgICBdLFxuICAgICAgICBkZXBlbmRlbmNpZXM6IFtPUkRFUl9GRUFUVVJFXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFtcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmRlckFwcHJvdmFsRGV0YWlscycgfSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShcbiAgICAgIGRlZmF1bHRPcmdhbml6YXRpb25PcmRlckFwcHJvdmFsQ29tcG9uZW50c0NvbmZpZ1xuICAgICksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPFJvdXRpbmdDb25maWc+e1xuICAgICAgcm91dGluZzoge1xuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBvcmRlckFwcHJvdmFsczoge1xuICAgICAgICAgICAgcGF0aHM6IFsnbXktYWNjb3VudC9hcHByb3ZhbC1kYXNoYm9hcmQnXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyQXBwcm92YWxEZXRhaWxzOiB7XG4gICAgICAgICAgICBwYXRoczogWydteS1hY2NvdW50L2FwcHJvdmFsLzphcHByb3ZhbENvZGUnXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJBcHByb3ZhbFJvb3RNb2R1bGUge31cbiJdfQ==