import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../../logger';
import { ClientAuthenticationTokenService } from '../../services/client-authentication-token.service';
import { ClientAuthActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ClientTokenEffect {
    private actions$;
    private clientAuthenticationTokenService;
    protected logger: LoggerService;
    loadClientToken$: Observable<ClientAuthActions.ClientTokenAction>;
    constructor(actions$: Actions, clientAuthenticationTokenService: ClientAuthenticationTokenService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientTokenEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClientTokenEffect>;
}
