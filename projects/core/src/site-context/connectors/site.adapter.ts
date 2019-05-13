import { Observable } from 'rxjs';
import { Currency, Language } from '../../model/misc.model';

export abstract class SiteAdapter {
  abstract loadLanguages(): Observable<Language[]>;

  abstract loadCurrencies(): Observable<Currency[]>;
}
