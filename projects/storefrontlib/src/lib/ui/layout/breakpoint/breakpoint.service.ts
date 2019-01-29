import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { fromEvent, Observable, of } from 'rxjs';
import {
  debounceTime,
  startWith,
  map,
  distinctUntilChanged
} from 'rxjs/operators';
import { LayoutConfig, BREAKPOINT } from '../config/layout-config';

@Injectable()
export class BreakpointService {
  constructor(private winRef: WindowRef, private config: LayoutConfig) {}

  get breakpoint$(): Observable<BREAKPOINT> {
    if (!this.window) {
      return of(BREAKPOINT.xs);
    }
    return fromEvent(this.window, 'resize').pipe(
      debounceTime(300),
      startWith({ target: this.window }),
      map(event => this.getBreakpoint((<Window>event.target).innerWidth)),
      distinctUntilChanged()
    );
  }

  get breakpoints(): BREAKPOINT[] {
    return [
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl
    ];
  }

  protected getBreakpoint(windowWidth: number) {
    const breakpoint = this.getClosest(windowWidth);
    return BREAKPOINT[breakpoint || BREAKPOINT.lg];
  }

  protected getClosest(windowWidth?: number): BREAKPOINT {
    if (!windowWidth) {
      windowWidth = this.window.innerWidth;
    }

    return windowWidth < this.getSize(BREAKPOINT.xs)
      ? BREAKPOINT.xs
      : this.breakpoints.reverse().find(br => windowWidth >= this.getSize(br));
  }

  protected getSize(breakpoint: BREAKPOINT): number {
    return this.config.breakpoints[breakpoint];
  }

  get window() {
    return this.winRef.nativeWindow;
  }
}
