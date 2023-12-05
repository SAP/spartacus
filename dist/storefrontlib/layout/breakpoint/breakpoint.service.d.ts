import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { BREAKPOINT, LayoutBreakPoints, LayoutConfig } from '../config/layout-config';
import * as i0 from "@angular/core";
/**
 * The `BreakpointService` resolves the various screen sizes that are used in
 * the storefront. The screen sizes are globally configurable based on your
 * layout requirements. You can adjust the screen sizes by setting the minimum
 * and/or maximum size for a breakpoint, as well as extending the configuration
 * with new screens.
 *
 * By default, the `BreakpointService` is based on the breakpoints from the
 * Bootstrap ui library:
 * - `xs`: < 576px
 * - `sm`: 576px - 767px
 * - `md`: 768px - 991px
 * - `lg`: 992px - 1199px
 * - `xl`: >= 1200px
 */
export declare class BreakpointService {
    protected winRef: WindowRef;
    protected layoutConfig: LayoutConfig;
    protected platform: any;
    private _breakpoints;
    breakpoint$: Observable<BREAKPOINT>;
    constructor(winRef: WindowRef, layoutConfig: LayoutConfig, platform: any);
    /**
     * Returns the breakpoints for the storefront layout.
     *
     * The breakpoints are driven by the `LayoutConfig.breakpoints` and sorted based on
     * the given screen size.
     */
    get breakpoints(): BREAKPOINT[];
    /**
     * Returns the _maximum_ size for the breakpoint, given by the `LayoutConfig.breakpoints`
     * configuration.
     */
    getSize(breakpoint: BREAKPOINT): number | null;
    /**
     * Indicates whether the current screen size is smaller than the maximum size of the
     * given breakpoint.
     *
     * If the given breakpoint is `BREAKPOINT.md`, the method returns `true` when the
     * window innerWidth is smaller than the configured size of `BREAKPOINT.md`.
     */
    isDown(breakpoint: BREAKPOINT): Observable<boolean>;
    /**
     * Indicates whether the current screen size is larger than the minimum size of the
     * given breakpoint.
     *
     * If the given breakpoint is `BREAKPOINT.md`, the method returns `true` when the
     * window innerWidth is larger than the configured size of `BREAKPOINT.sm`.
     */
    isUp(breakpoint: BREAKPOINT): Observable<boolean>;
    /**
     * Indicates whether the given breakpoint fits in the current screen size.
     */
    isEqual(breakpoint: BREAKPOINT): Observable<boolean>;
    /**
     * Returns the fallback breakpoint in case no breakpoint can be resolved. This is
     * typically the case when we're on SSR without an actual window.
     *
     * Returns the smallest screen size (mobile first).
     */
    protected get fallbackBreakpoint(): BREAKPOINT;
    /**
     * Resolves the breakpoints and sorts them according to the configured size.
     *
     * The sort order is by small to large screens.
     */
    protected resolveBreakpointsFromConfig(): BREAKPOINT[];
    /**
     * Returns the _maximum_ size for the breakpoint, given by the
     * `LayoutConfig.breakpoints` configuration. We will try to resolve the
     * max size form the current breakpoint, but if this is not available, we
     * resolve it form the next breakpoint
     */
    protected getMaxSize(breakpoint: BREAKPOINT): number | null;
    protected getMinSize(breakpoint: BREAKPOINT): number | null;
    /**
     * Returns a `BREAKPOINT` for the given window size.
     *
     * This method tries to match the closest breakpoint for the given
     * window size. We'll fallback to the `largest` size in case the window
     * is greater than the largest configurable breakpoint.
     *
     * The windowWidth should be smaller than the maximum size of any of the
     * screen sizes defined in the `LayoutConfig.breakpoints`.
     */
    protected getBreakpoint(windowWidth: number): BREAKPOINT;
    /**
     * Helper method to return the breakpoint configuration.
     */
    protected get config(): LayoutBreakPoints;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreakpointService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BreakpointService>;
}
