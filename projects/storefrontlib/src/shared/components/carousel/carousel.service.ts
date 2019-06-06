import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private winRef: WindowRef) {}

  /**
   * The number of items shown in the carousel can be calculated
   * the standard implemenattions uses the element size to calculate
   * the items that fit in the carousel.
   */
  getSize(nativeElement: HTMLElement, width: number) {
    return fromEvent(this.winRef.nativeWindow, 'resize').pipe(
      tap(x => console.log('iiii', x)),
      map(_ => (nativeElement as HTMLElement).clientWidth),
      startWith((nativeElement as HTMLElement).clientWidth),
      // avoid to much calls
      debounceTime(100),
      map((innerWidth: any) => {
        console.log('i', innerWidth);
        return Math.round(innerWidth / width);
        // return itemsPerPage > 2 ? 4 : itemsPerPage;
      }),
      // only emit new size when the size changed
      distinctUntilChanged()
    );
  }
}
