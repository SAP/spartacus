import { Observable } from 'rxjs';
import { Currency, Language, BaseSite } from '../../model/misc.model';

export abstract class SiteAdapter {
  /**
   * Abstract method used to load languages.
   */
  abstract loadLanguages(): Observable<Language[]>;

  /**
   * Abstract method used to load currencies.
   */
  abstract loadCurrencies(): Observable<Currency[]>;

  /**
   * Abstract method used to get base site data.
   */
  abstract loadBaseSite(): Observable<BaseSite>;
}
