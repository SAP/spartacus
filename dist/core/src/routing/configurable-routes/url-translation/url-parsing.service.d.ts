import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class UrlParsingService {
    private router;
    constructor(router: Router);
    getPrimarySegments(url: string): string[];
    private _getPrimarySegmentsFromUrlTree;
    /**
     * Tells whether the given url matches the given path.
     *
     * @param urlSegments   string or array of url segments. When it's a string, the preceding
     *                      site-context params are ignored (i.e. '/electronics-spa/en/USD/...')
     *
     * @param pathSegments  string or array of path segments. Dynamic params are allowed in the
     *                      path shape, i.e. `/url/:param1/with/:param2`.
     */
    matchPath(urlSegments: string | string[], pathSegments: string | string[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<UrlParsingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UrlParsingService>;
}
