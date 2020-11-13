import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import {
  CurrentProductService,
  OutletContextData,
} from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { CommonConfigurator } from '../../core/model/common-configurator.model';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureProductComponent {
  productContext: OutletContextData;
  ownerTypeProduct: CommonConfigurator.OwnerType =
    CommonConfigurator.OwnerType.PRODUCT;

  constructor(
    protected currentProductService: CurrentProductService,
    @Optional() protected outletContext?: OutletContextData
  ) {
    if (outletContext) {
      this.productContext = outletContext;
    } else {
      //in this case component was instantiated via CMS, and no
      //outlet context is available
      this.productContext = {
        reference: undefined,
        position: undefined,
        context: undefined,
        context$: this.currentProductService
          .getProduct()
          .pipe(map((prod) => ({ product: prod }))),
      };
    }
  }
}
