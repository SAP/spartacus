import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { SiteContextParamsService } from './site-context-params.service';

/**
 * Values of the site context parameters encoded in the URL.
 */
export interface SiteContextUrlParams {
  [name: string]: string;
}

/**
 * UrlTree decorated with a custom property `siteContext`
 * for storing the values of the site context parameters.
 */
export interface UrlTreeWithSiteContext extends UrlTree {
  siteContext?: SiteContextUrlParams;
}

/**
 * Angular URL Serializer aware of Spartacus site context parameters
 * encoded in the URL.
 */
@Injectable()
export class SiteContextUrlSerializer extends DefaultUrlSerializer {
  /**
   * Splits the URL into 2 parts: path and the query/fragment part
   */
  protected readonly URL_SPLIT: RegExp = /(^[^#?]*)(.*)/;

  /**
   * Names of site context parameters encoded in the URL
   */
  protected get urlEncodingParameters(): string[] {
    return this.siteContextParams.getUrlEncodingParameters();
  }

  /**
   * Tells whether any site context parameters should be encoded in the URL
   */
  protected get hasContextInRoutes(): boolean {
    return this.urlEncodingParameters.length > 0;
  }

  constructor(private siteContextParams: SiteContextParamsService) {
    super();
  }

  /**
   * @override Recognizes the site context parameters encoded in the prefix segments
   * of the given URL.
   *
   * It returns the UrlTree for the given URL shortened by the recognized params, but saves
   * the params' values in the custom property of UrlTree: `siteContext`.
   */
  parse(url: string): UrlTreeWithSiteContext {
    if (this.hasContextInRoutes) {
      const urlWithParams = this.urlExtractContextParameters(url);
      const parsed = super.parse(urlWithParams.url) as UrlTreeWithSiteContext;
      this.urlTreeIncludeContextParameters(parsed, urlWithParams.params);
      return parsed;
    } else {
      return super.parse(url);
    }
  }

  /**
   * Recognizes the site context parameters encoded in the prefix segments of the given URL.
   *
   * It returns the recognized site context params as well as the
   * URL shortened by the recognized params.
   */
  urlExtractContextParameters(
    url: string
  ): { url: string; params: SiteContextUrlParams } {
    const [, urlPart, queryPart] = url.match(this.URL_SPLIT);

    const segments = urlPart.split('/');
    if (segments[0] === '') {
      segments.shift();
    }
    const params = {};

    let paramId = 0;
    let segmentId = 0;
    while (
      paramId < this.urlEncodingParameters.length &&
      segmentId < segments.length
    ) {
      const paramName = this.urlEncodingParameters[paramId];
      const paramValues = this.siteContextParams.getParamValues(paramName);

      if (paramValues.includes(segments[segmentId])) {
        params[paramName] = segments[segmentId];
        segmentId++;
      }
      paramId++;
    }

    url = segments.slice(segmentId).join('/') + queryPart;
    return { url, params };
  }

  /**
   * Saves the given site context parameters in the custom property
   * of the given UrlTree: `siteContext`.
   */
  protected urlTreeIncludeContextParameters(
    urlTree: UrlTreeWithSiteContext,
    params: SiteContextUrlParams
  ): void {
    urlTree.siteContext = params;
  }

  /**
   * @override Serializes the given UrlTree to a string and prepends
   *  to it the current values of the site context parameters.
   */
  serialize(tree: UrlTreeWithSiteContext): string {
    const params = this.urlTreeExtractContextParameters(tree);
    const url = super.serialize(tree);
    const serialized = this.urlIncludeContextParameters(url, params);
    return serialized;
  }

  /**
   * Returns the site context parameters stored in the custom property
   * of the UrlTree: `siteContext`.
   */
  urlTreeExtractContextParameters(
    urlTree: UrlTreeWithSiteContext
  ): SiteContextUrlParams {
    return urlTree.siteContext ? urlTree.siteContext : {};
  }

  /**
   * Prepends the current values of the site context parameters to the given URL.
   */
  protected urlIncludeContextParameters(
    url: string,
    params: SiteContextUrlParams
  ): string {
    const contextRoutePart = this.urlEncodingParameters
      .map((param) => {
        return params[param]
          ? params[param]
          : this.siteContextParams.getValue(param);
      })
      .join('/');

    return contextRoutePart + url;
  }
}
