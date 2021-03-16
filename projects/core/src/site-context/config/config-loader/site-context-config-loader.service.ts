import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  isDevMode,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import { BaseSite } from '../../../model/misc.model';
import { JavaRegExpConverter } from '../../../util/java-reg-exp-converter/java-reg-exp-converter';
import { SERVER_REQUEST_URL } from '../../../util/ssr.tokens';
import { BaseSiteService } from '../../facade/base-site.service';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
  THEME_CONTEXT_ID,
} from '../../providers/context-ids';
import { SiteContextConfig } from '../site-context-config';

@Injectable({ providedIn: 'root' })
export class SiteContextConfigLoaderService {
  constructor(
    protected baseSiteService: BaseSiteService,
    protected javaRegExpConverter: JavaRegExpConverter,
    @Inject(PLATFORM_ID) protected platform?: any,
    @Inject(DOCUMENT) protected document?: any,
    @Optional()
    @Inject(SERVER_REQUEST_URL)
    protected serverRequestUrl?: string
  ) {}

  private get currentUrl(): string {
    if (isPlatformBrowser(this.platform)) {
      return this.document.location.href;
    }
    if (!this.serverRequestUrl && isDevMode()) {
      console.error(
        `Please provide token 'SERVER_REQUEST_URL' with the requested URL for SSR`
      );
    }
    return this.serverRequestUrl as string;
  }

  /**
   * Returns the site context config basing on the current base site data
   */
  loadConfig(): Promise<SiteContextConfig> {
    return this.baseSiteService
      .getAll()
      .pipe(
        map((baseSites) =>
          baseSites?.find((site) => this.isCurrentBaseSite(site))
        ),
        filter((baseSite: any) => {
          if (!baseSite) {
            throw new Error(
              `Error: Cannot get base site config! Current url (${this.currentUrl}) doesn't match any of url patterns of any base sites.`
            );
          }
          return Boolean(baseSite);
        }),
        map((baseSite) => this.getConfig(baseSite)),
        take(1)
      )
      .toPromise();
  }

  protected getConfig(source: BaseSite): SiteContextConfig {
    const result = {
      context: {
        urlParameters: this.getUrlParams(source.urlEncodingAttributes),
        [BASE_SITE_CONTEXT_ID]: [source.uid],
        [LANGUAGE_CONTEXT_ID]: this.getIsoCodes(
          source.baseStore?.languages,
          source.defaultLanguage || source.baseStore?.defaultLanguage
        ),
        [CURRENCY_CONTEXT_ID]: this.getIsoCodes(
          source.baseStore?.currencies,
          source.baseStore?.defaultCurrency
        ),
        [THEME_CONTEXT_ID]: [source.theme],
      },
    } as SiteContextConfig;

    return result;
  }

  private isCurrentBaseSite(site: BaseSite): boolean {
    const index = (site.urlPatterns || []).findIndex((javaRegexp: string) => {
      const jsRegexp = this.javaRegExpConverter.toJsRegExp(javaRegexp);
      if (jsRegexp) {
        const result = jsRegexp.test(this.currentUrl);
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
}
