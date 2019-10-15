import { ExternalConfig } from '../../external-config/external-config';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../../site-context/providers/context-ids';
import { Occ } from '../occ-models/occ.models';
import { JavaRegExpConverter } from './java-reg-exp-converter';

export class OccBaseSites2ConfigConverter {
  /**
   * Converts the OCC base sites to the Spartacus Config for:
   * - site context:
   *    - base site
   *    - languages (the first is the default)
   *    - currencies (the first is the default)
   *    - urlParameters
   */
  static convert(
    occBaseSites: Occ.BaseSites,
    currentUrl: string
  ): ExternalConfig {
    if (
      !occBaseSites ||
      !occBaseSites.baseSites ||
      !occBaseSites.baseSites.length
    ) {
      throw OccBaseSites2ConfigConverter.getError(
        `No base sites returned from backend:
      ${JSON.stringify(occBaseSites)}`
      );
    }
    const { baseSites } = occBaseSites;
    const baseSite = baseSites.find(site =>
      OccBaseSites2ConfigConverter.isCurrentBaseSite(site, currentUrl)
    );
    if (!baseSite) {
      throw OccBaseSites2ConfigConverter.getError(
        `Current url (${currentUrl}) doesn't match with any of url patterns of any base site.`
      );
    }

    const baseStore = OccBaseSites2ConfigConverter.getStore(baseSite);
    if (!baseStore) {
      throw OccBaseSites2ConfigConverter.getError(
        `Current base site (${baseSite.uid}) doesn't have any base store.`
      );
    }

    return {
      context: {
        urlParameters: OccBaseSites2ConfigConverter.getUrlParameters(baseSite),
        [BASE_SITE_CONTEXT_ID]: [baseSite.uid],
        [LANGUAGE_CONTEXT_ID]: OccBaseSites2ConfigConverter.getLanguagesIds(
          baseStore,
          baseSite.defaultLanguage
        ),
        [CURRENCY_CONTEXT_ID]: OccBaseSites2ConfigConverter.getCurrenciesIds(
          baseStore
        ),
      },
    };
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
   * Moves to the start of the array the first element that satisfies the given predicate.
   *
   * @param array array to modify
   * @param predicate function called on elements
   */
  private static moveAsFirst(
    array: any[],
    predicate: (el: any) => boolean
  ): void {
    const index = array.findIndex(predicate);
    if (index !== -1) {
      const [el] = array.splice(index, 1);
      array.unshift(el);
    }
  }

  /**
   * Returns the IDs of the site's languages. The default language is the first in the list.
   */
  private static getLanguagesIds(
    store: Occ.BaseStore,
    defaultLanguage: Occ.Language
  ): string[] {
    const languages = [...store.languages];

    // default lang can be declared directly for a base site instead of base store:
    const defaultLangId =
      (defaultLanguage && defaultLanguage.isocode) ||
      store.defaultLanguage.isocode;

    OccBaseSites2ConfigConverter.moveAsFirst(
      languages,
      lang => lang.isocode === defaultLangId
    );
    return languages.map(lang => lang.isocode);
  }

  /**
   * Returns the IDs of the site's currencies. The default currency is the first in the list.
   */
  private static getCurrenciesIds(store: Occ.BaseStore): string[] {
    const currencies = [...store.currencies];
    const defaultCurrId = store.defaultCurrency.isocode;

    OccBaseSites2ConfigConverter.moveAsFirst(
      currencies,
      curr => curr.isocode === defaultCurrId
    );
    return currencies.map(curr => curr.isocode);
  }

  /**
   * Returns the base store of the given base site.
   *
   * Although `stores` property is an array, typically there is only one store. So we return the first store from the list.
   */
  private static getStore(site: Occ.BaseSite): Occ.BaseStore {
    if (site && site.stores && site.stores.length) {
      return site.stores[0];
    }
    return null;
  }

  /**
   * Returns an array of url encoding attributes.
   *
   * NOTE: it maps the string "storefront" (used in OCC) to the "baseSite" (used in Spartacus)
   */
  private static getUrlParameters(site: Occ.BaseSite): string[] {
    const STOREFRONT_PARAM = 'storefront';

    return (site.urlEncodingAttributes || []).map(param =>
      param === STOREFRONT_PARAM ? BASE_SITE_CONTEXT_ID : param
    );
  }

  private static getError(message: string): Error {
    return new Error(`Error: Cannot get base site config! ${message}`);
  }
}
