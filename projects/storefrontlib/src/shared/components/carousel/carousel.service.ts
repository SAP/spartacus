import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CarouselButton,
  CarouselIndicator,
  CarouselNavigation,
} from './carousel.model';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private winRef: WindowRef) {}

  /**
   * Builds the navigation for the carousel. The navigation contains
   * the previous and next button as well as a set of indicators.
   */
  build(
    host: HTMLElement,
    visibleItems: number[],
    itemLength: number
  ): CarouselNavigation {
    const slides = this.getSlides(host);
    return slides.length > 1
      ? {
          previous: this.previousButton(visibleItems),
          next: this.nextButton(visibleItems, itemLength),
          indicators: this.indicators(host, slides),
        }
      : {};
  }

  /**
   * Returns a list of virtual slides.
   */
  protected getSlides(carouselHost: HTMLElement): number[] {
    return carouselHost.clientWidth > 0
      ? Array.from(
          Array(
            Math.ceil(carouselHost.scrollWidth / carouselHost.clientWidth)
          ).keys()
        )
      : [];
  }

  /**
   * Returns the previous `CarouselButton`.
   *
   * The button contains the disabled state.
   */
  protected previousButton(visible: number[]): CarouselButton {
    return {
      disabled: visible[0] === 0,
    };
  }

  /**
   * Returns the next `CarouselButton`.
   */
  protected nextButton(visible: number[], itemLength: number): CarouselButton {
    return {
      disabled: visible[visible.length - 1] >= itemLength - 1,
    };
  }

  /**
   * Return an array of indicator positions. For each position we render
   * the selected state of the indicator.
   */
  protected indicators(
    host: HTMLElement,
    slides: number[]
  ): CarouselIndicator[] {
    const scrollLeft = host.scrollLeft;
    const tolerance = 10;

    return slides.map((position) => {
      const left = host.clientWidth * position;
      const right = host.clientWidth * (position + 1);

      const isLast =
        position === slides.length - 1 &&
        scrollLeft + host.clientWidth >= host.scrollWidth - tolerance;

      const selected =
        isLast ||
        (left >= scrollLeft - tolerance &&
          scrollLeft + host.clientWidth >= right);
      return { position, selected };
    });
  }

  /**
   * The number of items per slide is calculated by the help of
   * the item width and the available width of the host element.
   * This approach makes it possible to place the carousel in different
   * layouts. Instead of using the page breakpoints, the host size is
   * taken into account.
   *
   * This results in a setup where the number of carousel items depends
   * on the available width of the host, rather than size of the window.
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
  protected calculateItems(availableWidth: number, itemWidth: string) {
    let calculatedItems = 0;
    if (itemWidth?.endsWith('px')) {
      const num = itemWidth.substring(0, itemWidth.length - 2);
      calculatedItems = availableWidth / <number>(<any>num);
    }

    if (itemWidth?.endsWith('%')) {
      const perc = itemWidth.substring(0, itemWidth.length - 1);
      calculatedItems =
        availableWidth / (availableWidth * (<number>(<any>perc) / 100));
    }

    return Math.floor(calculatedItems) || 1;
  }
}
