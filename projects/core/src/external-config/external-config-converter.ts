import { I18nConfig } from '../i18n';
import { Occ } from '../occ/occ-models/occ.models';
import { SiteContextConfig } from '../site-context/config/site-context-config';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../site-context/providers/context-ids';
import { ExternalConfig } from './external-config';
import { JavaRegExpConverter } from './java-reg-exp-converter';

export class ExternalConfigConverter {
  static fromOccBaseSites(
    occBaseSites: Occ.BaseSites,
    currentUrl: string
  ): ExternalConfig {
    if (
      !occBaseSites ||
      !occBaseSites.baseSites ||
      !occBaseSites.baseSites.length
    ) {
      throw ExternalConfigConverter.getError(
        `No base sites returned from backend:
      ${JSON.stringify(occBaseSites)}`
      );
    }
    const { baseSites } = occBaseSites;
    const baseSite = baseSites.find(site =>
      ExternalConfigConverter.isCurrentBaseSite(site, currentUrl)
    );
    if (!baseSite) {
      throw ExternalConfigConverter.getError(
        `Current url (${currentUrl}) doesn't match with any of url patterns of any base site.`
      );
    }

    // Although `stores` property is an array, typically there is only one store. So we return the first store from the list.
    const baseStore = baseSite.stores && baseSite.stores[0];
    if (!baseStore) {
      throw ExternalConfigConverter.getError(
        `Current base site (${baseSite.uid}) doesn't have any base store.`
      );
    }

    return {
      baseSite: baseSite.uid,
      languages: ExternalConfigConverter.getIsoCodes(
        baseStore.languages,
        baseSite.defaultLanguage || baseStore.defaultLanguage
      ),
      currencies: ExternalConfigConverter.getIsoCodes(
        baseStore.currencies,
        baseStore.defaultCurrency
      ),
      urlParameters: ExternalConfigConverter.getUrlParams(
        baseSite.urlEncodingAttributes
      ),
    };
  }

  static toSiteContextConfig({
    baseSite,
    languages,
    currencies,
    urlParameters: urlEncodingAttributes,
  }: ExternalConfig): SiteContextConfig {
    const result = {
      context: {
        urlParameters: urlEncodingAttributes,
        [BASE_SITE_CONTEXT_ID]: [baseSite],
        [LANGUAGE_CONTEXT_ID]: languages,
        [CURRENCY_CONTEXT_ID]: currencies,
      },
    };
    return result;
  }

  static toI18nConfig({ languages }: ExternalConfig): I18nConfig {
    return { i18n: { fallbackLang: languages[0] } };
  }

  private static isCurrentBaseSite(
    site: Occ.BaseSite,
    currentUrl: string
  ): boolean {
    const index = (site.urlPatterns || []).findIndex(javaRegexp => {
      const jsRegexp = JavaRegExpConverter.convert(javaRegexp);
      if (jsRegexp) {
        const result = jsRegexp.test(currentUrl);
        return result;
      }
    });

    return index !== -1;
  }

  /**
   * Returns an array of url encoded site context parameters.
   *
   * It maps the string "storefront" (used in OCC) to the "baseSite" (used in Spartacus)
   */
  private static getUrlParams(params: string[]): string[] {
    const STOREFRONT_PARAM = 'storefront';

    return (params || []).map(param =>
      param === STOREFRONT_PARAM ? BASE_SITE_CONTEXT_ID : param
    );
  }

  /**
   * Returns iso codes in a array, where the first element is the default iso code.
   */
  private static getIsoCodes(
    elements: { isocode?: string }[],
    defaultElement: { isocode?: string }
  ) {
    const result = ExternalConfigConverter.moveToFirst(
      elements,
      el => el.isocode === defaultElement.isocode
    ).map(el => el.isocode);
    return result;
  }

  /**
   * Moves to the start of the array the first element that satisfies the given predicate.
   *
   * @param array array to modify
   * @param predicate function called on elements
   */
  private static moveToFirst(
    array: any[],
    predicate: (el: any) => boolean
  ): any[] {
    array = [...array];
    const index = array.findIndex(predicate);
    if (index !== -1) {
      const [el] = array.splice(index, 1);
      array.unshift(el);
    }
    return array;
  }

  private static getError(message: string): Error {
    return new Error(`Error: Cannot get base site config! ${message}`);
  }
}
