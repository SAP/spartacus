import { UntypedFormGroup } from '@angular/forms';
import { AuthConfigService, GlobalMessageService, RoutingService } from '@spartacus/core';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ForgotPasswordComponentService {
    protected userPasswordService: UserPasswordFacade;
    protected routingService: RoutingService;
    protected authConfigService: AuthConfigService;
    protected globalMessage: GlobalMessageService;
    constructor(userPasswordService: UserPasswordFacade, routingService: RoutingService, authConfigService: AuthConfigService, globalMessage: GlobalMessageService);
    protected busy$: BehaviorSubject<boolean>;
    isUpdating$: import("rxjs").Observable<boolean>;
    form: UntypedFormGroup;
    /**
     * Sends an email to the user to reset the password.
     *
     * When the `ResourceOwnerPasswordFlow` is used, the user is routed
     * to the login page.
     */
    requestEmail(): void;
    protected onSuccess(): void;
    protected onError(_error: Error): void;
    /**
     * Redirects the user back to the login page.
     *
     * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
     */
    protected redirect(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ForgotPasswordComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ForgotPasswordComponentService>;
}
