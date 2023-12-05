import { OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService, RoutingService } from '@spartacus/core';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderGuestRegisterFormComponent implements OnDestroy {
    protected userRegisterFacade: UserRegisterFacade;
    protected routingService: RoutingService;
    protected authService: AuthService;
    protected fb: UntypedFormBuilder;
    guid: string;
    email: string;
    subscription: Subscription;
    guestRegisterForm: UntypedFormGroup;
    constructor(userRegisterFacade: UserRegisterFacade, routingService: RoutingService, authService: AuthService, fb: UntypedFormBuilder);
    submit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderGuestRegisterFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderGuestRegisterFormComponent, "cx-guest-register-form", never, { "guid": "guid"; "email": "email"; }, {}, never, never, false, never>;
}
