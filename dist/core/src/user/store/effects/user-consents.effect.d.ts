import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { GlobalMessageActions } from '../../../global-message/store/actions';
import { LoggerService } from '../../../logger';
import { UserConsentConnector } from '../../connectors/consent/user-consent.connector';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class UserConsentsEffect {
    private actions$;
    private userConsentConnector;
    protected logger: LoggerService;
    resetConsents$: Observable<UserActions.ResetLoadUserConsents>;
    getConsents$: Observable<UserActions.UserConsentsAction>;
    giveConsent$: Observable<UserActions.UserConsentsAction | GlobalMessageActions.RemoveMessagesByType>;
    withdrawConsent$: Observable<UserActions.UserConsentsAction>;
    constructor(actions$: Actions, userConsentConnector: UserConsentConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<UserConsentsEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserConsentsEffect>;
}
