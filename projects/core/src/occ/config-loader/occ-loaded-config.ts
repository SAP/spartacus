export interface OccLoadedConfig {
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

  /**
   * Site theme that provides a mechanism to introduce site specific style rules
   */
  theme?: string;
}
