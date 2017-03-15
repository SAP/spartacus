import { Component, OnInit } from '@angular/core';
import { SiteLoaderService } from '../../data/site-loader.service';

@Component({
  selector: 'y-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {

    currencies;

    constructor(
        protected siteLoader: SiteLoaderService
    ) { }

    ngOnInit() {
        this.siteLoader.loadCurrencies();
        this.siteLoader.getCurrencySubscription().subscribe((data) => {
            if (data) {
                this.currencies = data.currencies;
            }
        });
    }
}
