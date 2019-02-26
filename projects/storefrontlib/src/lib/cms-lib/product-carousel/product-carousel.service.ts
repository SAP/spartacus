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
  withLatestFrom
} from 'rxjs/operators';

import { CmsComponentData } from '../../cms/components/cms-component-data';

@Injectable()
export class ProductCarouselService {
  MAX_WIDTH = 360;
  MAX_ITEM_SIZE = 4;
  SPEED = 250;

  private items$: Observable<Observable<Product>[]>;
  private itemSize$ = of(this.MAX_ITEM_SIZE);
  private activeItem$ = of(0);
  private activeItemWithDelay$ = of(0);
  private title$: Observable<string>;

  constructor(
    protected component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService
  ) {}

  getActiveItem(): Observable<number> {
    return this.activeItem$;
  }

  getActiveItemWithDelay(): Observable<number> {
    return this.activeItemWithDelay$;
  }

  getTitle(): Observable<string> {
    return this.title$;
  }

  setTitle(): void {
    this.title$ = this.component.data$.pipe(
      map(data => {
        return data.title;
      })
    );
  }

  getItems(): Observable<Observable<Product>[]> {
    return this.items$;
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
    this.itemSize$ = !window
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
        );
  }

  setItemAsActive(newActiveItem: number) {
    this.activeItem$ = this.itemSize$.pipe(
      map(itemSize => this.setItem(newActiveItem, itemSize))
    );
  }

  setPreviousItemAsActive(): void {
    this.activeItem$ = this.activeItem$.pipe(
      withLatestFrom(this.itemSize$),
      map(([activeItem, itemSize]: [number, number]) =>
        this.setItem(activeItem - itemSize, itemSize)
      )
    );
  }

  setNextItemAsActive(): void {
    this.activeItem$ = this.activeItem$.pipe(
      withLatestFrom(this.itemSize$),
      map(([activeItem, itemSize]: [number, number]) =>
        this.setItem(activeItem + itemSize, itemSize)
      )
    );
  }

  private setItem(newActiveItem: number, itemSize: number) {
    this.activeItemWithDelay$ = of(newActiveItem).pipe(
      delay(this.getDelayValue(itemSize))
    );
    return newActiveItem;
  }

  private getDelayValue(itemSize) {
    return (itemSize - 1) * this.SPEED;
  }
}
