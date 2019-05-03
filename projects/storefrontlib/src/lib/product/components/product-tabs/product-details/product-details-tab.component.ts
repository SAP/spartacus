import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UIProduct } from '@spartacus/core';
import { CurrentProductService } from 'projects/storefrontlib/src/lib/ui/pages/product-page/current-product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-details-tab',
  templateUrl: './product-details-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsTabComponent implements OnInit {
  product$: Observable<UIProduct>;

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct();
  }
}
