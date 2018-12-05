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

  @Input()
  productCode: string;
  product$: Observable<any>;

  get outlets() {
    return ProductDetailsComponent.outlets;
  }

  isWritingReview = false;
  activatedElements: HTMLElement[] = [];

  @ViewChild('descriptionHeader')
  set initial(ref: ElementRef) {
    if (ref) {
      ref.nativeElement.click();
    }
  }

  @ViewChild('reviewHeader') reviewHeader: ElementRef;

  constructor(protected productService: ProductService) {}

  ngOnChanges() {
    this.product$ = this.productService.get(this.productCode);
  }

  select(event: MouseEvent, tab: HTMLElement) {
    // toggle active class on both header and content panel
    this.activatedElements.forEach(el => el.classList.remove('active'));
    this.activatedElements = [<HTMLElement>event.target, tab];
    this.activatedElements.forEach(el => el.classList.add('active'));

    // only scroll if the element is not yet visible
    if (this.isElementOutViewport(tab)) {
      tab.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }

  private isElementOutViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.bottom < 0 ||
      rect.right < 0 ||
      rect.left > window.innerWidth ||
      rect.top > window.innerHeight
    );
  }

  openReview() {
    this.reviewHeader.nativeElement.click();
  }
}
