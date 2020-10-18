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

  indicators(carouselHost: HTMLElement, slides: number[]) {
    const scrollLeft = carouselHost.scrollLeft;
    return slides.map((index) => {
      const left = carouselHost.clientWidth * index;
      const right = carouselHost.clientWidth * (index + 1);

      const hasLastMatch =
        scrollLeft + carouselHost.clientWidth === carouselHost.scrollWidth;

      const selected = hasLastMatch
        ? index === slides.length - 1
        : scrollLeft >= left && scrollLeft < right;

      return { index, selected };
    });
  }

  //   resolveNavigation(
  //     carouselHost: HTMLElement,
  //     max: number,
  //     visible: number[]
  //   ): CarouselNavigation {
  //     const slides =
  //       carouselHost.clientWidth > 0
  //         ? Array.from(
  //             Array(
  //               Math.ceil(carouselHost.scrollWidth / carouselHost.clientWidth)
  //             ).keys()
  //           )
  //         : [];

  //     const next = {

  //     };

  //     return { slides, next , previous: this.previousData(visible, slides)};
  //   }
}
