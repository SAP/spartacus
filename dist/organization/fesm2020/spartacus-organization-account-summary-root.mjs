import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { WindowRef, provideDefaultConfig, provideDefaultConfigFactory, facadeFactory } from '@spartacus/core';
import { FileReaderService, CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const listPath = `organization/account-summary`;
const defaultAccountSummaryRoutingConfig = {
    routing: {
        routes: {
            orgAccountSummary: {
                paths: [`${listPath}`],
            },
            orgAccountSummaryDetails: {
                paths: [`${listPath}/details/:orgUnit`],
                paramsMapping: { orgUnit: 'uid' },
            },
        },
    },
};

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
const ORGANIZATION_ACCOUNT_SUMMARY_FEATURE = 'organizationAccountSummary';
const ORGANIZATION_ACCOUNT_SUMMARY_CORE_FEATURE = 'organizationAccountSummaryCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BlobErrorInterceptor {
    constructor() {
        this.fileReaderService = inject(FileReaderService);
        this.windowRef = inject(WindowRef);
    }
    intercept(request, next) {
        return next.handle(request).pipe(catchError((errResponse) => {
            if (this.windowRef.isBrowser() &&
                errResponse instanceof HttpErrorResponse &&
                errResponse.error instanceof Blob &&
                errResponse.error.type === 'application/json') {
                return this.fileReaderService
                    .loadTextFile(errResponse.error)
                    .pipe(switchMap((errorString) => {
                    const error = JSON.parse(errorString);
                    return throwError(new HttpErrorResponse({
                        ...errResponse,
                        error,
                        url: errResponse.url ?? undefined,
                    }));
                }));
            }
            else {
                return throwError(errResponse);
            }
        }));
    }
}
BlobErrorInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlobErrorInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BlobErrorInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlobErrorInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlobErrorInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultAccountSummaryComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_ACCOUNT_SUMMARY_FEATURE]: {
                cmsComponents: [
                    'ManageAccountSummaryListComponent',
                    'AccountSummaryHeaderComponent',
                    'AccountSummaryDocumentComponent',
                ],
            },
        },
    };
    return config;
}
class AccountSummaryRootModule {
}
AccountSummaryRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, imports: [i1.RouterModule] });
AccountSummaryRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, providers: [
        provideDefaultConfig(defaultAccountSummaryRoutingConfig),
        provideDefaultConfigFactory(defaultAccountSummaryComponentsConfig),
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: BlobErrorInterceptor,
            multi: true,
        },
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orgAccountSummaryDetails' },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orgAccountSummaryDetails' },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfig(defaultAccountSummaryRoutingConfig),
                        provideDefaultConfigFactory(defaultAccountSummaryComponentsConfig),
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: BlobErrorInterceptor,
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
class AccountSummaryFacade {
}
AccountSummaryFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AccountSummaryFacade,
        feature: ORGANIZATION_ACCOUNT_SUMMARY_FEATURE,
        methods: [
            'getAccountSummary',
            'getDocumentList',
            'getDocumentAttachment',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AccountSummaryFacade,
                        feature: ORGANIZATION_ACCOUNT_SUMMARY_FEATURE,
                        methods: [
                            'getAccountSummary',
                            'getDocumentList',
                            'getDocumentAttachment',
                        ],
                    }),
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
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["ALL"] = "all";
    DocumentStatus["OPEN"] = "open";
    DocumentStatus["CLOSED"] = "closed";
})(DocumentStatus || (DocumentStatus = {}));
var DocumentFields;
(function (DocumentFields) {
    DocumentFields["BASIC"] = "BASIC";
    DocumentFields["DEFAULT"] = "DEFAULT";
    DocumentFields["FULL"] = "FULL";
})(DocumentFields || (DocumentFields = {}));
var FilterByOptions;
(function (FilterByOptions) {
    FilterByOptions["DOCUMENT_NUMBER"] = "orgDocumentId";
    FilterByOptions["DOCUMENT_NUMBER_RANGE"] = "orgDocumentIdRange";
    FilterByOptions["DOCUMENT_TYPE"] = "orgDocumentType";
    FilterByOptions["DATE_RANGE"] = "createdAtDateRange";
    FilterByOptions["DUE_DATE_RANGE"] = "dueAtDateRange";
    FilterByOptions["AMOUNT_RANGE"] = "amountRange";
    FilterByOptions["OPEN_AMOUNT_RANGE"] = "openAmountRange";
})(FilterByOptions || (FilterByOptions = {}));

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

export { AccountSummaryFacade, AccountSummaryRootModule, BlobErrorInterceptor, DocumentFields, DocumentStatus, FilterByOptions, ORGANIZATION_ACCOUNT_SUMMARY_CORE_FEATURE, ORGANIZATION_ACCOUNT_SUMMARY_FEATURE, defaultAccountSummaryComponentsConfig, defaultAccountSummaryRoutingConfig };
//# sourceMappingURL=spartacus-organization-account-summary-root.mjs.map
