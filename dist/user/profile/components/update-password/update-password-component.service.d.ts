import { UntypedFormGroup } from '@angular/forms';
import { AuthRedirectService, AuthService, GlobalMessageService, HttpErrorModel, RoutingService } from '@spartacus/core';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UpdatePasswordComponentService {
    protected userPasswordService: UserPasswordFacade;
    protected routingService: RoutingService;
    protected globalMessageService: GlobalMessageService;
    protected authRedirectService?: AuthRedirectService | undefined;
    protected authService?: AuthService | undefined;
    constructor(userPasswordService: UserPasswordFacade, routingService: RoutingService, globalMessageService: GlobalMessageService, authRedirectService?: AuthRedirectService | undefined, authService?: AuthService | undefined);
    protected busy$: BehaviorSubject<boolean>;
    isUpdating$: import("rxjs").Observable<boolean>;
    form: UntypedFormGroup;
    /**
     * Updates the password for the user.
     */
    updatePassword(): void;
    protected onSuccess(): void;
    protected onError(_error: HttpErrorModel | Error): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdatePasswordComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdatePasswordComponentService>;
}
