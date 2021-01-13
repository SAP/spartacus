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
  dataStream: Subscription;

  constructor(
    private routingService: RoutingService,
    private bulkPrices: BulkPricesService
  ) {}

  ngOnInit(): void {
    this.dataStream = this.getPrices().subscribe((p) => {
      this.pricingTiers = p;
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
    return this.routingService.getRouterState().pipe(
      switchMap((state) => {
        const productCode = state.state.params['productCode'];
        return this.bulkPrices.getBulkPrices(productCode);
      })
    );
  }

  ngOnDestroy() {
    this.dataStream.unsubscribe();
  }
}
