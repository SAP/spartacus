import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, isDevMode } from '@angular/core';
import { SiteContextConfig } from '../../../../site-context/config/site-context-config';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../../../../site-context/providers/context-ids';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import { JavaRegexpNormalizer } from './java-regexp.normalizer';

@Injectable({ providedIn: 'root' })
export class OccBaseSitesConfigNormalizer
  implements Converter<Occ.BaseSites, SiteContextConfig> {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    protected javaRegexpNormalizer: JavaRegexpNormalizer
  ) {}

  /**
   * Converts the OCC base sites to the Spartacus Context Config for:
   * - base sites
   * - languages
   * - currencies
   */
  convert(
    occBaseSites: Occ.BaseSites,
    target: SiteContextConfig = {}
  ): SiteContextConfig {
    if (!occBaseSites) {
      return {};
    }
    const baseSites = [...occBaseSites.baseSites];

    this.moveAsFirst(baseSites, site => this.isDefaultBaseSite(site));

    const baseSite = baseSites[0]; // default base site
    const baseStore = this.getStore(baseSite);

    if (!baseStore) {
      return {};
    }

    const languagesIds = this.getLanguagesIds(
      baseStore,
      baseSite.defaultLanguage
    );
    const currenciesIds = this.getCurrenciesIds(baseStore);
    const baseSitesIds = baseSites.map(site => site.uid);

    return {
      ...target,
      context: {
        [BASE_SITE_CONTEXT_ID]: baseSitesIds,
        [LANGUAGE_CONTEXT_ID]: languagesIds,
        [CURRENCY_CONTEXT_ID]: currenciesIds,
      },
    };
  }

  /**
   * Returns the current URL
   */
  protected get currentUrl(): string {
    return this.document.location && this.document.location.href;
  }

  // spike todo test it!
  protected isDefaultBaseSite(site: Occ.BaseSite): boolean {
    const index = (site.urlPatterns || []).findIndex(javaRegexp => {
      const jsRegexp = this.javaRegexpNormalizer.convert(javaRegexp);
      if (jsRegexp) {
        const result = jsRegexp.test(this.currentUrl);
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
  private moveAsFirst(array: any[], predicate: (el: any) => boolean): void {
    const index = array.findIndex(predicate);
    if (index !== -1) {
      const [el] = array.splice(index, 1);
      array.unshift(el);
    }
  }

  /**
   * Returns the IDs of the site's languages. The default language is the first in the list.
   */
  protected getLanguagesIds(
    store: Occ.BaseStore,
    defaultLanguage: Occ.Language
  ): string[] {
    const languages = [...store.languages];

    // default lang can be declared directly for a base site instead of base store:
    const defaultLangId =
      (defaultLanguage && defaultLanguage.isocode) ||
      store.defaultLanguage.isocode;

    this.moveAsFirst(languages, lang => lang.isocode === defaultLangId);
    return languages.map(lang => lang.isocode);
  }

  /**
   * Returns the IDs of the site's currencies. The default currency is the first in the list.
   */
  protected getCurrenciesIds(store: Occ.BaseStore): string[] {
    const currencies = [...store.currencies];
    const defaultCurrId = store.defaultCurrency.isocode;

    this.moveAsFirst(currencies, curr => curr.isocode === defaultCurrId);
    return currencies.map(curr => curr.isocode);
  }

  /**
   * Returns the base store of the given base site.
   *
   * Although `stores` property is an array, typically there is only one store. So we return the first store from the list.
   */
  protected getStore(site: Occ.BaseSite): Occ.BaseStore {
    if (site && site.stores && site.stores.length) {
      return site.stores[0];
    }
    if (isDevMode()) {
      console.error(`No base stores for the base site '${site.uid}'`);
    }
  }
}
