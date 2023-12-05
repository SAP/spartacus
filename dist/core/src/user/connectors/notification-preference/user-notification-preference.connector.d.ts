import { Observable } from 'rxjs';
import { UserNotificationPreferenceAdapter } from './user-notification-preference.adapter';
import { NotificationPreference } from '../../../model/notification-preference.model';
import * as i0 from "@angular/core";
export declare class UserNotificationPreferenceConnector {
    protected adapter: UserNotificationPreferenceAdapter;
    constructor(adapter: UserNotificationPreferenceAdapter);
    loadAll(userId: string): Observable<NotificationPreference[]>;
    update(userId: string, preferences: NotificationPreference[]): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserNotificationPreferenceConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserNotificationPreferenceConnector>;
}
