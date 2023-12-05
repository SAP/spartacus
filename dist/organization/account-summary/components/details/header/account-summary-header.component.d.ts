import { OnDestroy, OnInit } from '@angular/core';
import { Address, LanguageService, TranslationService } from '@spartacus/core';
import { AccountSummaryDetails, AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { Card } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AccountSummaryHeaderComponent implements OnInit, OnDestroy {
    protected accountSummaryFacade: AccountSummaryFacade;
    protected languageService: LanguageService;
    protected translation: TranslationService;
    notApplicable: string;
    headerDetails$: Observable<AccountSummaryDetails>;
    protected subscriptions: Subscription;
    constructor(accountSummaryFacade: AccountSummaryFacade, languageService: LanguageService, translation: TranslationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getIdCardContent(id?: string): Observable<Card>;
    getNameCardContent(name?: string): Observable<Card>;
    getAddressCardContent(billingAddress?: Address): Observable<Card>;
    getCreditRepCardContent(creditRep?: string): Observable<Card>;
    getCreditLineCardContent(creditLine?: string): Observable<Card>;
    getCurrentBalanceCardContent(currentBalance?: string): Observable<Card>;
    getOpenBalanceCardContent(openBalance?: string): Observable<Card>;
    getPastDueBalanceCardContent(pastDueBalance?: string): Observable<Card>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountSummaryHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccountSummaryHeaderComponent, "cx-account-summary-header", never, {}, {}, never, never, false, never>;
}
