import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { ASM_CUSTOMER_360_NORMALIZER, AsmCustomer360Adapter } from '@spartacus/asm/customer-360/core';
import * as i2 from '@spartacus/core';
import { InterceptorUtil, USE_CUSTOMER_SUPPORT_AGENT_TOKEN, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccAsmCustomer360Adapter {
    constructor(http, occEndpointsService, converterService, baseSiteService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
        this.baseSiteService = baseSiteService;
        this.baseSiteService
            .getActive()
            .subscribe((value) => (this.activeBaseSite = value));
    }
    getHeaders() {
        return InterceptorUtil.createHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, true, new HttpHeaders());
    }
    getAsmCustomer360Data(request) {
        const headers = InterceptorUtil.createHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, true, new HttpHeaders());
        const url = this.occEndpointsService.buildUrl('asmCustomer360', {
            urlParams: {
                baseSiteId: this.activeBaseSite,
                userId: request.options.userId ?? '',
            },
        }, {
            baseSite: false,
            prefix: false,
        });
        const requestBody = {
            customer360Queries: request.queries,
        };
        return this.http
            .post(url, requestBody, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converterService.pipeable(ASM_CUSTOMER_360_NORMALIZER));
    }
}
OccAsmCustomer360Adapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAsmCustomer360Adapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }, { token: i2.BaseSiteService }], target: i0.ɵɵFactoryTarget.Injectable });
OccAsmCustomer360Adapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAsmCustomer360Adapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAsmCustomer360Adapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }, { type: i2.BaseSiteService }]; } });

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
const defaultOccAsmCustomer360Config = {
    backend: {
        occ: {
            endpoints: {
                asmCustomer360: '/assistedservicewebservices/${baseSiteId}/users/${userId}/customer360',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360OccModule {
}
AsmCustomer360OccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360OccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, imports: [CommonModule] });
AsmCustomer360OccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, providers: [
        provideDefaultConfig(defaultOccAsmCustomer360Config),
        {
            provide: AsmCustomer360Adapter,
            useClass: OccAsmCustomer360Adapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccAsmCustomer360Config),
                        {
                            provide: AsmCustomer360Adapter,
                            useClass: OccAsmCustomer360Adapter,
                        },
                    ],
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AsmCustomer360OccModule, OccAsmCustomer360Adapter };
//# sourceMappingURL=spartacus-asm-customer-360-occ.mjs.map
