import { CdcJsService } from '@spartacus/cdc/root';
import { AuthRedirectService, AuthService, GlobalMessageService, RoutingService } from '@spartacus/core';
import { UpdatePasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import * as i0 from "@angular/core";
export declare class CDCUpdatePasswordComponentService extends UpdatePasswordComponentService {
    protected userPasswordService: UserPasswordFacade;
    protected routingService: RoutingService;
    protected globalMessageService: GlobalMessageService;
    protected authRedirectService: AuthRedirectService;
    protected authService: AuthService;
    protected cdcJsService: CdcJsService;
    constructor(userPasswordService: UserPasswordFacade, routingService: RoutingService, globalMessageService: GlobalMessageService, authRedirectService: AuthRedirectService, authService: AuthService, cdcJsService: CdcJsService);
    /**
     * Updates the password for the user.
     */
    updatePassword(): void;
    protected onError(_error: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CDCUpdatePasswordComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CDCUpdatePasswordComponentService>;
}
