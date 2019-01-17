import { Component, OnInit } from '@angular/core';

import { CurrencyService, Currency } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['../selector.component.scss'],
  host: { class: 'selector' }
})
export class CurrencySelectorComponent implements OnInit {
  currencies$: Observable<Currency[]>;
  activeCurrency$: Observable<string>;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencies$ = this.currencyService.getAll();
    this.activeCurrency$ = this.currencyService.getActive();
  }

  setActiveCurrency(currency: string): void {
    this.currencyService.setActive(currency);
  }
}
