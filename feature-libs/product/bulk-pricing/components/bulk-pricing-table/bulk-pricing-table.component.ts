import { Component, OnInit } from '@angular/core';
import { BulkPricesService } from '../../core/services/bulk-prices.service';
import { RoutingService } from '@spartacus/core';
import { BulkPrice } from '../../core/model/bulk-price.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-bulk-pricing-table',
  templateUrl: './bulk-pricing-table.component.html',
})
export class BulkPricingTableComponent implements OnInit {
  protected readonly PRODUCT_KEY = 'productCode';

  priceTiers$: Observable<BulkPrice[]>;

  constructor(
    protected routingService: RoutingService,
    protected bulkPrices: BulkPricesService
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

  getPrices(): Observable<BulkPrice[]> {
    return this.routingService.getRouterState().pipe(
      switchMap((state) => {
        const productCode = state.state.params[this.PRODUCT_KEY];
        return this.bulkPrices.getBulkPrices(productCode);
      })
    );
  }
}
