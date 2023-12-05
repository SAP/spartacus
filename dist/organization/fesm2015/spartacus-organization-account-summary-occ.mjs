import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { ACCOUNT_SUMMARY_NORMALIZER, ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER, AccountSummaryAdapter } from '@spartacus/organization/account-summary/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i1 from '@angular/common/http';

class OccAccountSummaryAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    getAccountSummary(userId, orgUnitId) {
        return this.http
            .get(this.buildAccountSummaryUrl(userId, orgUnitId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(ACCOUNT_SUMMARY_NORMALIZER));
    }
    getDocumentList(userId, orgUnitId, params) {
        return this.http
            .get(this.buildDocumentListUrl(userId, orgUnitId, params))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER));
    }
    getDocumentAttachment(userId, orgUnitId, orgDocumentId, orgDocumentAttachmentId) {
        const options = {
            responseType: 'blob',
        };
        return this.http
            .get(this.buildDocumentAttachmentUrl(userId, orgUnitId, orgDocumentId, orgDocumentAttachmentId), options)
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    buildAccountSummaryUrl(userId, orgUnitId) {
        return this.occEndpoints.buildUrl('accountSummary', {
            urlParams: { userId, orgUnitId },
        });
    }
    buildDocumentListUrl(userId, orgUnitId, queryParams) {
        return this.occEndpoints.buildUrl('accountSummaryDocument', {
            urlParams: { userId, orgUnitId },
            queryParams,
        });
    }
    buildDocumentAttachmentUrl(userId, orgUnitId, orgDocumentId, orgDocumentAttachmentId) {
        return this.occEndpoints.buildUrl('accountSummaryDocumentAttachment', {
            urlParams: { userId, orgUnitId, orgDocumentId, orgDocumentAttachmentId },
        });
    }
}
OccAccountSummaryAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAccountSummaryAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccAccountSummaryAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAccountSummaryAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAccountSummaryAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const accountSummaryHeaderOccEndpoints = {
    accountSummary: 'users/${userId}/orgUnits/${orgUnitId}/accountSummary',
    accountSummaryDocument: 'users/${userId}/orgUnits/${orgUnitId}/orgDocuments',
    accountSummaryDocumentAttachment: 'users/${userId}/orgUnits/${orgUnitId}/orgDocuments/${orgDocumentId}/attachments/${orgDocumentAttachmentId}',
};
const defaultOccAccountSummaryConfig = {
    backend: {
        occ: {
            endpoints: Object.assign({}, accountSummaryHeaderOccEndpoints),
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryOccModule {
}
AccountSummaryOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule });
AccountSummaryOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule, providers: [
        provideDefaultConfig(defaultOccAccountSummaryConfig),
        { provide: AccountSummaryAdapter, useClass: OccAccountSummaryAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccAccountSummaryConfig),
                        { provide: AccountSummaryAdapter, useClass: OccAccountSummaryAdapter },
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

export { AccountSummaryOccModule, OccAccountSummaryAdapter };
//# sourceMappingURL=spartacus-organization-account-summary-occ.mjs.map
