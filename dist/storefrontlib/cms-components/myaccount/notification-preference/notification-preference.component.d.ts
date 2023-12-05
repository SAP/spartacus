import { OnInit } from '@angular/core';
import { NotificationPreference, UserNotificationPreferenceService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NotificationPreferenceComponent implements OnInit {
    private notificationPreferenceService;
    preferences$: Observable<NotificationPreference[]>;
    isLoading$: Observable<boolean>;
    protected preferences: NotificationPreference[];
    constructor(notificationPreferenceService: UserNotificationPreferenceService);
    ngOnInit(): void;
    updatePreference(preference: NotificationPreference): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationPreferenceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationPreferenceComponent, "cx-notification-preference", never, {}, {}, never, never, false, never>;
}
