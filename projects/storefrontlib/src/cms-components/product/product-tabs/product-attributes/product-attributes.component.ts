import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '../../current-product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-attributes',
  templateUrl: './product-attributes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributesComponent implements OnInit {
  product$: Observable<Product>;

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct();
  }
}
