import { Observable } from 'rxjs';
import { Currency, Language } from '../../model/misc.model';

export interface SiteAdapter {
  loadLanguages(): Observable<Language[]>;

  loadCurrencies(): Observable<Currency[]>;
}
