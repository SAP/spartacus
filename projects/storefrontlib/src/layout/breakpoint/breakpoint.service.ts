import { Injectable } from '@angular/core';
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
 * The `BreakpointService` resolves the various screen sizes that are used in the
 * storefront. The screen sizes are globally configurable by breakpoint name and
 * min/max size. The sizes can be customized based on your layout requirements.
 *
 * By default, the `BreakpointService` is based on the breakpoints from the
 * Bootstrap ui library:
 * - `xs`: 0 - 576px
 * - `sm`: 576px - 768px
 * - `md`: 768px - 992px
 * - `lg`: 992px - 1200px
 * - `xl`: > 1200px
 */
@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private readonly _breakpoints = this.resolveBreakpointsFromConfig();

  private _breakpoint$: Observable<BREAKPOINT>;

  constructor(
    protected winRef: WindowRef,
    protected layoutConfig: LayoutConfig
  ) {}

  /**
   * Emits the current breakpoint. The current breakpoint is driven by the breakpoint
   * configuration and the actual window size.
   */
  get breakpoint$(): Observable<BREAKPOINT> {
    if (!this.window) {
      return of(this.breakpoints?.[0]);
    }
    if (!this._breakpoint$) {
      this._breakpoint$ = this.winRef.resize$.pipe(
        map((event) => this.getBreakpoint((<Window>event.target).innerWidth)),
        distinctUntilChanged()
      );
    }
    return this._breakpoint$;
  }

  /**
   * Returns the breakpoints for the storefront layout.
   *
   * The breakpoints are driven by the `LayoutConfig.breakpoints` and sorted based on
   * the given screen size.
   */
  get breakpoints(): BREAKPOINT[] {
    return [...this._breakpoints];
  }

  /**
   * Returns the _maximum_ size for the breakpoint, given by the `LayoutConfig.breakpoints`
   * configuration.
   */
  getSize(breakpoint: BREAKPOINT): number {
    const breakpointConfig = this.config[breakpoint];

    if (!breakpointConfig) {
      return null;
    }
    // we treat numbers as the max number by default
    if (typeof breakpointConfig === 'number') {
      return breakpointConfig as number;
    } else if (breakpointConfig.max) {
      return breakpointConfig.max;
    } else if (breakpointConfig?.min) {
      // if there's a `min` value only, we need to base the `max` value
      // on the next breakpoints `min`
      const i = this.breakpoints.indexOf(breakpoint);
      const next = this.breakpoints[i + 1];
      return (this.config[next] as BreakPoint)?.min;
    } else {
      // this must be last in range and there's not much what we can do.
      return null;
    }
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
   * Indicates whether the current screen size fits to the given breakpoint
   */
  isEqual(breakpoint: BREAKPOINT): Observable<boolean> {
    return this.breakpoint$.pipe(map((br) => br === breakpoint));
  }

  /**
   * Resolves the breakpoints and sorts them according to the configured size.
   *
   * The sort order is by small to large screens.
   */
  protected resolveBreakpointsFromConfig(): BREAKPOINT[] {
    const orderedBreakpoints = (Object.keys(this.config) as BREAKPOINT[]).sort(
      (next, prev) => {
        const prevMax = this.getMaxSize(next);
        const nextMax = this.getMaxSize(prev);
        if (!!prevMax || !!nextMax) {
          return !nextMax || nextMax > prevMax ? -1 : 0;
        } else {
          return this.getMinSize(next) > this.getMinSize(prev) ? 0 : -1;
        }
      }
    );
    return [...orderedBreakpoints];
  }

  /**
   * Returns the _maximum_ size for the breakpoint, given by the `LayoutConfig.breakpoints`
   * configuration.
   */
  protected getMaxSize(breakpoint: BREAKPOINT): number {
    const breakpointConfig = this.config[breakpoint];
    // we treat numbers as the max number by default
    if (typeof breakpointConfig === 'number') {
      return breakpointConfig as number;
    } else if (breakpointConfig.max) {
      return breakpointConfig.max;
    } else {
      return undefined;
    }
  }

  protected getMinSize(breakpoint: BREAKPOINT): number {
    return (this.config[breakpoint] as BreakPoint)?.min;
  }

  /**
   * Returns a `BREAKPOINT` for the given window size.
   *
   * This method tries to match the closest breakpoint for the give
   * window size. We'll fallback to the `largest` size in case the window
   * is greater than the largest configurable breakpoint.
   */
  protected getBreakpoint(windowWidth: number): BREAKPOINT {
    if (windowWidth === undefined) {
      windowWidth = window?.innerWidth || 0;
    }
    return (
      this.breakpoints.find((br) => windowWidth <= this.getSize(br)) ??
      this.breakpoints?.[this.breakpoints.length - 1]
    );
  }

  /**
   * Helper method to return the breakpoint configuration.
   */
  protected get config(): LayoutBreakPoints {
    return this.layoutConfig?.breakpoints || {};
  }

  /**
   * Helper method to return the breakpoint configuration.
   */
  protected get window(): Window {
    return this.winRef.nativeWindow;
  }
}
