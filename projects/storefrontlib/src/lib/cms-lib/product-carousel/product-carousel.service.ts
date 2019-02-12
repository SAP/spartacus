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
  startWith
} from 'rxjs/operators';

import { CmsComponentData } from '../../cms/components/cms-component-data';

const MAX_WIDTH = 360;
const MAX_ITEM_SIZE = 4;
const SPEED = 250;
@Injectable()
export class ProductCarouselService {
  items$: Observable<Observable<Product>[]>;
  itemSize$: Observable<number>;

  constructor(
    protected component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService
  ) {}

  /**
   * Maps the item codes from CMS component to an array of `Product` observables.
   */
  setItems(): Observable<Observable<Product>[]> {
    return this.component.data$.pipe(
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
    if (!window) {
      this.itemSize$ = of(MAX_ITEM_SIZE);
      return;
    }
    return fromEvent(window, 'resize').pipe(
      map(() => (nativeElement as HTMLElement).clientWidth),
      startWith((nativeElement as HTMLElement).clientWidth),
      // avoid to much calls
      debounceTime(100),
      map((innerWidth: any) => {
        const itemsPerPage = Math.round(innerWidth / MAX_WIDTH);
        return itemsPerPage > 2 ? MAX_ITEM_SIZE : itemsPerPage;
      }),
      // only emit new size when the size changed
      distinctUntilChanged()
    );
  }

  async setActiveItem(newActive: number, max: number): Promise<number> {
    // we wait a little with setting the new active
    // to make a better animation
    return new Promise<number>(resolve => {
      setTimeout(() => {
        resolve(newActive);
      }, (max - 1) * SPEED);
    });
  }

  setPreviousItemAsActive(activeItem: number, max: number): Promise<number> {
    return this.setActiveItem(activeItem - max, max);
  }

  setNextItemAsActive(activeItem: number, max: number): Promise<number> {
    return this.setActiveItem(activeItem + max, max);
  }
}
