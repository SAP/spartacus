import { UntypedFormGroup } from '@angular/forms';
import { AuthRedirectService, AuthService, GlobalMessageService, RoutingService } from '@spartacus/core';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UpdateEmailComponentService {
    protected userEmail: UserEmailFacade;
    protected routingService: RoutingService;
    protected globalMessageService: GlobalMessageService;
    protected authService: AuthService;
    protected authRedirectService: AuthRedirectService;
    constructor(userEmail: UserEmailFacade, routingService: RoutingService, globalMessageService: GlobalMessageService, authService: AuthService, authRedirectService: AuthRedirectService);
    protected busy$: BehaviorSubject<boolean>;
    isUpdating$: import("rxjs").Observable<boolean>;
    form: UntypedFormGroup;
    save(): void;
    /**
     * Handles successful updating of the user email.
     */
    protected onSuccess(newUid: string): void;
    protected onError(_error: Error): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateEmailComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateEmailComponentService>;
}
