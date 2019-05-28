import { Injectable } from '@angular/core';
import { SiteAdapter } from './site.adapter';
import { Observable } from 'rxjs';
import { Currency, Language } from '../../model/misc.model';
import { Country, Region } from '../../model/address.model';

@Injectable({
  providedIn: 'root',
})
export class SiteConnector {
  constructor(protected adapter: SiteAdapter) {}

  getLanguages(): Observable<Language[]> {
    return this.adapter.loadLanguages();
  }

  getCurrencies(): Observable<Currency[]> {
    return this.adapter.loadCurrencies();
  }

  getBillingCountries(): Observable<Country[]> {
    return this.adapter.loadBillingCountries();
  }

  getDeliveryCountries(): Observable<Country[]> {
    return this.adapter.loadDeliveryCountries();
  }

  getRegions(countryIsoCode: string): Observable<Region[]> {
    return this.adapter.loadRegions(countryIsoCode);
  }
}
