import { Injectable } from '@angular/core';

import {
  ProductService,
  Product,
  CmsProductCarouselComponent
} from '@spartacus/core';

import { fromEvent, Observable, of } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  startWith,
  delay,
  tap
} from 'rxjs/operators';

import { CmsComponentData } from '../../cms/components/cms-component-data';

@Injectable()
export class ProductCarouselService {
  MAX_WIDTH = 360;
  MAX_ITEM_SIZE = 4;
  SPEED = 250;

  items$: Observable<Observable<Product>[]>;
  itemSize$: Observable<number>;
  activeItem$: Observable<number>;
  title$: Observable<string>;

  itemSize = this.MAX_ITEM_SIZE;
  activeItem = 0;

  constructor(
    protected component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService
  ) {}

  setTitle(): void {
    this.title$ = this.component.data$.pipe(
      map(data => {
        return data.title;
      })
    );
  }

  /**
   * Maps the item codes from CMS component to an array of `Product` observables.
   */
  setItems(): void {
    this.items$ = this.component.data$.pipe(
      map(data => {
        const productCodes = data.productCodes.split(' ');
        return productCodes.map(code => this.productService.get(code));
      })
    );
  }

  /**
   * The number of items shown in the carousel can be calculated
   * the standard implemenattions uses the element size to calculate
   * the items that fit in the carousel.
   * This method is called in `ngOnInit`.
   */
  setItemSize(window, nativeElement) {
    this.itemSize$ = (!window
      ? of(this.MAX_ITEM_SIZE)
      : fromEvent(window, 'resize').pipe(
          map(() => (nativeElement as HTMLElement).clientWidth),
          startWith((nativeElement as HTMLElement).clientWidth),
          // avoid to much calls
          debounceTime(100),
          map((innerWidth: any) => {
            const itemsPerPage = Math.round(innerWidth / this.MAX_WIDTH);
            return itemsPerPage > 2 ? this.MAX_ITEM_SIZE : itemsPerPage;
          }),
          // only emit new size when the size changed
          distinctUntilChanged()
        )
    ).pipe(tap(itemSize => (this.itemSize = itemSize)));
  }

  setItemAsActive(newActiveItem: number) {
    this.activeItem$ = of(newActiveItem)
      .pipe(delay(this.getDelayValue()))
      .pipe(tap(activeItem => (this.activeItem = activeItem)));
  }

  setPreviousItemAsActive(): void {
    this.setItemAsActive(this.activeItem - this.itemSize);
  }

  setNextItemAsActive(): void {
    this.setItemAsActive(this.activeItem + this.itemSize);
  }

  getDelayValue() {
    return (this.itemSize - 1) * this.SPEED;
  }
}
