import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '@spartacus/core';
import { CurrentProductService } from '../../../../ui/pages/product-page/current-product.service';
import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  static outlets = ProductDetailOutlets;

  @Output() openReview = new EventEmitter();

  product$: Observable<Product>;

  get outlets() {
    return ProductDetailsComponent.outlets;
  }

  constructor(protected currentPageService: CurrentProductService) {}

  ngOnInit(): void {
    this.product$ = this.currentPageService.getProduct();
  }

  launchReview() {
    this.openReview.emit();
  }
}
