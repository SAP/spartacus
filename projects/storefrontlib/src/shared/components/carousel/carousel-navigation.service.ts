import { Injectable } from '@angular/core';

export interface CarouselButton {
  visible: boolean;
  disabled: boolean;
  enabled: boolean;
}
export interface CarouselNavigation {
  slides: number[];
  previous: CarouselButton;
  next: CarouselButton;
}

export interface CarouselIndicator {
  position: number;
  selected: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CarouselNavigationService {
  slides(carouselHost: HTMLElement): number[] {
    return carouselHost.clientWidth > 0
      ? Array.from(
          Array(
            Math.ceil(carouselHost.scrollWidth / carouselHost.clientWidth)
          ).keys()
        )
      : [];
  }

  previousData(visible: number[], slides: number[]): CarouselButton {
    return {
      visible: slides.length > 1,
      disabled: visible[0] === 0,
      enabled: visible[0] > 0,
    };
  }

  nextData(visible: number[], slides: number[], total: number): CarouselButton {
    return {
      visible: slides.length > 1,
      disabled: visible[visible.length] === total,
      enabled: visible[visible.length - 1] < total,
    };
  }

  /**
   * Return an array of indicator positions. For each position we render
   * the selected state of the indicator.
   */
  indicators(carouselHost: HTMLElement, slides: number[]): CarouselIndicator[] {
    const scrollLeft = carouselHost.scrollLeft;
    const tolerance = 10;

    return slides.map((position) => {
      const left = carouselHost.clientWidth * position;
      const right = carouselHost.clientWidth * (position + 1);

      const isLast =
        position === slides.length - 1 &&
        scrollLeft + carouselHost.clientWidth >=
          carouselHost.scrollWidth - tolerance;

      const selected =
        isLast ||
        (left >= scrollLeft - tolerance &&
          scrollLeft + carouselHost.clientWidth >= right);
      return { position, selected };
    });
  }
}
