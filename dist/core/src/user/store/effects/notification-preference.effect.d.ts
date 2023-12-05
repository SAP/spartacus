import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { UserNotificationPreferenceConnector } from '../../connectors/notification-preference/user-notification-preference.connector';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class NotificationPreferenceEffects {
    private actions$;
    private connector;
    protected logger: LoggerService;
    loadPreferences$: Observable<UserActions.NotificationPreferenceAction>;
    updatePreferences$: Observable<UserActions.NotificationPreferenceAction>;
    constructor(actions$: Actions, connector: UserNotificationPreferenceConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationPreferenceEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationPreferenceEffects>;
}
