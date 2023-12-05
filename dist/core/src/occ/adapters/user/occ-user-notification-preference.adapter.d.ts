import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { UserNotificationPreferenceAdapter } from '../../../user/connectors/notification-preference/user-notification-preference.adapter';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import * as i0 from "@angular/core";
export declare class OccUserNotificationPreferenceAdapter implements UserNotificationPreferenceAdapter {
    protected http: HttpClient;
    protected converter: ConverterService;
    protected occEndpoints: OccEndpointsService;
    constructor(http: HttpClient, converter: ConverterService, occEndpoints: OccEndpointsService);
    loadAll(userId: string): Observable<NotificationPreference[]>;
    update(userId: string, preferences: NotificationPreference[]): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserNotificationPreferenceAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserNotificationPreferenceAdapter>;
}
