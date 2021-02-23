import { Injectable } from '@angular/core';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextConfig } from '../../../site-context/config/site-context-config';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
  THEME_CONTEXT_ID,
} from '../../../site-context/providers/context-ids';
import { Converter } from '../../../util/converter.service';

@Injectable({
  providedIn: 'root',
})
export class SiteContextConfigConverter
  implements Converter<BaseSite, SiteContextConfig> {
  convert(source: BaseSite, target?: SiteContextConfig): SiteContextConfig {
    // Although `stores` property is an array, typically there is only one store. So we return the first store from the list.
    const baseStore = source.stores && source.stores[0];
    if (!baseStore) {
      throw this.getError(
        `Current base site (${source.uid}) doesn't have any base store.`
      );
    }

    target = {
      context: {
        urlParameters: this.getUrlParams(source.urlEncodingAttributes),
        [BASE_SITE_CONTEXT_ID]: [source.uid],
        [LANGUAGE_CONTEXT_ID]: this.getIsoCodes(
          baseStore.languages,
          source.defaultLanguage || baseStore.defaultLanguage
        ),
        [CURRENCY_CONTEXT_ID]: this.getIsoCodes(
          baseStore.currencies,
          baseStore.defaultCurrency
        ),
        [THEME_CONTEXT_ID]: [source.theme],
      },
    };

    return target;
  }

  /**
   * Returns an array of url encoded site context parameters.
   *
   * It maps the string "storefront" (used in OCC) to the "baseSite" (used in Spartacus)
   */
  private getUrlParams(params: string[]): string[] {
    const STOREFRONT_PARAM = 'storefront';

    return (params || []).map((param) =>
      param === STOREFRONT_PARAM ? BASE_SITE_CONTEXT_ID : param
    );
  }

  /**
   * Returns iso codes in a array, where the first element is the default iso code.
   */
  private getIsoCodes(
    elements: { isocode?: string }[],
    defaultElement: { isocode?: string }
  ) {
    const result = this.moveToFirst(
      elements,
      (el) => el.isocode === defaultElement.isocode
    ).map((el) => el.isocode);
    return result;
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
