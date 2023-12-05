import { InjectionToken } from '@angular/core';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { Converter } from '../../../util/converter.service';
export declare const NOTIFICATION_PREFERENCE_SERIALIZER: InjectionToken<Converter<NotificationPreference[], any>>;
export declare const NOTIFICATION_PREFERENCE_NORMALIZER: InjectionToken<Converter<any, NotificationPreference>>;
