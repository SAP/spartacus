import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  OnInit,
  ElementRef
} from '@angular/core';

import {
  ProductService,
  Product,
  CmsProductCarouselComponent,
  WindowRef
} from '@spartacus/core';

import { Subscription, fromEvent, Observable, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponentData } from '../../cms/components/cms-component-data';

const MAX_WIDTH = 360;
const MAX_ITEM_SIZE = 4;

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnDestroy, OnInit {
  items$: Observable<Observable<Product>[]>;
  itemSize$: Observable<number>;

  productGroups: Array<string[]>;
  products: { [key: string]: Observable<Product> } = {};
  productCodes: Array<string>;

  resize$: Subscription;
  dataSubscription$: Subscription;

  private window: Window;

  @ViewChild('carousel')
  carousel: NgbCarousel;

  constructor(
    public component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService,
    private winRef: WindowRef,
    private el: ElementRef
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    if (this.window) {
      this.subscribeToData();
      this.resize$ = fromEvent(this.window, 'resize')
        .pipe(debounceTime(300))
        .subscribe(() => this.createGroups());
    }

    this.setItemSize();
  }

  /**
   * Maps the item codes from CMS component to an array of `Product` observables.
   */
  protected setItems() {
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

  prev() {
    this.carousel.prev();
  }

  next() {
    this.carousel.next();
  }

  protected createGroups() {
    const groups: Array<string[]> = [];
    if (this.productCodes) {
      this.productCodes.forEach(product => {
        const lastGroup: string[] = groups[groups.length - 1];
        if (lastGroup && lastGroup.length < this.getItemsPerPage()) {
          lastGroup.push(product);
        } else {
          groups.push([product]);
        }
      });
    }
    this.productGroups = groups;
  }

  protected getItemsPerPage(): number {
    const smallScreenMaxWidth = 576;
    const tabletScreenMaxWidth = 768;
    const innerWidth = this.window ? window.innerWidth : tabletScreenMaxWidth;
    let itemsPerPage: number;
    if (innerWidth < smallScreenMaxWidth) {
      itemsPerPage = 1;
    } else if (
      innerWidth > smallScreenMaxWidth &&
      innerWidth < tabletScreenMaxWidth
    ) {
      itemsPerPage = 2;
    } else {
      itemsPerPage = 4;
    }
    return itemsPerPage;
  }

  protected subscribeToData() {
    this.dataSubscription$ = this.component.data$.subscribe(data => {
      this.productCodes = data.productCodes.split(' ');
      this.productCodes.forEach(code => {
        this.products[code] = this.productService.get(code);
      });
      this.createGroups();
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription$) {
      this.dataSubscription$.unsubscribe();
    }
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
  }
}
