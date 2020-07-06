import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { TruncateTextService } from './product-description.service';

@Component({
  selector: 'cx-product-details-tab',
  templateUrl: './product-details-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsTabComponent implements OnInit {
  product$: Observable<Product>;

  constructor(protected currentProductService: CurrentProductService,
              public pds: TruncateTextService) {}

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct();
  }
}
