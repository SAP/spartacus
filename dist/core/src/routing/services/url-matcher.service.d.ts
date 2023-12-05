import { UrlMatcher } from '@angular/router';
import { GlobService } from '../../util/glob.service';
import * as i0 from "@angular/core";
export declare class UrlMatcherService {
    protected globService: GlobService;
    constructor(globService: GlobService);
    /**
     * Returns a matcher that is always fails
     */
    getFalsy(): UrlMatcher;
    /**
     * Returns a matcher for given list of paths
     */
    getFromPaths(paths: string[]): UrlMatcher;
    /**
     * Returns a matcher that combines the given matchers
     * */
    getCombined(matchers: UrlMatcher[]): UrlMatcher;
    /**
     * Similar to Angular's defaultUrlMatcher. Differences:
     * - the `path` comes from function's argument, not from `route.path`
     * - the empty path `''` is handled here, but in Angular is handled one level higher in the match() function
     */
    protected getFromPath(path?: string): UrlMatcher;
    /**
     * Returns URL matcher that accepts almost everything (like `**` route), but not paths accepted by the given matcher
     */
    getOpposite(originalMatcher: UrlMatcher): UrlMatcher;
    /**
     * Returns URL matcher for the given list of glob-like patterns. Each pattern must start with `/` or `!/`.
     */
    getFromGlob(globPatterns: string[]): UrlMatcher;
    static ɵfac: i0.ɵɵFactoryDeclaration<UrlMatcherService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UrlMatcherService>;
}
