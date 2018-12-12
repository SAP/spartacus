import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { CurrencyService, Currency } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectorComponent implements OnInit {
  currencies$: Observable<Currency[]>;
  activeCurrency$: Observable<string>;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencies$ = this.currencyService.get();
    this.activeCurrency$ = this.currencyService.getActive();
  }

  setActiveCurrency(currency: string): void {
    this.currencyService.setActive(currency);
  }
}
