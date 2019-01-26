import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { fromEvent, Observable } from 'rxjs';
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
    return fromEvent(this.window, 'resize').pipe(
      debounceTime(300),
      startWith({ target: this.window }),
      map(event => this.getBreakpoint((<Window>event.target).innerWidth)),
      distinctUntilChanged()
    );
  }

  isUp(breakpoint: BREAKPOINT, windowWidth?: number): boolean {
    if (!windowWidth) {
      windowWidth = this.window.innerWidth;
    }
    return this.window.innerWidth >= this.getSize(breakpoint);
  }

  isDown(breakpoint: BREAKPOINT, windowWidth?: number): boolean {
    if (!windowWidth) {
      windowWidth = this.window.innerWidth;
    }
    return windowWidth <= this.getSize(breakpoint);
  }

  protected getBreakpoint(windowWidth: number) {
    const breakpointSize = [
      BREAKPOINT.lg,
      BREAKPOINT.md,
      BREAKPOINT.sm,
      BREAKPOINT.xs
    ].find(br => this.isUp(br, windowWidth));

    return BREAKPOINT[breakpointSize || BREAKPOINT.lg];
  }

  protected getSize(breakpoint: BREAKPOINT): number {
    return this.config.breakpoints[breakpoint];
  }

  get window() {
    return this.winRef.nativeWindow;
  }
}
