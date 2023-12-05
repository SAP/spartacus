/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../config/layout-config";
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
export class BreakpointService {
    constructor(winRef, layoutConfig, platform) {
        this.winRef = winRef;
        this.layoutConfig = layoutConfig;
        this.platform = platform;
        this.breakpoint$ = isPlatformBrowser(this.platform)
            ? this.winRef.resize$.pipe(map((event) => this.getBreakpoint(event.target.innerWidth)), distinctUntilChanged())
            : of(this.fallbackBreakpoint);
    }
    /**
     * Returns the breakpoints for the storefront layout.
     *
     * The breakpoints are driven by the `LayoutConfig.breakpoints` and sorted based on
     * the given screen size.
     */
    get breakpoints() {
        if (!this._breakpoints) {
            this._breakpoints = this.resolveBreakpointsFromConfig();
        }
        return this._breakpoints;
    }
    /**
     * Returns the _maximum_ size for the breakpoint, given by the `LayoutConfig.breakpoints`
     * configuration.
     */
    getSize(breakpoint) {
        return (this.getMaxSize(breakpoint) ??
            // if there's no direct max value or explicit max value
            // we must derive the max value from the previous min
            this.getMinSize(this.breakpoints?.[this.breakpoints.indexOf(breakpoint) + 1]));
    }
    /**
     * Indicates whether the current screen size is smaller than the maximum size of the
     * given breakpoint.
     *
     * If the given breakpoint is `BREAKPOINT.md`, the method returns `true` when the
     * window innerWidth is smaller than the configured size of `BREAKPOINT.md`.
     */
    isDown(breakpoint) {
        return this.breakpoint$.pipe(map((br) => this.breakpoints
            .slice(0, this.breakpoints.indexOf(breakpoint) + 1)
            .includes(br)));
    }
    /**
     * Indicates whether the current screen size is larger than the minimum size of the
     * given breakpoint.
     *
     * If the given breakpoint is `BREAKPOINT.md`, the method returns `true` when the
     * window innerWidth is larger than the configured size of `BREAKPOINT.sm`.
     */
    isUp(breakpoint) {
        return this.breakpoint$.pipe(map((br) => this.breakpoints
            .slice(this.breakpoints.indexOf(breakpoint))
            .includes(br)));
    }
    /**
     * Indicates whether the given breakpoint fits in the current screen size.
     */
    isEqual(breakpoint) {
        return this.breakpoint$.pipe(map((br) => br === breakpoint));
    }
    /**
     * Returns the fallback breakpoint in case no breakpoint can be resolved. This is
     * typically the case when we're on SSR without an actual window.
     *
     * Returns the smallest screen size (mobile first).
     */
    get fallbackBreakpoint() {
        return this.breakpoints?.[0];
    }
    /**
     * Resolves the breakpoints and sorts them according to the configured size.
     *
     * The sort order is by small to large screens.
     */
    resolveBreakpointsFromConfig() {
        const sortByScreenSize = (next, prev) => {
            const nextMinSize = this.getMinSize(next);
            const maxNext = Math.max(nextMinSize ? nextMinSize + 1 : 0, this.getMaxSize(next) || 0);
            const preMinSize = this.getMinSize(prev);
            const maxPrev = Math.max(preMinSize ? preMinSize + 1 : 0, this.getMaxSize(prev) || 0);
            return maxNext < maxPrev ? -1 : 0;
        };
        return Object.keys(this.config).sort(sortByScreenSize);
    }
    /**
     * Returns the _maximum_ size for the breakpoint, given by the
     * `LayoutConfig.breakpoints` configuration. We will try to resolve the
     * max size form the current breakpoint, but if this is not available, we
     * resolve it form the next breakpoint
     */
    getMaxSize(breakpoint) {
        const breakpointConfig = this.config[breakpoint];
        if (!breakpointConfig) {
            return null;
        }
        // we treat numbers as the max number by default
        if (typeof breakpointConfig === 'number') {
            return breakpointConfig;
        }
        else if (breakpointConfig.max) {
            return breakpointConfig.max;
        }
        else {
            return null;
        }
    }
    getMinSize(breakpoint) {
        return this.config[breakpoint]?.min ?? null;
    }
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
    getBreakpoint(windowWidth) {
        return (this.breakpoints.find((br) => {
            const size = this.getSize(br);
            return size !== null && windowWidth < size;
        }) ?? this.breakpoints?.[this.breakpoints.length - 1]);
    }
    /**
     * Helper method to return the breakpoint configuration.
     */
    get config() {
        return this.layoutConfig?.breakpoints || {};
    }
}
BreakpointService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BreakpointService, deps: [{ token: i1.WindowRef }, { token: i2.LayoutConfig }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
BreakpointService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BreakpointService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BreakpointService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.LayoutConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvYnJlYWtwb2ludC9icmVha3BvaW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVEzRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFVNUIsWUFDWSxNQUFpQixFQUNqQixZQUEwQixFQUNMLFFBQWE7UUFGbEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNMLGFBQVEsR0FBUixRQUFRLENBQUs7UUFWOUMsZ0JBQVcsR0FBMkIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQVUsS0FBSyxDQUFDLE1BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUNyRSxvQkFBb0IsRUFBRSxDQUN2QjtZQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFNN0IsQ0FBQztJQUVKOzs7OztPQUtHO0lBQ0gsSUFBSSxXQUFXO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVB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VSxFQUFFLE1BQU07aUJBQ25COzswQkFjSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBCcmVha1BvaW50LFxuICBCUkVBS1BPSU5ULFxuICBMYXlvdXRCcmVha1BvaW50cyxcbiAgTGF5b3V0Q29uZmlnLFxufSBmcm9tICcuLi9jb25maWcvbGF5b3V0LWNvbmZpZyc7XG5cbi8qKlxuICogVGhlIGBCcmVha3BvaW50U2VydmljZWAgcmVzb2x2ZXMgdGhlIHZhcmlvdXMgc2NyZWVuIHNpemVzIHRoYXQgYXJlIHVzZWQgaW5cbiAqIHRoZSBzdG9yZWZyb250LiBUaGUgc2NyZWVuIHNpemVzIGFyZSBnbG9iYWxseSBjb25maWd1cmFibGUgYmFzZWQgb24geW91clxuICogbGF5b3V0IHJlcXVpcmVtZW50cy4gWW91IGNhbiBhZGp1c3QgdGhlIHNjcmVlbiBzaXplcyBieSBzZXR0aW5nIHRoZSBtaW5pbXVtXG4gKiBhbmQvb3IgbWF4aW11bSBzaXplIGZvciBhIGJyZWFrcG9pbnQsIGFzIHdlbGwgYXMgZXh0ZW5kaW5nIHRoZSBjb25maWd1cmF0aW9uXG4gKiB3aXRoIG5ldyBzY3JlZW5zLlxuICpcbiAqIEJ5IGRlZmF1bHQsIHRoZSBgQnJlYWtwb2ludFNlcnZpY2VgIGlzIGJhc2VkIG9uIHRoZSBicmVha3BvaW50cyBmcm9tIHRoZVxuICogQm9vdHN0cmFwIHVpIGxpYnJhcnk6XG4gKiAtIGB4c2A6IDwgNTc2cHhcbiAqIC0gYHNtYDogNTc2cHggLSA3NjdweFxuICogLSBgbWRgOiA3NjhweCAtIDk5MXB4XG4gKiAtIGBsZ2A6IDk5MnB4IC0gMTE5OXB4XG4gKiAtIGB4bGA6ID49IDEyMDBweFxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQnJlYWtwb2ludFNlcnZpY2Uge1xuICBwcml2YXRlIF9icmVha3BvaW50czogQlJFQUtQT0lOVFtdO1xuXG4gIGJyZWFrcG9pbnQkOiBPYnNlcnZhYmxlPEJSRUFLUE9JTlQ+ID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybSlcbiAgICA/IHRoaXMud2luUmVmLnJlc2l6ZSQucGlwZShcbiAgICAgICAgbWFwKChldmVudCkgPT4gdGhpcy5nZXRCcmVha3BvaW50KCg8V2luZG93PmV2ZW50LnRhcmdldCkuaW5uZXJXaWR0aCkpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICApXG4gICAgOiBvZih0aGlzLmZhbGxiYWNrQnJlYWtwb2ludCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZyxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm06IGFueVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJyZWFrcG9pbnRzIGZvciB0aGUgc3RvcmVmcm9udCBsYXlvdXQuXG4gICAqXG4gICAqIFRoZSBicmVha3BvaW50cyBhcmUgZHJpdmVuIGJ5IHRoZSBgTGF5b3V0Q29uZmlnLmJyZWFrcG9pbnRzYCBhbmQgc29ydGVkIGJhc2VkIG9uXG4gICAqIHRoZSBnaXZlbiBzY3JlZW4gc2l6ZS5cbiAgICovXG4gIGdldCBicmVha3BvaW50cygpOiBCUkVBS1BPSU5UW10ge1xuICAgIGlmICghdGhpcy5fYnJlYWtwb2ludHMpIHtcbiAgICAgIHRoaXMuX2JyZWFrcG9pbnRzID0gdGhpcy5yZXNvbHZlQnJlYWtwb2ludHNGcm9tQ29uZmlnKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9icmVha3BvaW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBfbWF4aW11bV8gc2l6ZSBmb3IgdGhlIGJyZWFrcG9pbnQsIGdpdmVuIGJ5IHRoZSBgTGF5b3V0Q29uZmlnLmJyZWFrcG9pbnRzYFxuICAgKiBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgZ2V0U2l6ZShicmVha3BvaW50OiBCUkVBS1BPSU5UKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0TWF4U2l6ZShicmVha3BvaW50KSA/P1xuICAgICAgLy8gaWYgdGhlcmUncyBubyBkaXJlY3QgbWF4IHZhbHVlIG9yIGV4cGxpY2l0IG1heCB2YWx1ZVxuICAgICAgLy8gd2UgbXVzdCBkZXJpdmUgdGhlIG1heCB2YWx1ZSBmcm9tIHRoZSBwcmV2aW91cyBtaW5cbiAgICAgIHRoaXMuZ2V0TWluU2l6ZShcbiAgICAgICAgdGhpcy5icmVha3BvaW50cz8uW3RoaXMuYnJlYWtwb2ludHMuaW5kZXhPZihicmVha3BvaW50KSArIDFdXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY3VycmVudCBzY3JlZW4gc2l6ZSBpcyBzbWFsbGVyIHRoYW4gdGhlIG1heGltdW0gc2l6ZSBvZiB0aGVcbiAgICogZ2l2ZW4gYnJlYWtwb2ludC5cbiAgICpcbiAgICogSWYgdGhlIGdpdmVuIGJyZWFrcG9pbnQgaXMgYEJSRUFLUE9JTlQubWRgLCB0aGUgbWV0aG9kIHJldHVybnMgYHRydWVgIHdoZW4gdGhlXG4gICAqIHdpbmRvdyBpbm5lcldpZHRoIGlzIHNtYWxsZXIgdGhhbiB0aGUgY29uZmlndXJlZCBzaXplIG9mIGBCUkVBS1BPSU5ULm1kYC5cbiAgICovXG4gIGlzRG93bihicmVha3BvaW50OiBCUkVBS1BPSU5UKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuYnJlYWtwb2ludCQucGlwZShcbiAgICAgIG1hcCgoYnIpID0+XG4gICAgICAgIHRoaXMuYnJlYWtwb2ludHNcbiAgICAgICAgICAuc2xpY2UoMCwgdGhpcy5icmVha3BvaW50cy5pbmRleE9mKGJyZWFrcG9pbnQpICsgMSlcbiAgICAgICAgICAuaW5jbHVkZXMoYnIpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY3VycmVudCBzY3JlZW4gc2l6ZSBpcyBsYXJnZXIgdGhhbiB0aGUgbWluaW11bSBzaXplIG9mIHRoZVxuICAgKiBnaXZlbiBicmVha3BvaW50LlxuICAgKlxuICAgKiBJZiB0aGUgZ2l2ZW4gYnJlYWtwb2ludCBpcyBgQlJFQUtQT0lOVC5tZGAsIHRoZSBtZXRob2QgcmV0dXJucyBgdHJ1ZWAgd2hlbiB0aGVcbiAgICogd2luZG93IGlubmVyV2lkdGggaXMgbGFyZ2VyIHRoYW4gdGhlIGNvbmZpZ3VyZWQgc2l6ZSBvZiBgQlJFQUtQT0lOVC5zbWAuXG4gICAqL1xuICBpc1VwKGJyZWFrcG9pbnQ6IEJSRUFLUE9JTlQpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5icmVha3BvaW50JC5waXBlKFxuICAgICAgbWFwKChicikgPT5cbiAgICAgICAgdGhpcy5icmVha3BvaW50c1xuICAgICAgICAgIC5zbGljZSh0aGlzLmJyZWFrcG9pbnRzLmluZGV4T2YoYnJlYWtwb2ludCkpXG4gICAgICAgICAgLmluY2x1ZGVzKGJyKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGJyZWFrcG9pbnQgZml0cyBpbiB0aGUgY3VycmVudCBzY3JlZW4gc2l6ZS5cbiAgICovXG4gIGlzRXF1YWwoYnJlYWtwb2ludDogQlJFQUtQT0lOVCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmJyZWFrcG9pbnQkLnBpcGUobWFwKChicikgPT4gYnIgPT09IGJyZWFrcG9pbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmYWxsYmFjayBicmVha3BvaW50IGluIGNhc2Ugbm8gYnJlYWtwb2ludCBjYW4gYmUgcmVzb2x2ZWQuIFRoaXMgaXNcbiAgICogdHlwaWNhbGx5IHRoZSBjYXNlIHdoZW4gd2UncmUgb24gU1NSIHdpdGhvdXQgYW4gYWN0dWFsIHdpbmRvdy5cbiAgICpcbiAgICogUmV0dXJucyB0aGUgc21hbGxlc3Qgc2NyZWVuIHNpemUgKG1vYmlsZSBmaXJzdCkuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGZhbGxiYWNrQnJlYWtwb2ludCgpOiBCUkVBS1BPSU5UIHtcbiAgICByZXR1cm4gdGhpcy5icmVha3BvaW50cz8uWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBicmVha3BvaW50cyBhbmQgc29ydHMgdGhlbSBhY2NvcmRpbmcgdG8gdGhlIGNvbmZpZ3VyZWQgc2l6ZS5cbiAgICpcbiAgICogVGhlIHNvcnQgb3JkZXIgaXMgYnkgc21hbGwgdG8gbGFyZ2Ugc2NyZWVucy5cbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlQnJlYWtwb2ludHNGcm9tQ29uZmlnKCk6IEJSRUFLUE9JTlRbXSB7XG4gICAgY29uc3Qgc29ydEJ5U2NyZWVuU2l6ZSA9IChuZXh0OiBCUkVBS1BPSU5ULCBwcmV2OiBCUkVBS1BPSU5UKTogbnVtYmVyID0+IHtcbiAgICAgIGNvbnN0IG5leHRNaW5TaXplID0gdGhpcy5nZXRNaW5TaXplKG5leHQpO1xuICAgICAgY29uc3QgbWF4TmV4dCA9IE1hdGgubWF4KFxuICAgICAgICBuZXh0TWluU2l6ZSA/IG5leHRNaW5TaXplICsgMSA6IDAsXG4gICAgICAgIHRoaXMuZ2V0TWF4U2l6ZShuZXh0KSB8fCAwXG4gICAgICApO1xuICAgICAgY29uc3QgcHJlTWluU2l6ZSA9IHRoaXMuZ2V0TWluU2l6ZShwcmV2KTtcbiAgICAgIGNvbnN0IG1heFByZXYgPSBNYXRoLm1heChcbiAgICAgICAgcHJlTWluU2l6ZSA/IHByZU1pblNpemUgKyAxIDogMCxcbiAgICAgICAgdGhpcy5nZXRNYXhTaXplKHByZXYpIHx8IDBcbiAgICAgICk7XG4gICAgICByZXR1cm4gbWF4TmV4dCA8IG1heFByZXYgPyAtMSA6IDA7XG4gICAgfTtcbiAgICByZXR1cm4gKE9iamVjdC5rZXlzKHRoaXMuY29uZmlnKSBhcyBCUkVBS1BPSU5UW10pLnNvcnQoc29ydEJ5U2NyZWVuU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgX21heGltdW1fIHNpemUgZm9yIHRoZSBicmVha3BvaW50LCBnaXZlbiBieSB0aGVcbiAgICogYExheW91dENvbmZpZy5icmVha3BvaW50c2AgY29uZmlndXJhdGlvbi4gV2Ugd2lsbCB0cnkgdG8gcmVzb2x2ZSB0aGVcbiAgICogbWF4IHNpemUgZm9ybSB0aGUgY3VycmVudCBicmVha3BvaW50LCBidXQgaWYgdGhpcyBpcyBub3QgYXZhaWxhYmxlLCB3ZVxuICAgKiByZXNvbHZlIGl0IGZvcm0gdGhlIG5leHQgYnJlYWtwb2ludFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE1heFNpemUoYnJlYWtwb2ludDogQlJFQUtQT0lOVCk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRDb25maWcgPSB0aGlzLmNvbmZpZ1ticmVha3BvaW50XTtcblxuICAgIGlmICghYnJlYWtwb2ludENvbmZpZykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gd2UgdHJlYXQgbnVtYmVycyBhcyB0aGUgbWF4IG51bWJlciBieSBkZWZhdWx0XG4gICAgaWYgKHR5cGVvZiBicmVha3BvaW50Q29uZmlnID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGJyZWFrcG9pbnRDb25maWcgYXMgbnVtYmVyO1xuICAgIH0gZWxzZSBpZiAoYnJlYWtwb2ludENvbmZpZy5tYXgpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50Q29uZmlnLm1heDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldE1pblNpemUoYnJlYWtwb2ludDogQlJFQUtQT0lOVCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiAodGhpcy5jb25maWdbYnJlYWtwb2ludF0gYXMgQnJlYWtQb2ludCk/Lm1pbiA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBgQlJFQUtQT0lOVGAgZm9yIHRoZSBnaXZlbiB3aW5kb3cgc2l6ZS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgdHJpZXMgdG8gbWF0Y2ggdGhlIGNsb3Nlc3QgYnJlYWtwb2ludCBmb3IgdGhlIGdpdmVuXG4gICAqIHdpbmRvdyBzaXplLiBXZSdsbCBmYWxsYmFjayB0byB0aGUgYGxhcmdlc3RgIHNpemUgaW4gY2FzZSB0aGUgd2luZG93XG4gICAqIGlzIGdyZWF0ZXIgdGhhbiB0aGUgbGFyZ2VzdCBjb25maWd1cmFibGUgYnJlYWtwb2ludC5cbiAgICpcbiAgICogVGhlIHdpbmRvd1dpZHRoIHNob3VsZCBiZSBzbWFsbGVyIHRoYW4gdGhlIG1heGltdW0gc2l6ZSBvZiBhbnkgb2YgdGhlXG4gICAqIHNjcmVlbiBzaXplcyBkZWZpbmVkIGluIHRoZSBgTGF5b3V0Q29uZmlnLmJyZWFrcG9pbnRzYC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRCcmVha3BvaW50KHdpbmRvd1dpZHRoOiBudW1iZXIpOiBCUkVBS1BPSU5UIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5icmVha3BvaW50cy5maW5kKChicikgPT4ge1xuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5nZXRTaXplKGJyKTtcbiAgICAgICAgcmV0dXJuIHNpemUgIT09IG51bGwgJiYgd2luZG93V2lkdGggPCBzaXplO1xuICAgICAgfSkgPz8gdGhpcy5icmVha3BvaW50cz8uW3RoaXMuYnJlYWtwb2ludHMubGVuZ3RoIC0gMV1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gcmV0dXJuIHRoZSBicmVha3BvaW50IGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGNvbmZpZygpOiBMYXlvdXRCcmVha1BvaW50cyB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0Q29uZmlnPy5icmVha3BvaW50cyB8fCB7fTtcbiAgfVxufVxuIl19