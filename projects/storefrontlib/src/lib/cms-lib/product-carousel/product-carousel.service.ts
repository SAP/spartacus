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
  merge,
  delay
} from 'rxjs/operators';

import { CmsComponentData } from '../../cms/components/cms-component-data';

@Injectable()
export class ProductCarouselService {
  items$: Observable<Observable<Product>[]>;
  itemSize$: Observable<number>;
  activeItem$: Observable<number>;
  title$: Observable<string>;

  MAX_WIDTH = 360;
  MAX_ITEM_SIZE = 4;
  SPEED = 250;

  constructor(
    protected component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService
  ) {}

  getTitle(): void {
    this.title$ = this.component.data$.pipe(
      map(data => {
        return data.title;
      })
    );
  }

  /**
   * Maps the item codes from CMS component to an array of `Product` observables.
   */
  getItems(): void {
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
  getItemSize(window, nativeElement) {
    if (!window) {
      this.itemSize$ = of(this.MAX_ITEM_SIZE);
      return;
    }
    this.itemSize$ = fromEvent(window, 'resize').pipe(
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
    );
  }

  getActiveItem(newActiveItem: number, max: number) {
    const maxItemSize = max ? max : this.MAX_ITEM_SIZE;
    this.activeItem$ = this.getActiveItemWithDelay(newActiveItem, maxItemSize);
  }

  getActiveItemWithDelay(
    newActiveItem: number,
    max: number
  ): Observable<number> {
    return of(-1).pipe(
      merge(of(newActiveItem).pipe(delay((max - 1) * this.SPEED)))
    );
  }

  getPreviousItemAsActive(activeItem: number, max: number): void {
    this.activeItem$ = this.getActiveItemWithDelay(activeItem, max).pipe(
      map(newActiveItem => newActiveItem - max)
    );
  }

  getNextItemAsActive(activeItem: number, max: number): void {
    this.activeItem$ = this.getActiveItemWithDelay(activeItem, max).pipe(
      map(newActiveItem => newActiveItem + max)
    );
  }
}
