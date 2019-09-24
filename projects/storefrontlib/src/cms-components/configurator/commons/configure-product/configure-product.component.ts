import { Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../../product/current-product.service';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
})
export class ConfigureProductComponent {
  product$: Observable<Product> = this.currentProductService.getProduct();

  constructor(protected currentProductService: CurrentProductService) {}
}
