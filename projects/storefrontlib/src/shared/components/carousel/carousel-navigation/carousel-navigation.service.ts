import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { debounceTime, map, shareReplay } from 'rxjs/operators';
import { CarouselLoaderService } from '../carousel-loader.service';
import { CarouselNavigation } from '../carousel.model';
import { CarouselService } from '../carousel.service';

@Injectable()
export class CarouselNavigationService {
  constructor(
    protected winRef: WindowRef,
    protected carouselBuilder: CarouselService,
    protected carouselLoader: CarouselLoaderService
  ) {}
  protected host: HTMLElement;
  protected _itemCount = 0;

  /**
   * Navigates to the previous (virtual) slide of the carousel.
   */
  openPreviousSlide(): void {
    const prev = Math.round(this.host.scrollLeft / this.host.clientWidth);
    if (getComputedStyle(this.host)?.direction === 'rtl') {
      this.scroll(-((prev - 1) * this.host.clientWidth));
    } else {
      this.scroll((prev - 1) * this.host.clientWidth);
    }
  }

  /**
   * Navigates to the next (virtual) slide of the carousel.
   */
  openNextSlide(): void {
    if (getComputedStyle(this.host)?.direction === 'rtl') {
      this.host?.scrollBy({
        left: -this.host.clientWidth,
      });
    } else {
      this.host?.scrollBy({
        left: this.host.clientWidth,
      });
    }
  }

  /**
   * Navigates to a specific (virtual) slide.
   */
  openSlide(slideNum: number): void {
    const left =
      getComputedStyle(this.host)?.direction === 'rtl'
        ? -(this.host?.clientWidth * slideNum)
        : this.host?.clientWidth * slideNum;
    this.scroll(left);
  }

  protected scroll(left: number) {
    this.host?.scrollTo({ left });
  }

  setContainer(el: HTMLElement) {
    this.host = el;
  }

  setItemCount(count: number): void {
    this._itemCount = count;
    this.scroll(0);
  }

  /**
   * Emits the visible carousel items in a numbered array.
   *
   * A value of `[3,4]` means that the 3rd adn 4th items are visible.
   */
  // readonly visible$ = new BehaviorSubject<number[]>([]);

  readonly navigation$: Observable<CarouselNavigation> = this.carouselLoader.visible$.pipe(
    debounceTime(100),
    map((visible) =>
      this.carouselBuilder.build(this.host, visible, this._itemCount)
    ),
    shareReplay()
  );
}
