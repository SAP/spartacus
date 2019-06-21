import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { BreakpointService } from 'projects/storefrontlib/src/layout';
import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(
    private winRef: WindowRef,
    private breakpointService: BreakpointService
  ) {}

  /**
   * The number of items per slide is calculated by the help of
   * the item width and the available width of the host element.
   * This appoach makes it possible to place the carousel in different
   * layouts. Instead of using the page breakpoints, the host size is
   * taken into account.
   *
   * Since there's no element resize API available, we use the
   * window `resize` event, so that we can adjust the number of items
   * whenever the window got resized.
   */
  getItemsPerSlide(
    nativeElement: HTMLElement,
    itemWidth: string
  ): Observable<number> {
    // TODO: ensure SSR
    return fromEvent(this.winRef.nativeWindow, 'resize').pipe(
      map(_ => (nativeElement as HTMLElement).clientWidth),
      startWith((nativeElement as HTMLElement).clientWidth),
      debounceTime(100),
      map(totalWidth => this.calculateItems(totalWidth, itemWidth)),
      distinctUntilChanged()
    );

    // return iif(
    //   () => Boolean(this.winRef.nativeWindow),
    //   fromEvent(this.winRef.nativeWindow, 'resize').pipe(
    //     map(_ => (nativeElement as HTMLElement).clientWidth),
    //     startWith((nativeElement as HTMLElement).clientWidth),
    //     debounceTime(100),
    //     map(totalWidth => this.calculateItems(totalWidth, itemWidth)),
    //     distinctUntilChanged()
    //   ),
    //   // no window object (SSR), mobile first
    //   of(
    //     this.calculateItems(
    //       this.breakpointService.getSize(BREAKPOINT.xs),
    //       itemWidth
    //     )
    //   )
    // );
  }

  /**
   * Returns the exact size per item, calculated based on the given
   * intended size in pixels or percentages.
   *
   * @param hostSize The exact hostSize in pixels
   * @param itemWidth The width of carousel item in px or percentage
   */
  private calculateItems(hostSize: number, itemWidth: string) {
    let calculatedItems = 0;
    if (itemWidth.endsWith('px')) {
      const num = itemWidth.substring(0, itemWidth.length - 2);
      calculatedItems = hostSize / <number>(<any>num);
    }

    if (itemWidth.endsWith('%')) {
      const perc = itemWidth.substring(0, itemWidth.length - 1);
      calculatedItems = hostSize / (hostSize * (<number>(<any>perc) / 100));
    }

    return Math.round(calculatedItems) || 1;
  }
}
