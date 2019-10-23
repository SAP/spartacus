/**
 * An injection token to be provided before bootstrapping an Angular app.
 *
 * SHOULD NOT BE PROVIDED IN ANGULAR APPLICATION (only before bootstrap)!
 * Otherwise the value provided in app will shadow the value provided before Angular bootstrap.
 */
export abstract class ExternalConfig {
  /**
   * Uid of the base site
   */
  baseSite?: string;

  /**
   * List of languages, where the first language is the default one
   */
  languages?: string[];

  /**
   * List of currencies, where the first currency is the default one
   */
  currencies?: string[];

  /**
   * Site context parameters to persist in the route
   */
  urlParameters?: string[];
}
