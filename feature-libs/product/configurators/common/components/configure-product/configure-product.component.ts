import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { LocalCurrentProductService } from 'projects/storefrontlib/src/cms-components/product/local-current-product.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonConfigurator } from '../../core/model/common-configurator.model';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureProductComponent {
  product$: Observable<Product> = this.currentProductService.getProduct();
  ownerTypeProduct: CommonConfigurator.OwnerType =
    CommonConfigurator.OwnerType.PRODUCT;

  constructor(protected currentProductService: CurrentProductService) {
    console.log('CHHI constructed');
    const localPs: LocalCurrentProductService = currentProductService as LocalCurrentProductService;

    localPs
      .getProduct()
      .pipe(take(1))
      .subscribe((pr) => {
        console.log('CHHI product: ' + pr.code);
      });
  }
}
