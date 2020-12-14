import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  BreakPoint,
  BREAKPOINT,
  LayoutBreakPoints,
  LayoutConfig,
} from '../config/layout-config';

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
@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private _breakpoints: BREAKPOINT[];

  breakpoint$: Observable<BREAKPOINT> = isPlatformBrowser(this.platform)
    ? this.winRef.resize$.pipe(
        map((event) => this.getBreakpoint((<Window>event.target).innerWidth)),
        distinctUntilChanged()
      )
    : of(this.fallbackBreakpoint);

  constructor(
    protected winRef: WindowRef,
    protected layoutConfig: LayoutConfig,
    @Inject(PLATFORM_ID) protected platform: any
  ) {}

  /**
   * Returns the breakpoints for the storefront layout.
   *
   * The breakpoints are driven by the `LayoutConfig.breakpoints` and sorted based on
   * the given screen size.
   */
  get breakpoints(): BREAKPOINT[] {
    if (!this._breakpoints) {
      this._breakpoints = this.resolveBreakpointsFromConfig();
    }
    return this._breakpoints;
  }

  /**
   * Returns the _maximum_ size for the breakpoint, given by the `LayoutConfig.breakpoints`
   * configuration.
   */
  getSize(breakpoint: BREAKPOINT): number {
    return (
      this.getMaxSize(breakpoint) ??
      // if there's no direct max value or explicit max value
      // we must derive the max value from the previous min
      this.getMinSize(
        this.breakpoints?.[this.breakpoints.indexOf(breakpoint) + 1]
      )
    );
  }

  /**
   * Indicates whether the current screen size is smaller than the maximum size of the
   * given breakpoint.
   *
   * If the given breakpoint is `BREAKPOINT.md`, the method returns `true` when the
   * window innerWidth is smaller than the configured size of `BREAKPOINT.md`.
   */
  isDown(breakpoint: BREAKPOINT): Observable<boolean> {
    return this.breakpoint$.pipe(
      map((br) =>
        this.breakpoints
          .slice(0, this.breakpoints.indexOf(breakpoint) + 1)
          .includes(br)
      )
    );
  }

  /**
   * Indicates whether the current screen size is larger than the minimum size of the
   * given breakpoint.
   *
   * If the given breakpoint is `BREAKPOINT.md`, the method returns `true` when the
   * window innerWidth is larger than the configured size of `BREAKPOINT.sm`.
   */
  isUp(breakpoint: BREAKPOINT): Observable<boolean> {
    return this.breakpoint$.pipe(
      map((br) =>
        this.breakpoints
          .slice(this.breakpoints.indexOf(breakpoint))
          .includes(br)
      )
    );
  }

  /**
   * Indicates whether the given breakpoint fits in the current screen size.
   */
  isEqual(breakpoint: BREAKPOINT): Observable<boolean> {
    return this.breakpoint$.pipe(map((br) => br === breakpoint));
  }

  /**
   * Returns the fallback breakpoint in case no breakpoint can be resolved. This is
   * typically the case when we're on SSR without an actual window.
   *
   * Returns the smallest screen size (mobile first).
   */
  protected get fallbackBreakpoint(): BREAKPOINT {
    return this.breakpoints?.[0];
  }

  /**
   * Resolves the breakpoints and sorts them according to the configured size.
   *
   * The sort order is by small to large screens.
   */
  protected resolveBreakpointsFromConfig(): BREAKPOINT[] {
    const sortByScreenSize = (next: BREAKPOINT, prev: BREAKPOINT): number => {
      const maxNext = Math.max(
        this.getMinSize(next) + 1 || 0,
        this.getMaxSize(next) || 0
      );
      const maxPrev = Math.max(
        this.getMinSize(prev) + 1 || 0,
        this.getMaxSize(prev) || 0
      );
      return maxNext < maxPrev ? -1 : 0;
    };
    return (Object.keys(this.config) as BREAKPOINT[]).sort(sortByScreenSize);
  }

  /**
   * Returns the _maximum_ size for the breakpoint, given by the
   * `LayoutConfig.breakpoints` configuration. We will try to resolve the
   * max size form the current breakpoint, but if this is not available, we
   * resolve it form the next breakpoint
   */
  protected getMaxSize(breakpoint: BREAKPOINT): number {
    const breakpointConfig = this.config[breakpoint];

    if (!breakpointConfig) {
      return null;
    }

    // we treat numbers as the max number by default
    if (typeof breakpointConfig === 'number') {
      return breakpointConfig as number;
    } else if (breakpointConfig.max) {
      return breakpointConfig.max;
    } else {
      return null;
    }
  }

  protected getMinSize(breakpoint: BREAKPOINT): number {
    return (this.config[breakpoint] as BreakPoint)?.min;
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
  protected getBreakpoint(windowWidth: number): BREAKPOINT {
    return (
      this.breakpoints.find((br) => windowWidth < this.getSize(br)) ??
      this.breakpoints?.[this.breakpoints.length - 1]
    );
  }

  /**
   * Helper method to return the breakpoint configuration.
   */
  protected get config(): LayoutBreakPoints {
    return this.layoutConfig?.breakpoints || {};
  }
}
