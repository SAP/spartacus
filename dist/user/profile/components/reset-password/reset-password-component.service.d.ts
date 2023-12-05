import { UntypedFormGroup } from '@angular/forms';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ResetPasswordComponentService {
    protected userPasswordService: UserPasswordFacade;
    protected routingService: RoutingService;
    protected globalMessage: GlobalMessageService;
    constructor(userPasswordService: UserPasswordFacade, routingService: RoutingService, globalMessage: GlobalMessageService);
    protected busy$: BehaviorSubject<boolean>;
    isUpdating$: Observable<boolean>;
    resetToken$: Observable<string>;
    form: UntypedFormGroup;
    /**
     * Resets the password by the given token.
     *
     * The token has been provided during the request password flow.
     * The token is not validated on the client.
     */
    resetPassword(token: string): void;
    protected onSuccess(): void;
    protected onError(error: unknown): void;
    /**
     * Redirects the user to the login page.
     */
    protected redirect(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResetPasswordComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResetPasswordComponentService>;
}
