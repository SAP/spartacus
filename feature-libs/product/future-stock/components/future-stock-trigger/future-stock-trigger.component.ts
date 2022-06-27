import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FutureStock } from '../../root/models/future-stock.model';

@Component({
  selector: 'cx-future-stock',
  templateUrl: './future-stock-trigger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureStockTriggerComponent implements OnInit {

  futureStocks: FutureStock[] | string;

  ngOnInit() {
    // TODO: get stocks from API when API ticket is merged
    if(Math.random() > 0.5) {
      this.futureStocks = [
        {
          formattedDate: '10/11/2020',
          stock: {
            stockLevel: 15
          }
        },
        {
          formattedDate: '11/11/2020',
          stock: {
            stockLevel: 20
          }
        },
        {
          formattedDate: '12/11/2020',
          stock: {
            stockLevel: 25
          }
        }
      ];
    } else {
      this.futureStocks = 'This product has no future availability information.';
    }
  }
}
