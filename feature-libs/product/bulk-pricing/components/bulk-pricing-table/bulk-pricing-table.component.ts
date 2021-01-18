import { Component, OnInit, OnDestroy } from '@angular/core';
import { BulkPricesService } from '../../core/services/bulk-prices.service';
import { RoutingService } from '@spartacus/core';
import { BulkPrice } from '../../core/model/bulk-price.model';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-bulk-pricing-table',
  templateUrl: './bulk-pricing-table.component.html',
})
export class BulkPricingTableComponent implements OnInit, OnDestroy {
  pricingTiers: BulkPrice[];
  pricesSubscription: Subscription;

  constructor(
    private routingService: RoutingService,
    private bulkPrices: BulkPricesService
  ) {}

  // TODO: once we are done with the template, remove the subscribe/unsubscribe code 
  ngOnInit(): void {
    this.pricesSubscription = this.getPrices().subscribe((prices) => {
      this.pricingTiers = prices;
    });
  }

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

  ngOnDestroy(): void {
    this.pricesSubscription.unsubscribe();
  }
}
