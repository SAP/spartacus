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
  testString;

  constructor(
    private routingService: RoutingService,
    private bulkPrices: BulkPricesService
  ) {
    this.testString = 'bulk-pricing-table works!';
  }

  ngOnInit(): void {
    this.dataStream = this.getPrices().subscribe((p) => {
      this.pricingTiers = p;
      console.log({ p });
    });
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
