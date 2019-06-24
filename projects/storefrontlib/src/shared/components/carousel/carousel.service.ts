import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { fromEvent, iif, Observable, of } from 'rxjs';
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
  constructor(private winRef: WindowRef) {}

  /**
   * The number of items shown in the carousel is calculated dividing
   * the host element width with the minimum item width.
   */
  getSize(nativeElement: HTMLElement, itemWidth: number): Observable<number> {
    return iif(
      () => Boolean(this.winRef.nativeWindow),
      fromEvent(this.winRef.nativeWindow, 'resize').pipe(
        map(_ => (nativeElement as HTMLElement).clientWidth),
        startWith((nativeElement as HTMLElement).clientWidth),
        debounceTime(100),
        map(totalWidth => Math.round(totalWidth / itemWidth)),
        distinctUntilChanged()
      ),
      of(3)
    );
  }
}
