import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FutureStock } from '@spartacus/product/future-stock/root';

@Component({
  selector: 'cx-future-stock',
  templateUrl: './future-stock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureStockComponent implements OnInit {
  futureStocks: FutureStock[] | string;

  ngOnInit() {
    // TODO: replace with get stocks from API from CXSPA-418 when this ticket is merged
    if (Math.random() > 0.5) {
      this.futureStocks = [
        {
          formattedDate: '10/11/2020',
          stock: {
            stockLevel: 15,
          },
        },
        {
          formattedDate: '11/11/2020',
          stock: {
            stockLevel: 20,
          },
        },
        {
          formattedDate: '12/11/2020',
          stock: {
            stockLevel: 25,
          },
        },
      ];
    } else {
      this.futureStocks =
        'This product has no future availability information.';
    }
  }
}
