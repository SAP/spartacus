import { Renderer2, RendererFactory2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class PageMetaLinkService {
    protected winRef: WindowRef;
    protected rendererFactory: RendererFactory2;
    constructor(winRef: WindowRef, rendererFactory: RendererFactory2);
    /**
     * Adds a canonical link element to the document head.
     *
     * If an id is provided, the link will be updated.
     * If no url is provided, the link element will be deleted.
     */
    setCanonicalLink(url: string | undefined): void;
    protected get renderer(): Renderer2;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageMetaLinkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageMetaLinkService>;
}
