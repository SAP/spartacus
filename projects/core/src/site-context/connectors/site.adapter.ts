import { Observable } from 'rxjs';
import { Country, CountryType, Region } from '../../model/address.model';
import { BaseSite, Currency, Language } from '../../model/misc.model';

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
   * Abstract method used to get countries with optional type.
   */
  abstract loadCountries(type?: CountryType): Observable<Country[]>;

  /**
   * Abstract method used to get regions for a country.
   */
  abstract loadRegions(countryIsoCode: string): Observable<Region[]>;

  /**
   * Abstract method used to get the active base site data
   * @deprecated since 3.0
   */
  abstract loadBaseSite(): Observable<BaseSite>;

  /**
   * Abstract method used to get all base sites data.
   */
  abstract loadBaseSites(): Observable<BaseSite[]>;
}
