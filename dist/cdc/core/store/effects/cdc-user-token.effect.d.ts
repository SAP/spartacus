import { Actions } from '@ngrx/effects';
import { GlobalMessageService, LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CdcAuthService } from '../../auth/facade/cdc-auth.service';
import { CdcUserAuthenticationTokenService } from '../../auth/services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class CdcUserTokenEffects {
    private actions$;
    private userTokenService;
    private globalMessageService;
    private cdcAuthService;
    protected logger: LoggerService;
    loadCdcUserToken$: Observable<CdcAuthActions.CdcUserTokenAction>;
    constructor(actions$: Actions, userTokenService: CdcUserAuthenticationTokenService, globalMessageService: GlobalMessageService, cdcAuthService: CdcAuthService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcUserTokenEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcUserTokenEffects>;
}
