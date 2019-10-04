import { isDevMode } from '@angular/core';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../../site-context/providers/context-ids';
import { Occ } from '../occ-models/occ.models';
import { convertJavaRegExp } from './convert-java-reg-exp';

/**
 * Converts the OCC base sites to the Spartacus Context Config for:
 * - base sites
 * - languages
 * - currencies
 */
export function getConfigFromOccBaseSites(
  occBaseSites: Occ.BaseSites,
  currentUrl: string
): SiteContextConfig {
  if (!occBaseSites) {
    return {};
  }
  const { baseSites } = occBaseSites;

  // SPIKE TODO REMOVE -  MOCK SAMPLE DATA:
  // const electronicsSpa = baseSites.find(site => site.uid === 'electronics-spa');
  // electronicsSpa.urlPatterns = [
  //   '(?i)^https?://[^/]+(/electronics-spa)(|/.*|\\?.*)$',
  // ];
  // END SPIKE TODO REMOVE

  //spike todo remove:
  // moveAsFirst(baseSites, site => isDefaultBaseSite(site, currentUrl));
  // const baseSite = baseSites[0]; // default base site

  //spike new - deduce only one base site from urlPatterns
  const baseSite = baseSites.find(site => isCurrentBaseSite(site, currentUrl));
  if (!baseSite) {
    return {};
  }

  const baseStore = getStore(baseSite);
  if (!baseStore) {
    return {};
  }

  const urlParameters = getUrlParameters(baseSite);
  const languagesIds = getLanguagesIds(baseStore, baseSite.defaultLanguage);
  const currenciesIds = getCurrenciesIds(baseStore);

  // spike todo remove -  consider using only one base site, as long as we have deduced it from urlPatterns
  // const baseSitesIds = baseSites.map(site => site.uid);

  // spike new - use only one base site deduced from url patterns:
  const baseSitesIds = [baseSite.uid];

  return {
    context: {
      urlParameters,
      [BASE_SITE_CONTEXT_ID]: baseSitesIds,
      [LANGUAGE_CONTEXT_ID]: languagesIds,
      [CURRENCY_CONTEXT_ID]: currenciesIds,
    },
  };
}

// spike todo test it!
function isCurrentBaseSite(site: Occ.BaseSite, currentUrl: string): boolean {
  const index = (site.urlPatterns || []).findIndex(javaRegexp => {
    const jsRegexp = convertJavaRegExp(javaRegexp);
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
function moveAsFirst(array: any[], predicate: (el: any) => boolean): void {
  const index = array.findIndex(predicate);
  if (index !== -1) {
    const [el] = array.splice(index, 1);
    array.unshift(el);
  }
}

/**
 * Returns the IDs of the site's languages. The default language is the first in the list.
 */
function getLanguagesIds(
  store: Occ.BaseStore,
  defaultLanguage: Occ.Language
): string[] {
  const languages = [...store.languages];

  // default lang can be declared directly for a base site instead of base store:
  const defaultLangId =
    (defaultLanguage && defaultLanguage.isocode) ||
    store.defaultLanguage.isocode;

  moveAsFirst(languages, lang => lang.isocode === defaultLangId);
  return languages.map(lang => lang.isocode);
}

/**
 * Returns the IDs of the site's currencies. The default currency is the first in the list.
 */
function getCurrenciesIds(store: Occ.BaseStore): string[] {
  const currencies = [...store.currencies];
  const defaultCurrId = store.defaultCurrency.isocode;

  moveAsFirst(currencies, curr => curr.isocode === defaultCurrId);
  return currencies.map(curr => curr.isocode);
}

/**
 * Returns the base store of the given base site.
 *
 * Although `stores` property is an array, typically there is only one store. So we return the first store from the list.
 */
function getStore(site: Occ.BaseSite): Occ.BaseStore {
  if (site && site.stores && site.stores.length) {
    return site.stores[0];
  }
  if (isDevMode()) {
    console.error(`No base stores for the base site '${site.uid}'`);
  }
}

/**
 * Returns and array of url parameters with site context.
 *
 * NOTE: it maps the string "storefront" (used in OCC) to the "baseSite" (used in Spartacus)
 */
function getUrlParameters(site: Occ.BaseSite): string[] {
  const STOREFRONT_PARAM = 'storefront';

  return (site.urlEncodingAttributes || []).map(param =>
    param === STOREFRONT_PARAM ? BASE_SITE_CONTEXT_ID : param
  );
}
