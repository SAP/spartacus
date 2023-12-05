import { Observable, ReplaySubject } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import * as i0 from "@angular/core";
export declare class LanguageStatePersistenceService {
    protected statePersistenceService: StatePersistenceService;
    protected languageService: LanguageService;
    protected config: SiteContextConfig;
    constructor(statePersistenceService: StatePersistenceService, languageService: LanguageService, config: SiteContextConfig);
    protected initialized$: ReplaySubject<unknown>;
    /**
     * Initializes the synchronization of the active language with the local storage.
     *
     * @returns Observable that emits and completes when the value is read from the storage.
     */
    initSync(): Observable<unknown>;
    protected onRead(valueFromStorage: string | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LanguageStatePersistenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LanguageStatePersistenceService>;
}
