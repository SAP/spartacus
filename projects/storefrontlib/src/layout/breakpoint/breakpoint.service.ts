import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BREAKPOINT, LayoutConfig } from '../config/layout-config';
import { LayoutInterfaces } from '../layout.interfaces';

const DEFAULT_BREAKPOINTS = {
  [BREAKPOINT.xs]: 576,
  [BREAKPOINT.sm]: 768,
  [BREAKPOINT.md]: 992,
  [BREAKPOINT.lg]: 1200,
};

@Injectable({
  providedIn: 'root',
})
export class BreakpointService implements LayoutInterfaces.BreakpointService {
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

  getSize(breakpoint: BREAKPOINT): number {
    return this.config.breakpoints?.hasOwnProperty(breakpoint)
      ? this.config.breakpoints[breakpoint]
      : DEFAULT_BREAKPOINTS[breakpoint];
  }

  get breakpoints(): BREAKPOINT[] {
    return [
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl,
    ];
  }

  isDown(breakpoint: BREAKPOINT): Observable<boolean> {
    return this.breakpoint$.pipe(
      map((br) =>
        this.breakpoints
          .slice(0, this.breakpoints.indexOf(breakpoint) + 1)
          .includes(br)
      )
    );
  }

  isUp(breakpoint: BREAKPOINT): Observable<boolean> {
    return this.breakpoint$.pipe(
      map((br) =>
        this.breakpoints
          .slice(this.breakpoints.indexOf(breakpoint))
          .includes(br)
      )
    );
  }

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
