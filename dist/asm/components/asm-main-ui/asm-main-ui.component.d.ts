import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import { AsmDeepLinkParameters, CsAgentAuthService } from '@spartacus/asm/root';
import { AuthService, FeatureConfigService, GlobalMessageService, GlobalMessageType, RoutingService, User } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import * as i0 from "@angular/core";
interface CartTypeKey {
    [key: string]: string;
}
export declare const CART_TYPE_KEY: CartTypeKey;
export declare class AsmMainUiComponent implements OnInit, OnDestroy {
    protected authService: AuthService;
    protected csAgentAuthService: CsAgentAuthService;
    protected asmComponentService: AsmComponentService;
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected asmService: AsmService;
    protected userAccountFacade: UserAccountFacade;
    protected launchDialogService: LaunchDialogService;
    protected featureConfig?: FeatureConfigService | undefined;
    customerSupportAgentLoggedIn$: Observable<boolean>;
    csAgentTokenLoading$: Observable<boolean>;
    customer$: Observable<User | undefined>;
    isCollapsed$: Observable<boolean> | undefined;
    iconTypes: typeof ICON_TYPE;
    showDeeplinkCartInfoAlert$: Observable<boolean>;
    deeplinkCartAlertKey: string;
    showCreateCustomerSuccessfullyAlert: boolean;
    globalMessageType: typeof GlobalMessageType;
    disabled: boolean;
    protected startingCustomerSession: boolean;
    showCustomerEmulationInfoAlert: boolean;
    subscription: Subscription;
    element: ElementRef;
    addNewCustomerLink: ElementRef;
    constructor(authService: AuthService, csAgentAuthService: CsAgentAuthService, asmComponentService: AsmComponentService, globalMessageService: GlobalMessageService, routingService: RoutingService, asmService: AsmService, userAccountFacade: UserAccountFacade, launchDialogService: LaunchDialogService);
    /**
     * @deprecated since 7.0
     */
    constructor(authService: AuthService, csAgentAuthService: CsAgentAuthService, asmComponentService: AsmComponentService, globalMessageService: GlobalMessageService, routingService: RoutingService, asmService: AsmService, userAccountFacade: UserAccountFacade, launchDialogService: LaunchDialogService, featureConfig: FeatureConfigService);
    ngOnInit(): void;
    /**
     * When agent is logged in and deep link has customerID,
     * call logout if has customer emulated(userLoggedin) but not emulated by deep link.
     * call startSessionWithParameters
     */
    protected subscribeForDeeplink(): void;
    protected confirmSwitchCustomer(switchCustomerId: string): void;
    /**
     * If url contains customerId and we haven't emulatedFromURL, we'll change the isEmulatedByDeepLink flag and
     * start emulate customer in URL.
     */
    protected startSessionWithParameters(parameters: any): void;
    protected handleCustomerSessionStartRedirection(): void;
    loginCustomerSupportAgent({ userId, password, }: {
        userId: string;
        password: string;
    }): void;
    logout(): void;
    startCustomerEmulationSession({ customerId }: {
        customerId?: string;
    }, parameters?: AsmDeepLinkParameters): void;
    protected handleDeepLinkParamsAfterStartSession(parameters: AsmDeepLinkParameters): void;
    hideUi(): void;
    showCustomList(): void;
    closeModal(): void;
    createCustomer(): void;
    closeDialogConfirmationAlert(): void;
    closeDeeplinkCartInfoAlert(): void;
    closeCustomerEmulationInfoAlert(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmMainUiComponent, [null, null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmMainUiComponent, "cx-asm-main-ui", never, {}, {}, never, never, false, never>;
}
export {};
