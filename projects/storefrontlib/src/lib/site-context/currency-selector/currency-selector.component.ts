import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyService } from '@spartacus/core';

@Component({
  selector: 'cx-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectorComponent implements OnInit {
  currencies$: Observable<any>;
  activeCurrency$: Observable<string>;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencies$ = this.currencyService.currencies$;

    this.currencies$ = null;
    this.activeCurrency$ = this.currencyService.activeCurrency$;
  }

  setActiveCurrency(currency) {
    this.currencyService.select(currency);
  }
}
