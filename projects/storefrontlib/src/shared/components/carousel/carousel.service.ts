import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private winRef: WindowRef) {}

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
    return this.winRef.resize$.pipe(
      map(() => (nativeElement as HTMLElement).clientWidth),
      map((totalWidth) => this.calculateItems(totalWidth, itemWidth))
    );
  }

  /**
   * Calculates the number of items per given hostSize.  calculated based on the given
   * intended size in pixels or percentages. The
   *
   * @param availableWidth The available width in pixels for the carousel items.
   * @param itemWidth The width per carousel item, in px or percentage.
   */
  private calculateItems(availableWidth: number, itemWidth: string) {
    let calculatedItems = 0;
    if (itemWidth.endsWith('px')) {
      const num = itemWidth.substring(0, itemWidth.length - 2);
      calculatedItems = availableWidth / <number>(<any>num);
    }

    if (itemWidth.endsWith('%')) {
      const perc = itemWidth.substring(0, itemWidth.length - 1);
      calculatedItems =
        availableWidth / (availableWidth * (<number>(<any>perc) / 100));
    }

    return Math.floor(calculatedItems) || 1;
  }
}
