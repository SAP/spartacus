import { BreadcrumbMeta, ContentPageMetaResolver, Page, RoutingService, SemanticPathService, TranslationService } from '@spartacus/core';
import { OrganizationPageMetaResolver } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare const ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY = "orgAccountSummaryList.breadcrumbs.list";
export declare class AccountSummaryPageMetaResolver extends OrganizationPageMetaResolver {
    protected contentPageMetaResolver: ContentPageMetaResolver;
    protected translation: TranslationService;
    protected semanticPath: SemanticPathService;
    protected routingService: RoutingService;
    constructor(contentPageMetaResolver: ContentPageMetaResolver, translation: TranslationService, semanticPath: SemanticPathService, routingService: RoutingService);
    protected readonly ACCOUNT_SUMMARY_SEMANTIC_ROUTE = "orgAccountSummary";
    protected readonly ACCOUNT_SUMMARY_LIST_LABEL = "Account Summaries";
    protected readonly ACCOUNT_SUMMARY_LIST_PATH = "/organization/account-summary";
    /**
     * Breadcrumbs of the Account Summary page.
     */
    protected orgAccountSummaryBreadcrumb$: Observable<BreadcrumbMeta[]>;
    /**
     * Breadcrumbs returned in the method #resolveBreadcrumbs.
     */
    protected breadcrumbs$: Observable<BreadcrumbMeta[]>;
    getScore(page: Page): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountSummaryPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountSummaryPageMetaResolver>;
}
