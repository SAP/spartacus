import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { filter } from 'rxjs/operators';
import { Product, OccConfig, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '../current-product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSelectorComponent {
  constructor(
    private routingService: RoutingService,
    protected currentProductService: CurrentProductService,
    protected config: OccConfig
  ) {}

  product$: Observable<Product> = this.currentProductService.getProduct();
  // ngOnInit() {
  //   this.currentProductService
  //     .getProduct()
  //     .pipe(filter(Boolean))
  //     .subscribe(product => {
  //       console.log('prod: ', product);
  //       this.product = product;
  //     });
  // }

  getVariantName(variant) {
    return variant.variantType.toLowerCase().includes('style')
      ? 'Style'
      : 'Size';
  }

  getSelectedVariantValue(selected) {
    return selected.variantOptionQualifiers[0].value;
  }
  routeToVariant(val) {
    console.log('v', val);
    this.routingService.goByUrl(val);
  }

  // isVariantSelected(option) {
  //   // console.log('o', option, this.product);
  //   return option.code === this.product$.code;
  // }
}
