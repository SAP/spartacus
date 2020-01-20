import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-attributes',
  templateUrl: './product-attributes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributesComponent implements OnInit {
  product$: Observable<Product> = this.currentProductService.getProduct(
    ProductScope.ATTRIBUTES
  );

  constructor(protected currentProductService: CurrentProductService) {}

  // TODO deprecated since 1.4, remove
  ngOnInit() {}
}
