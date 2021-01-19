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
  testString;

  protected readonly PRODUCT_KEY = 'productCode';

  constructor(
    protected routingService: RoutingService,
    protected bulkPrices: BulkPricesService
  ) {
    // TODO: once we are done with the template, remove testString
    this.testString = 'bulk-pricing-table works!';
  }

  // TODO: once we are done with the template, remove the subscribe/unsubscribe code
  ngOnInit(): void {
    this.pricesSubscription = this.getPrices().subscribe((prices) => {
      this.pricingTiers = prices;
    });
  }

  getPrices(): Observable<BulkPrice[]> {
    return this.routingService.getRouterState().pipe(
      switchMap((state) => {
        const productCode = state.state.params[this.PRODUCT_KEY];
        return this.bulkPrices.getBulkPrices(productCode);
      })
    );
  }

  ngOnDestroy(): void {
    this.pricesSubscription.unsubscribe();
  }
}
