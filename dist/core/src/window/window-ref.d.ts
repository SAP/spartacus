import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class WindowRef {
    protected platformId: Object;
    protected serverUrl?: string | undefined;
    protected serverOrigin?: string | undefined;
    readonly document: Document;
    constructor(document: any, platformId: Object, serverUrl?: string | undefined, serverOrigin?: string | undefined);
    /**
     * Returns true when invoked in browser context.
     * Use this method to check if you can access `window` and other browser globals.
     */
    isBrowser(): boolean;
    /**
     * Exposes global `window` object. In SSR when `window` is not available it returns `undefined`.
     * To detect if you can safely use `nativeWindow` use `isBrowser` to check execution platform.
     */
    get nativeWindow(): Window | undefined;
    /**
     * Exposes global `sessionStorage` object. In SSR when `sessionStorage` is not available it returns `undefined`.
     * To detect if you can safely use `sessionStorage` use `isBrowser` to check execution platform.
     */
    get sessionStorage(): Storage | undefined;
    /**
     * Exposes global `localStorage` object. In SSR when `localStorage` is not available it returns `undefined`.
     * To detect if you can safely use `localStorage` use `isBrowser` to check execution platform.
     */
    get localStorage(): Storage | undefined;
    /**
     * Returns the window/document location, unless it's not available (i.e. SSR).
     *
     * When there's no access to the location object, we mimic the location partially, by resolving
     * the request url (`SERVER_REQUEST_URL`) and origin (`SERVER_REQUEST_ORIGIN`) from the injector.
     * These values are injected in the server implementation so that we can resolve some of the location
     * values when we do server side rendering.
     */
    get location(): Partial<Location>;
    /**
     * Returns an observable for the window resize event and emits an event
     * every 300ms in case of resizing. An event is simulated initially.
     *
     * If there's no window object available (i.e. in SSR), a null value is emitted.
     */
    get resize$(): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WindowRef, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WindowRef>;
}
