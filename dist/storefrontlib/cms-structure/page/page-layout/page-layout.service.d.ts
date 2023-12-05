import { OnDestroy } from '@angular/core';
import { CmsService, LoggerService, Page, UnifiedInjector } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT, LayoutConfig, LayoutSlotConfig, SlotConfig } from '../../../layout/config/layout-config';
import { PageLayoutHandler } from './page-layout-handler';
import * as i0 from "@angular/core";
export declare class PageLayoutService implements OnDestroy {
    private cms;
    private config;
    private breakpointService;
    private unifiedInjector;
    protected handlers: PageLayoutHandler[];
    protected subscription: Subscription;
    protected logger: LoggerService;
    constructor(cms: CmsService, config: LayoutConfig, breakpointService: BreakpointService, unifiedInjector: UnifiedInjector);
    private warnLogMessages;
    private logSlots;
    getSlots(section?: string): Observable<string[]>;
    /**
     * Returns an observable with the last page slot above-the-fold
     * for the given pageTemplate / breakpoint.
     *
     * The page fold is configurable in the `LayoutConfig` for each page layout.
     */
    getPageFoldSlot(pageTemplate: string): Observable<string | undefined>;
    private resolveSlots;
    get page$(): Observable<Page>;
    get templateName$(): Observable<string>;
    /**
     * load slots from the layout configuration. The breakpoint is used
     * to load a specific configuration for the given breakpoint. If there's
     * no configuration available for the given breakpoint the default slot
     * configuration is returned.
     */
    protected getSlotConfig(templateUid: string, configAttribute: string, section?: string, breakpoint?: BREAKPOINT): SlotConfig | undefined;
    protected getSlotConfigForSection(templateUid: string, configAttribute: string, section?: string, breakpoint?: BREAKPOINT): SlotConfig | undefined;
    /**
     * Returns a list of slots for a breakpoint specific configuration
     * If there's no specific configuration for the breakpoint,
     * the closest available configuration will be returned.
     */
    protected getResponsiveSlotConfig(layoutSlotConfig: LayoutSlotConfig, configAttribute: string, breakpoint?: BREAKPOINT): SlotConfig;
    /**
     * In order to help developers, we print some detailed log information in
     * case there's no layout configuration available for the given page template
     * or section. Additionally, the slot positions are printed in the console
     * in a format that can be copied / paste to the configuration.
     */
    private logMissingLayoutConfig;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageLayoutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageLayoutService>;
}
