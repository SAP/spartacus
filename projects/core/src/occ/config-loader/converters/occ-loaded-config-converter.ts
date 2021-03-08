import { Injectable } from '@angular/core';
import { I18nConfig } from '../../../i18n';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextConfig } from '../../../site-context/config/site-context-config';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
  THEME_CONTEXT_ID,
} from '../../../site-context/providers/context-ids';
import { Converter } from '../../../util/converter.service';
import { JavaRegExpConverter } from '../../adapters/site-context/converters/java-reg-exp-converter';
import { Occ } from '../../occ-models/occ.models';
import { OccLoadedConfig } from '../occ-loaded-config';

@Injectable({ providedIn: 'root' })
export class OccLoadedConfigConverter
  implements Converter<BaseSite, OccLoadedConfig> {
  // TODO: remove javaRegExpConverter from constructor in 4.0
  constructor(private javaRegExpConverter: JavaRegExpConverter) {}

  convert(source: BaseSite, target?: OccLoadedConfig): OccLoadedConfig {
    const baseStore = source.baseStore;
    if (!baseStore) {
      throw this.getError(
        `Current base site (${source.uid}) doesn't have any base store.`
      );
    }

    target = {
      baseSite: source.uid,
      languages: this.getIsoCodes(
        baseStore.languages,
        source.defaultLanguage || baseStore.defaultLanguage
      ),
      currencies: this.getIsoCodes(
        baseStore.currencies,
        baseStore.defaultCurrency
      ),
      urlParameters: this.getUrlParams(source.urlEncodingAttributes),
      theme: source.theme,
    } as OccLoadedConfig;

    return target;
  }

  /**
   * @deprecated since 3.2, use function convert(source, target?) instead
   */
  fromOccBaseSites(
    baseSites: BaseSite[] | undefined,
    currentUrl: string
  ): OccLoadedConfig {
    const baseSite = baseSites?.find((site: any) =>
      this.isCurrentBaseSite(site, currentUrl)
    );
    if (!baseSite) {
      throw this.getError(
        `Current url (${currentUrl}) doesn't match with any of url patterns of any base site.`
      );
    }

    // Although `stores` property is an array, typically there is only one store. So we return the first store from the list.
    const baseStore = baseSite.stores && baseSite.stores[0];
    if (!baseStore) {
      throw this.getError(
        `Current base site (${baseSite.uid}) doesn't have any base store.`
      );
    }

    return {
      baseSite: baseSite.uid,
      languages: this.getIsoCodes(
        baseStore.languages,
        baseSite.defaultLanguage || baseStore.defaultLanguage
      ),
      currencies: this.getIsoCodes(
        baseStore.currencies,
        baseStore.defaultCurrency
      ),
      urlParameters: this.getUrlParams(baseSite.urlEncodingAttributes),
      theme: baseSite.theme,
    };
  }

  /**
   * @deprecated since 3.2, use SiteContextConfigConverter instead
   */
  toSiteContextConfig({
    baseSite,
    languages,
    currencies,
    urlParameters: urlEncodingAttributes,
    theme,
  }: OccLoadedConfig): SiteContextConfig {
    const result = {
      context: {
        urlParameters: urlEncodingAttributes,
        [BASE_SITE_CONTEXT_ID]: [baseSite],
        [LANGUAGE_CONTEXT_ID]: languages,
        [CURRENCY_CONTEXT_ID]: currencies,
        [THEME_CONTEXT_ID]: [theme],
      },
    } as SiteContextConfig;
    return result;
  }

  /**
   * @deprecated since 3.2, use I18nConfigConverter instead
   */
  toI18nConfig({ languages }: OccLoadedConfig): I18nConfig {
    return { i18n: { fallbackLang: languages?.[0] } };
  }

  /**
   * @deprecated since 3.2, this function is moved to OccConfigLoaderService
   * TODO: remove this function in 4.0
   */
  private isCurrentBaseSite(site: Occ.BaseSite, currentUrl: string): boolean {
    const index = (site.urlPatterns || []).findIndex((javaRegexp) => {
      const jsRegexp = this.javaRegExpConverter.toJsRegExp(javaRegexp);
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
  private getUrlParams(params: string[] | undefined): string[] {
    const STOREFRONT_PARAM = 'storefront';

    return (params || []).map((param) =>
      param === STOREFRONT_PARAM ? BASE_SITE_CONTEXT_ID : param
    );
  }

  /**
   * Returns iso codes in a array, where the first element is the default iso code.
   */
  private getIsoCodes(
    elements: { isocode?: string }[] | undefined,
    defaultElement: { isocode?: string } | undefined
  ) {
    if (elements && defaultElement) {
      const result = this.moveToFirst(
        elements,
        (el) => el.isocode === defaultElement.isocode
      ).map((el) => el.isocode);
      return result;
    }
  }

  /**
   * Moves to the start of the array the first element that satisfies the given predicate.
   *
   * @param array array to modify
   * @param predicate function called on elements
   */
  private moveToFirst(array: any[], predicate: (el: any) => boolean): any[] {
    array = [...array];
    const index = array.findIndex(predicate);
    if (index !== -1) {
      const [el] = array.splice(index, 1);
      array.unshift(el);
    }
    return array;
  }

  private getError(message: string): Error {
    return new Error(`Error: Cannot get base site config! ${message}`);
  }
}
