import { OnChanges, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';
import { GenericLinkComponentService } from './generic-link-component.service';
import * as i0 from "@angular/core";
interface RouteParts {
    /** Path in the Angular-like array format */
    path?: string[];
    /** Query params */
    queryParams?: Params;
    /** Hash fragment */
    fragment?: string | null;
}
/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
export declare class GenericLinkComponent implements OnChanges {
    protected router: Router;
    protected service: GenericLinkComponentService;
    constructor(router: Router, service: GenericLinkComponentService);
    /**
     * Used to split url into 2 parts:
     * 1. the path
     * 2. query params + hash fragment
     */
    protected readonly URL_SPLIT: RegExp;
    /**
     * Parsed parts of the @Input `url`, when it's a local URL.
     * It should not be used when the `url` is external.
     * @see `url`
     */
    protected routeParts: RouteParts;
    url: string | any[];
    target: string | null;
    id: string;
    class: string;
    style: string | undefined;
    title: string;
    isExternalUrl(): boolean;
    get rel(): "noopener" | null;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * The part with the path of the local url.
     */
    get routerUrl(): string[] | undefined;
    /**
     * The part with the query params of the local url.
     */
    get queryParams(): Params | undefined;
    /**
     * The part with the hash fragment of the local url.
     */
    get fragment(): string | undefined;
    /**
     * Parses the given url and sets the property `urlParts` accordingly.
     */
    protected setUrlParts(url: string | any[]): void;
    /**
     * Parses the given string into 3 parts:
     * - string path (wrapped in an array to be compatible with Angular syntax for the `routerLink`)
     * - query params (as an object)
     * - hash fragment (string)
     */
    protected splitUrl(url?: string): RouteParts;
    /**
     * Prepends a leading slash to the given URL string, in case it doesn't have it.
     */
    protected getAbsoluteUrl(url: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GenericLinkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GenericLinkComponent, "cx-generic-link", never, { "url": "url"; "target": "target"; "id": "id"; "class": "class"; "style": "style"; "title": "title"; }, {}, never, ["*"], false, never>;
}
export {};
