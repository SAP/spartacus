import { CsAgentAuthService, AsmDeepLinkParameters, AsmDeepLinkService, AsmEnablerService } from '@spartacus/asm/root';
import { AuthService, RoutingService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsmDialogActionEvent } from '@spartacus/asm/customer-360/root';
import * as i0 from "@angular/core";
export declare class AsmComponentService {
    protected authService: AuthService;
    protected csAgentAuthService: CsAgentAuthService;
    protected winRef: WindowRef;
    protected asmEnablerService?: AsmEnablerService | undefined;
    protected asmDeepLinkService?: AsmDeepLinkService | undefined;
    protected searchparam: URLSearchParams;
    isEmulatedByDeepLink$: BehaviorSubject<boolean>;
    protected showDeeplinkCartInfoAlert$: BehaviorSubject<boolean>;
    protected routingService: RoutingService;
    constructor(authService: AuthService, csAgentAuthService: CsAgentAuthService, winRef: WindowRef, asmEnablerService: AsmEnablerService, asmDeepLinkService: AsmDeepLinkService);
    /**
     * @deprecated since 7.0 (CXSPA-3090)
     */
    constructor(authService: AuthService, csAgentAuthService: CsAgentAuthService, winRef: WindowRef);
    /**
     * Returns a deep link parameter value if it is in the url.
     */
    getSearchParameter(key: string): string | undefined | null;
    isEmulatedByDeepLink(): BehaviorSubject<boolean>;
    setEmulatedByDeepLink(emulated: boolean): void;
    setShowDeeplinkCartInfoAlert(display: boolean): void;
    shouldShowDeeplinkCartInfoAlert(): Observable<boolean>;
    logoutCustomerSupportAgentAndCustomer(): void;
    logoutCustomer(): void;
    isCustomerEmulationSessionInProgress(): Observable<boolean>;
    /**
     * We're currently only removing the persisted storage in the browser
     * to ensure the ASM experience isn't loaded on the next visit. There are a few
     * optimizations we could think of:
     * - drop the `asm` parameter from the URL, in case it's still there
     * - remove the generated UI from the DOM (outlets currently do not support this)
     */
    unload(): void;
    /**
     * check whether try to emulate customer from deeplink
     */
    isEmulateInURL(): boolean;
    /**
     * Returns valid deep link parameters in the url.
     */
    getDeepLinkUrlParams(): AsmDeepLinkParameters | undefined;
    /**
     * Handles the navigation based on deep link parameters in the URL
     * or passed parameter.
     */
    handleDeepLinkNavigation(parameters?: AsmDeepLinkParameters | undefined): void;
    handleAsmDialogAction(event: AsmDialogActionEvent | string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmComponentService, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmComponentService>;
}
