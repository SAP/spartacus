import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { SiteContextParamsService } from './site-context-params.service';
import * as i0 from "@angular/core";
/**
 * Values of the site context parameters encoded in the URL.
 */
export interface SiteContextUrlParams {
    [name: string]: string;
}
/**
 * UrlTree decorated with a custom property `siteContext`
 * for storing the values of the site context parameters.
 */
export interface UrlTreeWithSiteContext extends UrlTree {
    siteContext?: SiteContextUrlParams;
}
/**
 * Angular URL Serializer aware of Spartacus site context parameters
 * encoded in the URL.
 */
export declare class SiteContextUrlSerializer extends DefaultUrlSerializer {
    private siteContextParams;
    /**
     * Splits the URL into 2 parts: path and the query/fragment part
     */
    protected readonly URL_SPLIT: RegExp;
    /**
     * Names of site context parameters encoded in the URL
     */
    protected get urlEncodingParameters(): string[];
    /**
     * Tells whether any site context parameters should be encoded in the URL
     */
    protected get hasContextInRoutes(): boolean;
    constructor(siteContextParams: SiteContextParamsService);
    /**
     * @override Recognizes the site context parameters encoded in the prefix segments
     * of the given URL.
     *
     * It returns the UrlTree for the given URL shortened by the recognized params, but saves
     * the params' values in the custom property of UrlTree: `siteContext`.
     */
    parse(url: string): UrlTreeWithSiteContext;
    /**
     * Recognizes the site context parameters encoded in the prefix segments of the given URL.
     *
     * It returns the recognized site context params as well as the
     * URL shortened by the recognized params.
     */
    urlExtractContextParameters(url: string): {
        url: string;
        params: SiteContextUrlParams;
    };
    /**
     * Saves the given site context parameters in the custom property
     * of the given UrlTree: `siteContext`.
     */
    protected urlTreeIncludeContextParameters(urlTree: UrlTreeWithSiteContext, params: SiteContextUrlParams): void;
    /**
     * @override Serializes the given UrlTree to a string and prepends
     *  to it the current values of the site context parameters.
     */
    serialize(tree: UrlTreeWithSiteContext): string;
    /**
     * Returns the site context parameters stored in the custom property
     * of the UrlTree: `siteContext`.
     */
    urlTreeExtractContextParameters(urlTree: UrlTreeWithSiteContext): SiteContextUrlParams;
    /**
     * Prepends the current values of the site context parameters to the given URL.
     */
    protected urlIncludeContextParameters(url: string, params: SiteContextUrlParams): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextUrlSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextUrlSerializer>;
}
