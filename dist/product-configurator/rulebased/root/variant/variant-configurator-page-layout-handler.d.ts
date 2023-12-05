import { CommonConfiguratorUtilsService, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { BreakpointService, LayoutConfig, PageLayoutHandler } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class VariantConfiguratorPageLayoutHandler implements PageLayoutHandler {
    protected configuratorRouterExtractorService: ConfiguratorRouterExtractorService;
    protected breakpointService: BreakpointService;
    protected layoutConfig: LayoutConfig;
    protected commonConfiguratorUtilsService: CommonConfiguratorUtilsService;
    protected static templateName: string;
    protected static sectionDisplayOnlyName: string;
    constructor(configuratorRouterExtractorService: ConfiguratorRouterExtractorService, breakpointService: BreakpointService, layoutConfig: LayoutConfig, commonConfiguratorUtilsService: CommonConfiguratorUtilsService);
    handle(slots$: Observable<string[]>, pageTemplate?: string, section?: string): Observable<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VariantConfiguratorPageLayoutHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VariantConfiguratorPageLayoutHandler>;
}
