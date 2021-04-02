import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { debounceTime, map, shareReplay } from 'rxjs/operators';
import { CarouselLoaderService } from './carousel-loader.service';
import { CarouselNavigation } from './carousel.model';
import { CarouselService } from './carousel.service';

@Injectable()
export class CarouselNavigationService {
  constructor(
    protected winRef: WindowRef,
    protected carouselBuilder: CarouselService,
    protected carouselLoader: CarouselLoaderService
  ) {}
  protected _element: HTMLElement;
  protected _itemCount = 0;

  setContainer(el: HTMLElement) {
    this._element = el;
  }

  setItemCount(count: number): void {
    this._itemCount = count;
    // TODO: if element, let's scroll to start
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
      this.carouselBuilder.build(this._element, visible, this._itemCount)
    ),
    shareReplay()
  );
}
