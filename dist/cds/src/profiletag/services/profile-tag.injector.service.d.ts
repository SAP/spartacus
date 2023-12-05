import { Observable } from 'rxjs';
import { CdsBackendConnector } from '../connectors/cds-backend-connector';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';
import { ProfileTagEventService } from './profiletag-event.service';
import * as i0 from "@angular/core";
export declare class ProfileTagInjectorService {
    private profileTagEventTracker;
    private cdsBackendConnector;
    private profileTagLifecycleService;
    constructor(profileTagEventTracker: ProfileTagEventService, cdsBackendConnector: CdsBackendConnector, profileTagLifecycleService: ProfileTagLifecycleService);
    track(): Observable<boolean>;
    private notifyEcOfLoginSuccessful;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileTagInjectorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProfileTagInjectorService>;
}
