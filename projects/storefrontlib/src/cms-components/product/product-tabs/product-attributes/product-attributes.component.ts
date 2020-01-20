import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FeatureConfigService, Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-attributes',
  templateUrl: './product-attributes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributesComponent implements OnInit {
  protected readonly PRODUCT_SCOPE =
    this.features && this.features.isLevel('1.4')
      ? ProductScope.ATTRIBUTES
      : '';

  product$: Observable<Product> = this.currentProductService.getProduct(
    this.PRODUCT_SCOPE
  );

  constructor(
    currentProductService: CurrentProductService,
    // tslint:disable-next-line: unified-signatures
    features: FeatureConfigService
  );

  /**
   * @deprecated since 1.4
   */
  constructor(currentProductService: CurrentProductService);

  constructor(
    protected currentProductService: CurrentProductService,
    protected features?: FeatureConfigService
  ) {}

  // TODO deprecated since 1.4, remove
  ngOnInit() {}
}
