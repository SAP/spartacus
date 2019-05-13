import { Injectable } from '@angular/core';
import { SiteAdapter } from './site.adapter';
import { Observable } from 'rxjs';
import { Currency, Language } from '../../model/misc.model';

@Injectable({
  providedIn: 'root',
})
export class SiteConnector {
  constructor(private adapter: SiteAdapter) {}

  getLanguages(): Observable<Language[]> {
    return this.adapter.loadLanguages();
  }

  getCurrencies(): Observable<Currency[]> {
    return this.adapter.loadCurrencies();
  }
}
