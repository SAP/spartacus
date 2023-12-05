import { OnDestroy } from '@angular/core';
import { ConfigInitializerService, LanguageService, WindowRef } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { Direction, DirectionMode } from './config/direction.model';
import * as i0 from "@angular/core";
/**
 * The `DirectionService` can be used to add the direction to the overall storefront or individual elements.
 * By default, the direction is added to the `html` element (i.e. `<html dir="ltr">`). The API of this service
 * does however provide methods to add direction to individual elements if needed.
 *
 * The direction is configurable and allows for language driven direction configuration.
 *
 * To react to the active language, the service subscribes to the active language in the initialize method. This
 * is called from an APP_INITIALIZER method and should only happen once.
 */
export declare class DirectionService implements OnDestroy {
    protected configInit: ConfigInitializerService;
    protected languageService: LanguageService;
    protected winRef: WindowRef;
    protected config: Direction | undefined;
    protected startsDetecting: boolean;
    protected subscription: Subscription;
    constructor(configInit: ConfigInitializerService, languageService: LanguageService, winRef: WindowRef);
    /**
     * Initializes the layout direction for the storefront.
     */
    initialize(): Promise<any>;
    /**
     * Observes the _active_ language and set the required direction for the given language.
     * The method is guarded to ensure that the active language is observed only once.
     */
    protected detect(): void;
    /**
     * Sets the direction attribute for the given element. If the direction is undefined, the `dir`
     * attribute is removed.
     */
    setDirection(el: HTMLElement, direction: DirectionMode | undefined): void;
    /**
     * Gets the `DirectionMode` for the given language isoCode. The language isoCode is compared
     * to the configured list of languages(`direction.rtlLanguages` vs `direction.ltrLanguages`).
     *
     * If no language is given, or no language mapping could be found, we fallback to the default
     * `direction.mode`.
     */
    getDirection(language?: string): DirectionMode | undefined;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DirectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DirectionService>;
}
