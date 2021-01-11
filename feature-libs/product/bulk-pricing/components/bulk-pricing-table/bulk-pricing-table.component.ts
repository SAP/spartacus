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
  pricingTiers: BulkPrice[];
  testString;

  constructor(
    private routingService: RoutingService,
    private bulkPrices: BulkPricesService
  ) {
    this.testString = 'bulk-pricing-table works!';
  }

  ngOnInit(): void {
    this.getPrices().subscribe((p) => {
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
}
