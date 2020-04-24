import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BREAKPOINT, LayoutConfig } from '../config/layout-config';

const DEFAULT_BREAKPOINTS = {
  [BREAKPOINT.xs]: 576,
  [BREAKPOINT.sm]: 768,
  [BREAKPOINT.md]: 992,
  [BREAKPOINT.lg]: 1200,
};

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  constructor(private winRef: WindowRef, private config: LayoutConfig) {}

  get breakpoint$(): Observable<BREAKPOINT> {
    if (!this.window) {
      return of(BREAKPOINT.xs);
    }
    return this.winRef.resize$.pipe(
      map((event) => this.getBreakpoint((<Window>event.target).innerWidth)),
      distinctUntilChanged()
    );
  }

  /**
   * Returns the _maximum_ size for the breakpint, given by the `LayoutConfig.breakpoints`
   * configuration. If no configuration is available for the given breakpoint, the
   * method will return the default values:
   * - xs: 567
   * - sm: 768
   * - md: 992
   * - lg: 1200
   */
  getSize(breakpoint: BREAKPOINT): number {
    return this.config.breakpoints?.hasOwnProperty(breakpoint)
      ? this.config.breakpoints[breakpoint]
      : DEFAULT_BREAKPOINTS[breakpoint];
  }

  /**
   * Returns all available breakpoints for the system.
   */
  get breakpoints(): BREAKPOINT[] {
    return [
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl,
    ];
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

  protected getBreakpoint(windowWidth: number): BREAKPOINT {
    const breakpoint = this.getClosest(windowWidth);
    return BREAKPOINT[breakpoint || BREAKPOINT.lg];
  }

  protected getClosest(windowWidth?: number): BREAKPOINT {
    if (!windowWidth) {
      windowWidth = this.window.innerWidth;
    }

    return windowWidth > this.getSize(BREAKPOINT.lg)
      ? BREAKPOINT.xl
      : this.breakpoints.find((br) => windowWidth <= this.getSize(br));
  }

  get window(): Window {
    return this.winRef.nativeWindow;
  }
}
