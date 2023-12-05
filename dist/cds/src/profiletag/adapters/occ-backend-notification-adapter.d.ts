import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CdsBackendNotificationAdapter } from './cds-backend-notification-adapter';
import * as i0 from "@angular/core";
export declare class OccBackendNotification implements CdsBackendNotificationAdapter {
    private http;
    private occEndpoints;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService);
    notifySuccessfulLogin(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccBackendNotification, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccBackendNotification>;
}
