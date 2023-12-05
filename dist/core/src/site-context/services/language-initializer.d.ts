import { OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LanguageStatePersistenceService } from './language-state-persistence.service';
import * as i0 from "@angular/core";
export declare class LanguageInitializer implements OnDestroy {
    protected languageService: LanguageService;
    protected languageStatePersistenceService: LanguageStatePersistenceService;
    protected configInit: ConfigInitializerService;
    constructor(languageService: LanguageService, languageStatePersistenceService: LanguageStatePersistenceService, configInit: ConfigInitializerService);
    protected subscription: Subscription;
    /**
     * Initializes the value of the active language.
     */
    initialize(): void;
    /**
     * On subscription to the returned observable:
     *
     * Sets the default value taken from config, unless the active language has been already initialized.
     */
    protected setFallbackValue(): Observable<unknown>;
    /**
     * Sets the active language value based on the default value from the config,
     * unless the active language has been already initialized.
     */
    protected setDefaultFromConfig(config: SiteContextConfig): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LanguageInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LanguageInitializer>;
}
