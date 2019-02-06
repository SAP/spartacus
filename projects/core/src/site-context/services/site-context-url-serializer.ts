import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { SiteContextParamsService } from '../facade/site-context-params.service';

export interface ParamValuesMap {
  [name: string]: string;
}

@Injectable()
export class SiteContextUrlSerializer extends DefaultUrlSerializer {
  private routeContextParameters = [];

  get hasContextInRoutes() {
    return this.routeContextParameters.length > 0;
  }

  constructor(private siteContextParams: SiteContextParamsService) {
    super();
    this.routeContextParameters = this.siteContextParams.getContextParameters(
      'route'
    );
  }

  parse(url: string): UrlTree {
    if (this.hasContextInRoutes) {
      const urlWithParams = this.urlExtractContextParameters(url);
      const parsed = super.parse(urlWithParams.url);
      this.urlTreeIncludeCotextParameters(parsed, urlWithParams.params);
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
    for (
      let i = 0;
      i < this.routeContextParameters.length && i < segments.length;
      i++
    ) {
      const paramName = this.routeContextParameters[i];
      const paramValues = this.siteContextParams.getParamValues(paramName);
      if (paramValues.indexOf(segments[i]) > -1) {
        params[paramName] = segments[i];
      } else {
        break;
      }
    }
    url = segments.slice(Object.keys(params).length).join('/');
    return { url, params };
  }

  private urlTreeIncludeCotextParameters(
    urlTree: UrlTree,
    params: ParamValuesMap
  ) {
    urlTree.queryParams = {
      ...urlTree.queryParams,
      ...params
    };
  }

  serialize(tree: UrlTree): string {
    const params = this.urlTreeExtractContextParameters(tree);
    const url = super.serialize(tree);
    const serialized = this.urlIncludeCotextParameters(url, params);
    return serialized;
  }

  urlTreeExtractContextParameters(urlTree: UrlTree): ParamValuesMap {
    const params = {};

    this.routeContextParameters.forEach(param => {
      if (urlTree.queryParams[param]) {
        params[param] = urlTree.queryParams[param];
        delete urlTree.queryParams[param];
      }
    });

    return params;
  }

  private urlIncludeCotextParameters(url: string, params: ParamValuesMap) {
    const contextRoutePart = this.routeContextParameters
      .map(param => {
        return params[param]
          ? params[param]
          : this.siteContextParams.getValue(param);
      })
      .join('/');

    return contextRoutePart + url;
  }
}
