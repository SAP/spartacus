import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { SiteContextParamsService } from '../facade/site-context-params.service';
import { SiteContextConfig } from '../config/site-context-config';

export interface ParamValuesMap {
  [name: string]: string;
}

export interface UrlTreeWithSiteContext extends UrlTree {
  siteContext?: ParamValuesMap;
}

@Injectable()
export class SiteContextUrlSerializer extends DefaultUrlSerializer {
  private readonly urlEncodingParameters: string[];

  get hasContextInRoutes() {
    return this.urlEncodingParameters.length > 0;
  }

  constructor(
    private siteContextParams: SiteContextParamsService,
    private config: SiteContextConfig
  ) {
    super();
    this.urlEncodingParameters =
      this.config.siteContext.urlEncodingParameters || [];
  }

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

  urlExtractContextParameters(
    url: string
  ): { url: string; params: ParamValuesMap } {
    const segments = url.split('/');
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

      if (paramValues.indexOf(segments[segmentId]) > -1) {
        params[paramName] = segments[segmentId];
        segmentId++;
      }
      paramId++;
    }

    url = segments.slice(Object.keys(params).length).join('/');
    return { url, params };
  }

  private urlTreeIncludeContextParameters(
    urlTree: UrlTreeWithSiteContext,
    params: ParamValuesMap
  ) {
    urlTree.siteContext = params;
  }

  serialize(tree: UrlTreeWithSiteContext): string {
    const params = this.urlTreeExtractContextParameters(tree);
    const url = super.serialize(tree);
    const serialized = this.urlIncludeContextParameters(url, params);
    return serialized;
  }

  urlTreeExtractContextParameters(
    urlTree: UrlTreeWithSiteContext
  ): ParamValuesMap {
    return urlTree.siteContext ? urlTree.siteContext : {};
  }

  private urlIncludeContextParameters(url: string, params: ParamValuesMap) {
    const contextRoutePart = this.urlEncodingParameters
      .map(param => {
        return params[param]
          ? params[param]
          : this.siteContextParams.getValue(param);
      })
      .join('/');

    return contextRoutePart + url;
  }
}
