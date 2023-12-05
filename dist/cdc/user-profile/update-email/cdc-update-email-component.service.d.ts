import { CdcJsService } from '@spartacus/cdc/root';
import { AuthRedirectService, AuthService, GlobalMessageService, RoutingService } from '@spartacus/core';
import { UpdateEmailComponentService } from '@spartacus/user/profile/components';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import * as i0 from "@angular/core";
export declare class CDCUpdateEmailComponentService extends UpdateEmailComponentService {
    protected userEmail: UserEmailFacade;
    protected routingService: RoutingService;
    protected globalMessageService: GlobalMessageService;
    protected authService: AuthService;
    protected authRedirectService: AuthRedirectService;
    protected cdcJsService: CdcJsService;
    constructor(userEmail: UserEmailFacade, routingService: RoutingService, globalMessageService: GlobalMessageService, authService: AuthService, authRedirectService: AuthRedirectService, cdcJsService: CdcJsService);
    save(): void;
    protected onError(_error: Error): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CDCUpdateEmailComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CDCUpdateEmailComponentService>;
}
