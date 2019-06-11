import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Product, OccConfig } from '@spartacus/core';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSelectorComponent implements OnInit {
  constructor(
    protected currentProductService: CurrentProductService,
    protected config: OccConfig
  ) {}

  public product: Product;
  ngOnInit() {
    this.currentProductService
      .getProduct()
      .pipe(filter(Boolean))
      .subscribe(product => {
        console.log('prod: ', product);
        this.product = product;
      });
  }

  getVariantName(variant) {
    return variant.variantType.toLowerCase().includes('style')
      ? 'Style'
      : 'Size';
  }

  getSelectedVariantValue(selected) {
    return selected.variantOptionQualifiers[0].value;
  }
}
