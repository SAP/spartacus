import { Component } from '@angular/core';
import { BulkPricesService } from '../../core/services/bulk-prices.service';
import { RoutingService } from '@spartacus/core';
import { BulkPrice } from '../../core/model/bulk-price.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-bulk-pricing-table',
  templateUrl: './bulk-pricing-table.component.html',
})
export class BulkPricingTableComponent {
  priceTiers$: Observable<BulkPrice[]> = this.getPrices();

  constructor(
    private routingService: RoutingService,
    private bulkPrices: BulkPricesService
  ) {}

  formatQuantity(tier: BulkPrice): string {
    let formattedQuantityRange = '';
    if (tier.maxQuantity == null) {
      formattedQuantityRange = tier.minQuantity + '+';
    } else {
      formattedQuantityRange = tier.minQuantity + ' - ' + tier.maxQuantity;
    }
    return formattedQuantityRange;
  }

  getPrices(): Observable<BulkPrice[]> {
    const productCodeKey = 'productCode';
    return this.routingService.getRouterState().pipe(
      switchMap((state) => {
        const productCode = state.state.params[productCodeKey];
        return this.bulkPrices.getBulkPrices(productCode);
      })
    );
  }
}
