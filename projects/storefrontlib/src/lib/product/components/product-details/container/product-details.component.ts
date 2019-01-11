import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnChanges
} from '@angular/core';

import { ProductService, Product } from '@spartacus/core';

import { Observable } from 'rxjs';

import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnChanges {
  static outlets = ProductDetailOutlets;

  @Input()
  productCode: string;

  product$: Observable<Product>;

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

  ngOnChanges(): void {
    this.product$ = this.productService.get(this.productCode);
  }

  select(event: MouseEvent, tab: HTMLElement) {
    if (this.activatedElements.indexOf(tab) === -1) {
      // remove active class on both header and content panel
      this.activatedElements.forEach(el =>
        el.classList.remove('active', 'toggled')
      );
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
    } else {
      this.activatedElements.forEach(el => el.classList.toggle('toggled'));
    }
  }

  private isElementOutViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.bottom < 0 ||
      rect.right < 0 ||
      rect.left > window.innerWidth ||
      rect.top > window.innerHeight
    );
  }

  openReview() {
    this.reviewHeader.nativeElement.click();
    this.isWritingReview = true;
  }
}
