import { ActionsSubject } from '@ngrx/store';
import { ConsentService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CdsConfig } from '../../config/cds-config';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';
import * as i0 from "@angular/core";
export declare class ProfileTagLifecycleService {
    protected consentService: ConsentService;
    protected config: CdsConfig;
    protected actionsSubject: ActionsSubject;
    constructor(consentService: ConsentService, config: CdsConfig, actionsSubject: ActionsSubject);
    consentChanged(): Observable<ConsentChangedPushEvent>;
    loginSuccessful(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileTagLifecycleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProfileTagLifecycleService>;
}
