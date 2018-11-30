import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';

import { ProductService } from '@spartacus/core';

import { Observable } from 'rxjs';

import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: [
    './product-details.component.scss',
    './product-details-tabs.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnChanges {
  static outlets = ProductDetailOutlets;
  @ViewChild('tabSet')
  tabSet;
  @ViewChild('tabSetWrapper')
  tabSetWrapper;
  @Input()
  productCode: string;
  product$: Observable<any>;

  get outlets() {
    return ProductDetailsComponent.outlets;
  }

  isWritingReview = false;
  activeTab: HTMLElement[] = [];

  @ViewChild('descriptionHeader')
  set initial(ref: ElementRef) {
    if (ref) {
      ref.nativeElement.click();
    }
  }

  @ViewChild('reviewHeader')
  reviewHeader: ElementRef;

  constructor(protected productService: ProductService) {}

  ngOnChanges() {
    this.product$ = this.productService.get(this.productCode);
  }

  select(event: MouseEvent, tab: HTMLElement) {
    this.activeTab.forEach(el => el.classList.remove('active'));
    this.activeTab = [<HTMLElement>event.target, tab];
    this.activeTab.forEach(el => el.classList.add('active'));
    // tab.scrollIntoView();
  }

  goToReviews() {
    this.reviewHeader.nativeElement.click();
  }
}
