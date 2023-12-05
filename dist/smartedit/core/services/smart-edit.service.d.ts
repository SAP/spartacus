import { NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { BaseSiteService, CmsService, Page, RoutingService, WindowRef } from '@spartacus/core';
import { SmartEditConfig } from '@spartacus/smartedit/root';
import * as i0 from "@angular/core";
export declare class SmartEditService {
    protected cmsService: CmsService;
    protected routingService: RoutingService;
    protected baseSiteService: BaseSiteService;
    protected zone: NgZone;
    protected winRef: WindowRef;
    protected rendererFactory: RendererFactory2;
    protected config: SmartEditConfig;
    private isPreviewPage;
    private _currentPageId;
    private defaultPreviewProductCode;
    private defaultPreviewCategoryCode;
    constructor(cmsService: CmsService, routingService: RoutingService, baseSiteService: BaseSiteService, zone: NgZone, winRef: WindowRef, rendererFactory: RendererFactory2, config: SmartEditConfig);
    processCmsPage(): void;
    /**
     * add CSS classes in a body tag
     */
    protected addPageContract(cmsPage: Page): void;
    /**
     * go to the default preview page
     */
    protected goToPreviewPage(cmsPage: Page): void;
    /**
     * re-render CMS components and slots
     */
    protected renderComponent(componentId: string, componentType?: string, parentId?: string): boolean;
    protected reprocessPage(): void;
    /**
     * add smartedit HTML markup contract
     */
    addSmartEditContract(element: Element, renderer: Renderer2, properties: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartEditService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SmartEditService>;
}
