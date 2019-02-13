import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import {
  ProductService,
  Product,
  CmsProductCarouselComponent,
  WindowRef
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

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnInit {
  items$: Observable<Observable<Product>[]>;
  itemSize$: Observable<number>;
  activeItem = 0;

  private window: Window;

  constructor(
    public component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService,
    winRef: WindowRef,
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.setItemSize();
    this.setItems();
  }

  /**
   * Maps the item codes from CMS component to an array of `Product` observables.
   */
  protected setItems(): void {
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
  protected setItemSize(): void {
    if (!this.window) {
      this.itemSize$ = of(MAX_ITEM_SIZE);
      return;
    }
    this.itemSize$ = fromEvent(this.window, 'resize').pipe(
      map(() => (this.el.nativeElement as HTMLElement).clientWidth),
      startWith((this.el.nativeElement as HTMLElement).clientWidth),
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

  prev(max): void {
    this.setActiveItem(this.activeItem - max, max);
  }

  next(max): void {
    this.setActiveItem(this.activeItem + max, max);
  }

  setActiveItem(newActive: number, max: number): void {
    this.activeItem = -1;
    // we wait a little with setting the new active
    // to make a better animation
    setTimeout(() => {
      this.activeItem = newActive;
      this.cd.markForCheck();
    }, (max - 1) * SPEED);
  }
}
