import { Observable } from 'rxjs';
import { CdsBackendNotificationAdapter } from '../adapters/cds-backend-notification-adapter';
import * as i0 from "@angular/core";
export declare class CdsBackendConnector {
    private cdsBackendNotificationAdapter;
    constructor(cdsBackendNotificationAdapter: CdsBackendNotificationAdapter);
    notifySuccessfulLogin(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsBackendConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdsBackendConnector>;
}
