import { Component, OnInit } from '@angular/core';
import { BulkPricingService } from '@spartacus/product/bulk-pricing/core';
import { RoutingService } from '@spartacus/core';
import { BulkPrice } from '@spartacus/product/bulk-pricing/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-bulk-pricing-table',
  templateUrl: './bulk-pricing-table.component.html',
})
export class BulkPricingTableComponent implements OnInit {
  protected readonly PRODUCT_KEY = 'productCode';

  priceTiers$: Observable<BulkPrice[] | undefined>;

  constructor(
    protected routingService: RoutingService,
    protected bulkPricingService: BulkPricingService
  ) {}

  ngOnInit() {
    this.priceTiers$ = this.getPrices();
  }

  formatQuantity(tier: BulkPrice): string {
    let formattedQuantityRange = '';
    if (!tier.maxQuantity) {
      formattedQuantityRange = tier.minQuantity + '+';
    } else {
      formattedQuantityRange = tier.minQuantity + ' - ' + tier.maxQuantity;
    }
    return formattedQuantityRange;
  }

  getPrices(): Observable<BulkPrice[] | undefined> {
    return this.routingService.getRouterState().pipe(
      switchMap((state) => {
        const productCode = state.state.params[this.PRODUCT_KEY];
        return this.bulkPricingService.getBulkPrices(productCode);
      })
    );
  }
}
