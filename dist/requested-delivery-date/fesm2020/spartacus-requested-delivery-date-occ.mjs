import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { InterceptorUtil, USE_CLIENT_TOKEN, provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { RequestedDeliveryDateAdapter } from '@spartacus/requested-delivery-date/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccRequestedDeliveryDateAdapter {
    constructor(http, occEndpoints) {
        this.http = http;
        this.occEndpoints = occEndpoints;
    }
    setRequestedDeliveryDate(userId, cartId, requestedRetrievalAt) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        const url = this.occEndpoints.buildUrl('requestedDeliveryDate', {
            urlParams: {
                userId,
                cartId,
            },
            queryParams: { requestedRetrievalAt },
        });
        return this.http.put(url, { headers });
    }
}
OccRequestedDeliveryDateAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestedDeliveryDateAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccRequestedDeliveryDateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestedDeliveryDateAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestedDeliveryDateAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccRequestedDeliveryDateConfig = {
    backend: {
        occ: {
            endpoints: {
                requestedDeliveryDate: 'users/${userId}/carts/${cartId}/requestedretrievaldate',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RequestedDeliveryDateOccModule {
}
RequestedDeliveryDateOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, imports: [CommonModule] });
RequestedDeliveryDateOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, providers: [
        provideDefaultConfig(defaultOccRequestedDeliveryDateConfig),
        {
            provide: RequestedDeliveryDateAdapter,
            useClass: OccRequestedDeliveryDateAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccRequestedDeliveryDateConfig),
                        {
                            provide: RequestedDeliveryDateAdapter,
                            useClass: OccRequestedDeliveryDateAdapter,
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

export { OccRequestedDeliveryDateAdapter, RequestedDeliveryDateOccModule };
//# sourceMappingURL=spartacus-requested-delivery-date-occ.mjs.map
