import { Currency, Language } from '../model/misc.model';

/**
 * An injection token to be provided before bootstrapping an Angular app.
 *
 * SHOULD NOT BE PROVIDED IN ANGULAR APPLICATION (only before bootstrap)!
 * Otherwise the value provided in app will shadow the value provided before Angular bootstrap.
 */
export abstract class ExternalConfig {
  baseSite?: string;
  languages?: Language[];
  defaultLanguage?: Language;
  currencies?: Currency[];
  defaultCurrency?: Currency;
  urlEncodingAttributes?: string[];
}
