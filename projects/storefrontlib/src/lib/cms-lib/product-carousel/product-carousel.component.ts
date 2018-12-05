import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { ProductService } from '@spartacus/core';

import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CmsService } from '@spartacus/core';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent extends AbstractCmsComponent
  implements OnDestroy, OnInit {
  productGroups: any[];
  products = {};

  resize$: Subscription;

  @ViewChild('carousel')
  carousel: any;
  @Input()
  productCodes: Array<string>;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    private productService: ProductService
  ) {
    super(cmsService, cd);
  }

  ngOnInit() {
    this.resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => this.createGroups());
  }

  prev() {
    this.carousel.prev();
  }

  next() {
    this.carousel.next();
  }

  protected fetchData() {
    this.setProductCodes();
    this.productCodes.forEach(code => {
      this.products[code] = this.productService.get(code);
      this.productService.isProductLoaded(code).subscribe();
    });
    this.createGroups();
    super.fetchData();
  }

  protected createGroups() {
    const groups = [];
    this.productCodes.forEach(product => {
      const lastGroup = groups[groups.length - 1];
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
    const { innerWidth } = window;
    let itemsPerPage;
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

  protected setProductCodes() {
    if (this.component && this.component.productCodes) {
      this.productCodes = this.component.productCodes.split(' ');
    }
  }

  ngOnDestroy() {
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
    super.ngOnDestroy();
  }
}
