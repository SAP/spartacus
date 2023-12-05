import { OnDestroy, OnInit } from '@angular/core';
import { AnonymousConsentsConfig, AnonymousConsentsService, AuthService, ConsentTemplate, GlobalMessageService, UserConsentService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConsentManagementComponentService } from '../consent-management-component.service';
import * as i0 from "@angular/core";
export declare class ConsentManagementComponent implements OnInit, OnDestroy {
    protected userConsentService: UserConsentService;
    protected globalMessageService: GlobalMessageService;
    protected anonymousConsentsConfig: AnonymousConsentsConfig;
    protected anonymousConsentsService: AnonymousConsentsService;
    protected authService: AuthService;
    protected consentManagementComponentService?: ConsentManagementComponentService | undefined;
    private subscriptions;
    private allConsentsLoading;
    templateList$: Observable<ConsentTemplate[]>;
    loading$: Observable<boolean>;
    requiredConsents: string[];
    constructor(userConsentService: UserConsentService, globalMessageService: GlobalMessageService, anonymousConsentsConfig: AnonymousConsentsConfig, anonymousConsentsService: AnonymousConsentsService, authService: AuthService, consentManagementComponentService?: ConsentManagementComponentService | undefined);
    ngOnInit(): void;
    private consentListInit;
    private hideAnonymousConsents;
    private giveConsentInit;
    private withdrawConsentInit;
    private consentsExists;
    onConsentChange({ given, template, }: {
        given: boolean;
        template: ConsentTemplate;
    }): void;
    private onConsentGivenSuccess;
    private onConsentWithdrawnSuccess;
    rejectAll(templates?: ConsentTemplate[]): void;
    private setupWithdrawalStream;
    allowAll(templates?: ConsentTemplate[]): void;
    private setupGiveStream;
    private isRequiredConsent;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsentManagementComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConsentManagementComponent, "cx-consent-management", never, {}, {}, never, never, false, never>;
}
