import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  OnInit
} from '@angular/core';

import {
  ProductService,
  Product,
  CmsProductCarouselComponent,
  WindowRef
} from '@spartacus/core';

import { Subscription, fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponentData } from '../../cms/components/cms-component-data';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnDestroy, OnInit {
  productGroups: Array<string[]>;
  products: { [key: string]: Observable<Product> } = {};
  productCodes: Array<string>;

  resize$: Subscription;

  private window: Window;

  @ViewChild('carousel')
  carousel: NgbCarousel;

  constructor(
    public component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService,
    winRef: WindowRef
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    if (this.window) {
      this.resize$ = fromEvent(this.window, 'resize')
        .pipe(debounceTime(300))
        .subscribe(() => this.createGroups());
    }
  }

  prev(): void {
    this.carousel.prev();
  }

  next(): void {
    this.carousel.next();
  }

  protected createGroups(): void {
    const groups: Array<string[]> = [];
    this.productCodes.forEach(product => {
      const lastGroup: string[] = groups[groups.length - 1];
      if (lastGroup && lastGroup.length < this.getItemsPerPage()) {
        lastGroup.push(product);
      } else {
        groups.push([product]);
      }
    });
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

  protected subscribeToData(): void {
    this.component.data$.subscribe(data => {
      this.productCodes = data.productCodes.split(' ');
      this.productCodes.forEach(code => {
        this.products[code] = this.productService.get(code);
      });
      this.createGroups();
    });
  }

  ngOnDestroy() {
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
  }
}
