import * as i0 from "@angular/core";
export declare class GenericLinkComponentService {
    /**
     * Pattern matching string starting with `http://` or `https://`.
     */
    protected HTTP_PROTOCOL_REGEX: RegExp;
    /**
     * Pattern matching string starting with `mailto:`.
     */
    protected MAILTO_PROTOCOL_REGEX: RegExp;
    /**
     * Pattern matching string starting with `tel:`.
     */
    protected TEL_PROTOCOL_REGEX: RegExp;
    /**
     * Returns true when the @Input `url` is a string starting with `http://`, `https://`, `mailto:`, `tel:`.
     */
    isExternalUrl(url: string | any[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<GenericLinkComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GenericLinkComponentService>;
}
