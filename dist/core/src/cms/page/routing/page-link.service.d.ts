import { WindowRef } from '../../../window/window-ref';
import { CanonicalUrlOptions, PageMetaConfig } from '../config/page-meta.config';
import * as i0 from "@angular/core";
/**
 * Service to add links to the page meta data, such canonical URLs.
 */
export declare class PageLinkService {
    protected pageMetaConfig: PageMetaConfig;
    protected winRef: WindowRef;
    constructor(pageMetaConfig: PageMetaConfig, winRef: WindowRef);
    /**
     * Returns the canonical for the page.
     *
     * The canonical url is created by the help of the default `CanonicalUrlOptions` from
     * the pageMeta options. The options can be further adjusted by the options argument.
     */
    getCanonicalUrl(options?: CanonicalUrlOptions, url?: string): string;
    protected buildCanonicalUrl(url: string, options: CanonicalUrlOptions): string;
    protected removeQueryParams(url: string, config: CanonicalUrlOptions): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageLinkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageLinkService>;
}
