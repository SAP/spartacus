import { HttpParams } from '@angular/common/http';
import { Injectable, isDevMode, Optional } from '@angular/core';
import { StringTemplate } from '../../config/utils/string-template';
import { getContextParameterDefault } from '../../site-context/config/context-config-utils';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { HttpParamsURIEncoder } from '../../util/http-params-uri.encoder';
import { OccConfig } from '../config/occ-config';
import { DEFAULT_SCOPE } from '../occ-models/occ-endpoints.model';
import { urlPathJoin } from '../utils/occ-url-util';

export interface BaseOccUrlProperties {
  baseUrl?: boolean;
  prefix?: boolean;
  baseSite?: boolean;
}

export interface DynamicAttributes {
  urlParams?: object;
  queryParams?: object;
  scope?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OccEndpointsService {
  private _activeBaseSite: string;

  private get activeBaseSite(): string {
    return (
      this._activeBaseSite ??
      getContextParameterDefault(this.config, BASE_SITE_CONTEXT_ID)
    );
  }

  constructor(
    private config: OccConfig,
    @Optional() private baseSiteService: BaseSiteService
  ) {
    if (this.baseSiteService) {
      this.baseSiteService
        .getActive()
        .subscribe((value) => (this._activeBaseSite = value));
    }
  }

  /**
   * Returns the value configured for a specific endpoint
   *
   * @param endpointKey the configuration key for the endpoint to return
   * @param scope endpoint configuration scope
   */
  getRawEndpointValue(endpoint: string, scope?: string): string {
    const endpointValue = this.getEndpointForScope(endpoint, scope);

    return endpointValue;
  }

  /**
   * Returns true when the endpoint is configured
   *
   * @param endpointKey the configuration key for the endpoint to return
   * @param scope endpoint configuration scope
   */
  isConfigured(endpoint: string, scope?: string): boolean {
    return !(
      typeof this.getEndpointFromConfig(endpoint, scope) === 'undefined'
    );
  }

  /**
   * Returns base OCC endpoint (baseUrl + prefix + baseSite) base on provided values
   *
   * @param baseUrlProperties Specify properties to not add to the url (baseUrl, prefix, baseSite)
   */
  getBaseUrl(
    baseUrlProperties: BaseOccUrlProperties = {
      baseUrl: true,
      prefix: true,
      baseSite: true,
    }
  ): string {
    const baseUrl =
      baseUrlProperties.baseUrl === false
        ? ''
        : this.config?.backend?.occ?.baseUrl ?? '';
    const prefix = baseUrlProperties.prefix === false ? '' : this.getPrefix();
    const baseSite =
      baseUrlProperties.baseSite === false ? '' : this.activeBaseSite;

    return urlPathJoin(baseUrl, prefix, baseSite);
  }

  /**
   * Returns a fully qualified OCC Url
   *
   * @param endpoint Name of the OCC endpoint key
   * @param attributes Dynamic attributes used to build the url
   * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
   */
  buildUrl(
    endpoint: string,
    attributes?: DynamicAttributes,
    propertiesToOmit?: BaseOccUrlProperties
  ): string {
    let url = this.getEndpointForScope(endpoint, attributes?.scope);

    if (attributes) {
      const { urlParams, queryParams } = attributes;

      if (urlParams) {
        url = StringTemplate.resolve(url, attributes.urlParams, true);
      }

      if (queryParams) {
        let httpParamsOptions = { encoder: new HttpParamsURIEncoder() };

        if (url.includes('?')) {
          let queryParamsFromEndpoint: string;
          [url, queryParamsFromEndpoint] = url.split('?');
          httpParamsOptions = {
            ...httpParamsOptions,
            ...{ fromString: queryParamsFromEndpoint },
          };
        }

        let httpParams = new HttpParams(httpParamsOptions);
        Object.keys(queryParams).forEach((key) => {
          const value = queryParams[key];
          if (value !== undefined) {
            if (value === null) {
              httpParams = httpParams.delete(key);
            } else {
              httpParams = httpParams.set(key, value);
            }
          }
        });

        const params = httpParams.toString();
        if (params.length) {
          url += '?' + params;
        }
      }
    }

    return this.buildUrlFromEndpointString(url, propertiesToOmit);
  }

  private getEndpointFromConfig(
    endpoint: string,
    scope?: string
  ): string | undefined {
    const endpointsConfig = this.config.backend?.occ?.endpoints;

    if (!endpointsConfig) {
      return undefined;
    }

    const endpointConfig = endpointsConfig[endpoint];

    if (scope) {
      if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
        return endpointConfig;
      }
      return endpointConfig?.[scope];
    }

    return typeof endpointConfig === 'string'
      ? endpointConfig
      : endpointConfig?.[DEFAULT_SCOPE];
  }

  // TODO: Can we reuse getEndpointFromConfig in this method? Should we change behavior of this function?
  private getEndpointForScope(endpoint: string, scope?: string): string {
    const endpointsConfig = this.config.backend?.occ?.endpoints;

    if (!Boolean(endpointsConfig)) {
      return '';
    }

    const endpointConfig = endpointsConfig[endpoint];

    if (scope) {
      if (endpointConfig?.[scope]) {
        return endpointConfig?.[scope];
      }
      if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
        return endpointConfig;
      }
      if (isDevMode()) {
        console.warn(
          `${endpoint} endpoint configuration missing for scope "${scope}"`
        );
      }
    }

    return (
      (typeof endpointConfig === 'string'
        ? endpointConfig
        : endpointConfig?.[DEFAULT_SCOPE]) || endpoint
    );
  }

  /**
   * Add the base OCC url properties to the specified endpoint string
   *
   * @param endpointString String value for the url endpoint
   * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
   */
  private buildUrlFromEndpointString(
    endpointString: string,
    propertiesToOmit?: BaseOccUrlProperties
  ): string {
    return urlPathJoin(this.getBaseUrl(propertiesToOmit), endpointString);
  }

  private getPrefix(): string {
    if (
      this.config?.backend?.occ?.prefix &&
      !this.config.backend.occ.prefix.startsWith('/')
    ) {
      return '/' + this.config.backend.occ.prefix;
    }
    return this.config?.backend?.occ?.prefix ?? '';
  }
}
