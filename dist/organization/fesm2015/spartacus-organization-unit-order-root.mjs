import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfigFactory, provideDefaultConfig, AuthGuard } from '@spartacus/core';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORGANIZATION_UNIT_ORDER_FEATURE = 'organizationUnitOrder';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function unitOrderFacadeFactory() {
    return facadeFactory({
        facade: UnitOrderFacade,
        feature: ORGANIZATION_UNIT_ORDER_FEATURE,
        methods: [
            'getOrderHistoryList',
            'getOrderHistoryListLoaded',
            'loadOrderList',
            'clearOrderList',
            'getOrderDetails',
            'loadOrderDetails',
            'clearOrderDetails',
        ],
        async: true,
    });
}
class UnitOrderFacade {
}
UnitOrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UnitOrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderFacade, providedIn: 'root', useFactory: unitOrderFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: unitOrderFacadeFactory,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const UnitOrderDetailsOrderEntriesContextToken = new InjectionToken('OrderDetailsOrderEntriesContext');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultOrganizationUnitOrderComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_UNIT_ORDER_FEATURE]: {
                cmsComponents: [
                    'UnitLevelOrderHistoryComponent',
                    'UnitLevelOrderDetailsOverviewComponent',
                    'UnitLevelOrderDetailsItemsComponent',
                    'UnitLevelOrderDetailsTotalsComponent',
                ],
                dependencies: [ORDER_FEATURE],
            },
        },
    };
    return config;
}
class UnitOrderRootModule {
}
UnitOrderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, imports: [i1.RouterModule] });
UnitOrderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, providers: [
        provideDefaultConfigFactory(defaultOrganizationUnitOrderComponentsConfig),
        provideDefaultConfig({
            routing: {
                routes: {
                    unitLevelOrders: {
                        paths: ['my-account/unitLevelOrders'],
                    },
                    unitLevelOrderDetail: {
                        paths: ['my-account/unitLevelOrderDetails/:orderCode'],
                        paramsMapping: { orderCode: 'code' },
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
                data: { cxRoute: 'unitLevelOrders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'unitLevelOrderDetail',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: UnitOrderDetailsOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'unitLevelOrders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'unitLevelOrderDetail',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: UnitOrderDetailsOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultOrganizationUnitOrderComponentsConfig),
                        provideDefaultConfig({
                            routing: {
                                routes: {
                                    unitLevelOrders: {
                                        paths: ['my-account/unitLevelOrders'],
                                    },
                                    unitLevelOrderDetail: {
                                        paths: ['my-account/unitLevelOrderDetails/:orderCode'],
                                        paramsMapping: { orderCode: 'code' },
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

export { ORGANIZATION_UNIT_ORDER_FEATURE, UnitOrderDetailsOrderEntriesContextToken, UnitOrderFacade, UnitOrderRootModule, defaultOrganizationUnitOrderComponentsConfig, unitOrderFacadeFactory };
//# sourceMappingURL=spartacus-organization-unit-order-root.mjs.map
