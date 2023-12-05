import { OnDestroy } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthConfigService, GlobalMessageService, RoutingService } from '@spartacus/core';
import { ForgotPasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CDCForgotPasswordComponentService extends ForgotPasswordComponentService implements OnDestroy {
    protected userPasswordService: UserPasswordFacade;
    protected routingService: RoutingService;
    protected authConfigService: AuthConfigService;
    protected globalMessage: GlobalMessageService;
    protected cdcJsService: CdcJsService;
    protected subscription: Subscription;
    constructor(userPasswordService: UserPasswordFacade, routingService: RoutingService, authConfigService: AuthConfigService, globalMessage: GlobalMessageService, cdcJsService: CdcJsService);
    /**
     * Sends an email to through CDC SDK to reset the password.
     */
    requestEmail(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CDCForgotPasswordComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CDCForgotPasswordComponentService>;
}
