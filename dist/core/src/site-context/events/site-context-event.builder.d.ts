import { ActionsSubject } from '@ngrx/store';
import { EventService } from '../../event/event.service';
import * as i0 from "@angular/core";
/**
 * Builds and registers the site context events
 */
export declare class SiteContextEventBuilder {
    protected actionsSubject: ActionsSubject;
    protected eventService: EventService;
    constructor(actionsSubject: ActionsSubject, eventService: EventService);
    /**
     * Registers the site context events
     */
    protected register(): void;
    /**
     * Register the language set action
     */
    protected registerSetLanguage(): void;
    /**
     * Register the currency set action
     */
    protected registerSetCurrency(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextEventBuilder>;
}
