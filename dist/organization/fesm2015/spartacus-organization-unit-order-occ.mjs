import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { ORDER_HISTORY_NORMALIZER, ORDER_NORMALIZER } from '@spartacus/order/root';
import * as i1 from '@angular/common/http';
import * as i2 from '@spartacus/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { UnitOrderAdapter } from '@spartacus/organization/unit-order/core';
import { OccOrderNormalizer } from '@spartacus/order/occ';

class OccUnitOrderAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    loadUnitOrderHistory(userId, pageSize, currentPage, filters, sort) {
        const params = {};
        if (pageSize) {
            params['pageSize'] = pageSize.toString();
        }
        if (currentPage) {
            params['currentPage'] = currentPage.toString();
        }
        if (filters) {
            params['filters'] = filters.toString();
        }
        if (sort) {
            params['sort'] = sort.toString();
        }
        const url = this.occEndpoints.buildUrl('unitLevelOrderHistory', {
            urlParams: { userId },
            queryParams: params,
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
    }
    loadUnitOrderDetail(userId, orderCode) {
        const url = this.occEndpoints.buildUrl('unitLevelOrderDetail', {
            urlParams: { userId, orderId: orderCode },
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(ORDER_NORMALIZER));
    }
}
OccUnitOrderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUnitOrderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUnitOrderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUnitOrderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUnitOrderAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccUnitOrderConfig = {
    backend: {
        occ: {
            endpoints: {
                unitLevelOrderHistory: `/orgUsers/\${userId}/orgUnits/orders`,
                unitLevelOrderDetail: `orgUsers/\${userId}/orgUnits/orders/\${orderId}?fields=FULL`,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitOrderOccModule {
}
UnitOrderOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, imports: [CommonModule] });
UnitOrderOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, providers: [
        provideDefaultConfig(defaultOccUnitOrderConfig),
        { provide: UnitOrderAdapter, useClass: OccUnitOrderAdapter },
        {
            provide: ORDER_NORMALIZER,
            useExisting: OccOrderNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccUnitOrderConfig),
                        { provide: UnitOrderAdapter, useClass: OccUnitOrderAdapter },
                        {
                            provide: ORDER_NORMALIZER,
                            useExisting: OccOrderNormalizer,
                            multi: true,
                        },
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

export { OccUnitOrderAdapter, UnitOrderOccModule };
//# sourceMappingURL=spartacus-organization-unit-order-occ.mjs.map
