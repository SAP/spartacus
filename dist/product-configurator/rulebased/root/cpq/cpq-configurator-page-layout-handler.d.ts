import { CommonConfiguratorUtilsService, ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { BreakpointService, LayoutConfig, PageLayoutHandler } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface RouterResolution {
    isLargeResolution: boolean;
    routerData: ConfiguratorRouter.Data;
}
export declare class CpqConfiguratorPageLayoutHandler implements PageLayoutHandler {
    protected configuratorRouterExtractorService: ConfiguratorRouterExtractorService;
    protected breakpointService: BreakpointService;
    protected layoutConfig: LayoutConfig;
    protected commonConfiguratorUtilsService: CommonConfiguratorUtilsService;
    protected static templateName: string;
    protected static sectionHeaderDisplayOnly: string;
    protected static sectionNavigationDisplayOnly: string;
    protected static sectionHeader: string;
    protected static sectionNavigation: string;
    constructor(configuratorRouterExtractorService: ConfiguratorRouterExtractorService, breakpointService: BreakpointService, layoutConfig: LayoutConfig, commonConfiguratorUtilsService: CommonConfiguratorUtilsService);
    handle(slots$: Observable<string[]>, pageTemplate?: string, section?: string): Observable<string[]>;
    protected compileRouterAndResolution(): Observable<RouterResolution>;
    protected getHeaderSlots(slots: string[], cont: RouterResolution): string[];
    protected getNavigationSlots(slots: string[], cont: RouterResolution): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorPageLayoutHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorPageLayoutHandler>;
}
export {};
