import { Observable } from 'rxjs';
import { Currency, Language } from '../../model/misc.model';

export abstract class SiteAdapter {
  /**
   * Abstract method used to load languages.
   */
  abstract loadLanguages(): Observable<Language[]>;

  /**
   * Abstract method used to load currencies.
   */
  abstract loadCurrencies(): Observable<Currency[]>;
}
