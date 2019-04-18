import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UIProduct } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../../../ui/pages/product-page/current-product.service';
import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  static outlets = ProductDetailOutlets;

  @Output() openReview = new EventEmitter();

  product$: Observable<UIProduct>;

  get outlets(): any {
    return ProductDetailsComponent.outlets;
  }

  constructor(protected currentPageService: CurrentProductService) {}

  ngOnInit(): void {
    this.product$ = this.currentPageService.getProduct();
  }

  launchReview(): void {
    this.openReview.emit();
  }
}
