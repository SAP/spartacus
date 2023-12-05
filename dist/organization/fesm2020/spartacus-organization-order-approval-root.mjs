import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { provideDefaultConfigFactory, provideDefaultConfig, AuthGuard } from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORGANIZATION_ORDER_APPROVAL_FEATURE = 'organizationOrderApproval';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultOrganizationOrderApprovalComponentsConfig() {
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
class OrderApprovalRootModule {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ORGANIZATION_ORDER_APPROVAL_FEATURE, OrderApprovalRootModule, defaultOrganizationOrderApprovalComponentsConfig };
//# sourceMappingURL=spartacus-organization-order-approval-root.mjs.map
