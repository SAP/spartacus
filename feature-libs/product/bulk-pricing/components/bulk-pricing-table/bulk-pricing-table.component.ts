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
  bulkPricesArr: any;

  constructor(
    private routingService: RoutingService,
    private bulkPrices: BulkPricesService
  ) {
    this.testString = 'bulk-pricing-table works!';
  }

  ngOnInit(): void {
    let tier1 = {
      min: '1',
      max: '3',
      price: '$1.00',
      discount: '10%',
    };

    let tier2 = {
      min: '4',
      max: '6',
      price: '$0.80',
      discount: '12.5%',
    };

    let tier3 = {
      min: '7',
      max: '10',
      price: '$0.50',
      discount: '15%',
    };

    let prices = [];
    prices.push(tier1);
    prices.push(tier2);
    prices.push(tier3);

    this.bulkPricesArr = prices;

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
