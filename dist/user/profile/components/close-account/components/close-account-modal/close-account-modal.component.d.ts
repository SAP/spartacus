import { ElementRef, OnInit } from '@angular/core';
import { AuthService, GlobalMessageService, RoutingService, TranslationService } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CloseAccountModalComponent implements OnInit {
    protected authService: AuthService;
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected translationService: TranslationService;
    protected userProfile: UserProfileFacade;
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    iconTypes: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    isLoggedIn$: Observable<boolean>;
    protected loading$: BehaviorSubject<boolean>;
    handleClick(event: UIEvent): void;
    constructor(authService: AuthService, globalMessageService: GlobalMessageService, routingService: RoutingService, translationService: TranslationService, userProfile: UserProfileFacade, launchDialogService: LaunchDialogService, el: ElementRef);
    get isLoading$(): Observable<boolean>;
    ngOnInit(): void;
    onSuccess(): void;
    onError(): void;
    dismissModal(reason?: any): void;
    closeAccount(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CloseAccountModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CloseAccountModalComponent, "cx-close-account-modal", never, {}, {}, never, never, false, never>;
}
