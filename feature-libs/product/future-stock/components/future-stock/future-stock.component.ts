import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FutureStock } from '@spartacus/core';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cx-future-stock',
  templateUrl: './future-stock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureStockComponent implements OnInit, OnDestroy {
  futureStocks$ = this.futureStockService.getFutureStock();
  futureStocks: FutureStock[] | string;

  futureStockSubscription: Subscription;

  constructor(
    protected futureStockService: FutureStockFacade
  ) {}

  ngOnInit() {
    if(!this.futureStocks) {
      this.futureStockSubscription = this.futureStocks$.subscribe((futureStocks) => {
        this.futureStocks = (futureStocks && futureStocks.futureStocks.length !== 0) ? futureStocks.futureStocks : 'This product has no future availability information.';
      });
    }
  }

  ngOnDestroy(): void {
      this.futureStockSubscription.unsubscribe();
  }
}
