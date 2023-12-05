import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { Subscription, defer, combineLatest } from 'rxjs';
import { shareReplay, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as i1 from '@spartacus/core';
import { PageMetaResolver } from '@spartacus/core';
import { OrganizationPageMetaResolver } from '@spartacus/organization/administration/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryConnector {
    constructor(accountSummaryAdapter) {
        this.accountSummaryAdapter = accountSummaryAdapter;
    }
    getAccountSummary(userId, orgUnitId) {
        return this.accountSummaryAdapter.getAccountSummary(userId, orgUnitId);
    }
    getDocumentList(userId, orgUnitId, params) {
        return this.accountSummaryAdapter.getDocumentList(userId, orgUnitId, params);
    }
    getDocumentAttachment(userId, orgUnitId, orgDocumentId, orgDocumentAttachmentId) {
        return this.accountSummaryAdapter.getDocumentAttachment(userId, orgUnitId, orgDocumentId, orgDocumentAttachmentId);
    }
}
AccountSummaryConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryConnector, deps: [{ token: AccountSummaryAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: AccountSummaryAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryService {
    constructor(routingService, userIdService, accountSummaryConnector) {
        this.routingService = routingService;
        this.userIdService = userIdService;
        this.accountSummaryConnector = accountSummaryConnector;
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.userIdService
            .takeUserId()
            .subscribe((userId) => (this.userId = userId)));
        this.subscriptions.add(this.getOrgUnitId().subscribe((orgUnitId) => (this.orgUnitId = orgUnitId)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    getAccountSummary(orgUnitId) {
        return this.accountSummaryConnector
            .getAccountSummary(this.userId, orgUnitId ?? this.orgUnitId)
            .pipe(shareReplay(1));
    }
    getDocumentList(params, orgUnitId) {
        return this.accountSummaryConnector
            .getDocumentList(this.userId, orgUnitId || this.orgUnitId, params)
            .pipe(shareReplay(1));
    }
    getDocumentAttachment(orgDocumentId, orgDocumentAttachmentId, orgUnitId) {
        return this.accountSummaryConnector
            .getDocumentAttachment(this.userId, orgUnitId || this.orgUnitId, orgDocumentId, orgDocumentAttachmentId)
            .pipe(shareReplay(1));
    }
    getOrgUnitId() {
        return this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params), distinctUntilChanged(), map((params) => params.orgUnit));
    }
}
AccountSummaryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryService, deps: [{ token: i1.RoutingService }, { token: i1.UserIdService }, { token: AccountSummaryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.UserIdService }, { type: AccountSummaryConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ACCOUNT_SUMMARY_NORMALIZER = new InjectionToken('AccountSummaryNormalizer');
const ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER = new InjectionToken('AccountSummaryDocumentNormalizer');

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
const ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY = 'orgAccountSummaryList.breadcrumbs.list';
class AccountSummaryPageMetaResolver extends OrganizationPageMetaResolver {
    constructor(contentPageMetaResolver, translation, semanticPath, routingService) {
        super(contentPageMetaResolver, translation, semanticPath, routingService);
        this.contentPageMetaResolver = contentPageMetaResolver;
        this.translation = translation;
        this.semanticPath = semanticPath;
        this.routingService = routingService;
        this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE = 'orgAccountSummary';
        this.ACCOUNT_SUMMARY_LIST_LABEL = 'Account Summaries';
        this.ACCOUNT_SUMMARY_LIST_PATH = '/organization/account-summary';
        /**
         * Breadcrumbs of the Account Summary page.
         */
        this.orgAccountSummaryBreadcrumb$ = defer(() => this.routingService.getRouterState()).pipe(map((routerState) => routerState?.state?.semanticRoute), distinctUntilChanged(), switchMap((semanticRoute) => {
            return semanticRoute === this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE
                ? this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY).pipe(map((label) => [
                    {
                        label,
                        link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
                    },
                ]))
                : combineLatest([
                    this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY),
                    this.translation.translate(ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY),
                ]).pipe(map(([orgLabel, _label]) => [
                    {
                        label: orgLabel,
                        link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
                    },
                    {
                        label: this.ACCOUNT_SUMMARY_LIST_LABEL,
                        link: this.semanticPath.get(this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE),
                    },
                ]));
        }));
        /**
         * Breadcrumbs returned in the method #resolveBreadcrumbs.
         */
        this.breadcrumbs$ = combineLatest([
            this.orgAccountSummaryBreadcrumb$,
            defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
        ]).pipe(map(([orgAccountSummaryBreadcrumb, breadcrumbs = []]) => {
            const [home, ...restBreadcrumbs] = breadcrumbs;
            return [home, ...orgAccountSummaryBreadcrumb, ...restBreadcrumbs];
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getScore(page) {
        return (super.getScore(page) +
            (page.label?.startsWith(this.ACCOUNT_SUMMARY_LIST_PATH) ? 1 : -1));
    }
}
AccountSummaryPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryPageMetaResolver, deps: [{ token: i1.ContentPageMetaResolver }, { token: i1.TranslationService }, { token: i1.SemanticPathService }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ContentPageMetaResolver }, { type: i1.TranslationService }, { type: i1.SemanticPathService }, { type: i1.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    AccountSummaryService,
    {
        provide: AccountSummaryFacade,
        useExisting: AccountSummaryService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryCoreModule {
}
AccountSummaryCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule });
AccountSummaryCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule, providers: [
        ...facadeProviders,
        AccountSummaryConnector,
        {
            provide: PageMetaResolver,
            useExisting: AccountSummaryPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        AccountSummaryConnector,
                        {
                            provide: PageMetaResolver,
                            useExisting: AccountSummaryPageMetaResolver,
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

export { ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER, ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY, ACCOUNT_SUMMARY_NORMALIZER, AccountSummaryAdapter, AccountSummaryConnector, AccountSummaryCoreModule, AccountSummaryPageMetaResolver, AccountSummaryService };
//# sourceMappingURL=spartacus-organization-account-summary-core.mjs.map
