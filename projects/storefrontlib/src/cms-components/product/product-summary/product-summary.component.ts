import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product, SelectiveCartService } from '@spartacus/core';
import {
  BundleStarter,
  BundleTemplate,
  CartBundleService,
} from '@spartacus/cart/bundle/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSummaryComponent implements OnInit {
  outlets = ProductDetailOutlets;

  product$: Observable<Product> = this.currentProductService.getProduct();
  bundleTemplates$: Observable<BundleTemplate[]>;

  constructor(
    protected currentProductService: CurrentProductService,
    protected selectiveCartService: SelectiveCartService,
    protected cartBundleService: CartBundleService
  ) {}

  ngOnInit(): void {
    this.product$
      .pipe(
        filter((product) => !!product),
        take(1)
      )
      .subscribe((product: Product) => {
        this.bundleTemplates$ = this.cartBundleService.getBundleTemplates(
          product.code
        );
      });
  }

  startBundle(product: Product, template: any) {
    this.cartBundleService.startBundle(<BundleStarter>{
      productCode: product.code,
      quantity: 1,
      templateId: template.id,
    });
  }
}
