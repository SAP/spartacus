import { HttpParams } from '@angular/common/http';
import { Injectable, isDevMode, Optional } from '@angular/core';
import { DynamicTemplate } from '../../config/utils/dynamic-template';
import { getContextParameterDefault } from '../../site-context/config/context-config-utils';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { HttpParamsURIEncoder } from '../../util/http-params-uri.encoder';
import { OccConfig } from '../config/occ-config';
import { DEFAULT_SCOPE } from '../occ-models/occ-endpoints.model';

export interface EndpointComponents {
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
   * @Deprecated since 3.2 - use "getRawEndpointValue" or "getOccUrl" instead
   *
   * Returns an endpoint starting from the OCC baseUrl (no baseSite)
   * @param endpoint Endpoint suffix
   */
  getRawEndpoint(endpoint: string): string {
    if (!this.config?.backend?.occ) {
      return '';
    }
    endpoint = this.config.backend.occ.endpoints?.[endpoint];

    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }

    return this.config.backend.occ.baseUrl + endpoint;
  }

  /**
   * Returns the value configured for a specific endpoint
   *
   * @param endpointKey the configuration key for the endpoint to return
   */
  getRawEndpointValue(endpoint: string, scope?: string): string {
    if (!this.config?.backend?.occ) {
      return '';
    }
    const endpointValue = this.getEndpointForScope(endpoint, scope);

    return endpointValue;
  }

  /**
   * @Deprecated since 3.2 - use "getOccUrl(endpoint, {}, { baseUrl: true, prefix: true })" instead
   *
   * Returns an endpoint starting from the OCC prefix (no baseSite), i.e. /occ/v2/{endpoint}
   * Most OCC endpoints are related to a baseSite context and are therefor prefixed
   * with the baseSite. The `/basesites` endpoint does not relate to a specific baseSite
   * as it will load all baseSites.
   *
   * @param endpoint Endpoint suffix
   */
  getOccEndpoint(endpoint: string): string {
    endpoint = this.getRawEndpointValue(endpoint);

    return this.getEndpoint(endpoint, { baseUrl: true, prefix: true });
  }

  /**
   * Returns base OCC endpoint (baseUrl + prefix + baseSite) by if no parameters are specified
   *
   * @param endpointComponents The prefixes to add to the url (baseUrl, prefix, baseSite)
   */
  getBaseEndpoint(endpointComponents?: EndpointComponents): string {
    if (!this.config?.backend?.occ) {
      return '';
    }

    if (!endpointComponents) {
      return (
        (this.config.backend.occ.baseUrl || '') +
        this.config.backend.occ.prefix +
        this.activeBaseSite
      );
    } else {
      return endpointComponents.baseUrl
        ? this.config.backend.occ.baseUrl || ''
        : '' + endpointComponents.prefix
        ? this.config.backend.occ.prefix
        : '' + endpointComponents.baseSite
        ? this.activeBaseSite
        : '';
    }
  }

  /**
   * Returns an OCC endpoint including baseUrl and baseSite
   *
   * @param endpoint Endpoint suffix
   * @param endpointComponents The prefixes to add to the url (baseUrl, prefix, baseSite)
   */
  getEndpoint(
    endpoint: string,
    endpointComponents?: EndpointComponents
  ): string {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return this.getBaseEndpoint(endpointComponents) + endpoint;
  }

  /**
   * Returns a fully qualified OCC Url
   *
   * @param endpoint Name of the OCC endpoint key
   * @param attributes Dynamic attributes used to build the url
   * @param endpointsComponents The prefixes to add to the url (baseUrl, prefix, baseSite)
   */
  getOccUrl(
    endpoint: string,
    attributes?: DynamicAttributes,
    endpointsComponents?: EndpointComponents
  ): string {
    endpoint = this.getEndpointForScope(endpoint, attributes?.scope);

    if (attributes) {
      const { urlParams, queryParams } = attributes;

      if (urlParams) {
        endpoint = DynamicTemplate.resolve(
          endpoint,
          attributes.urlParams,
          true
        );
      }

      if (queryParams) {
        let httpParamsOptions = { encoder: new HttpParamsURIEncoder() };

        if (endpoint.includes('?')) {
          let queryParamsFromEndpoint: string;
          [endpoint, queryParamsFromEndpoint] = endpoint.split('?');
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
          endpoint += '?' + params;
        }
      }
    }

    return this.getEndpoint(endpoint, endpointsComponents);
  }

  /**
   * @Deprecated since 3.2 - use "getOccUrl" instead
   *
   * Returns a fully qualified OCC Url (including baseUrl and baseSite)
   * @param endpoint Name of the OCC endpoint key config
   * @param urlParams  URL parameters
   * @param queryParams Query parameters
   * @param scope
   */
  getUrl(
    endpoint: string,
    urlParams?: object,
    queryParams?: object,
    scope?: string
  ): string {
    endpoint = this.getEndpointForScope(endpoint, scope);

    if (urlParams) {
      Object.keys(urlParams).forEach((key) => {
        urlParams[key] = encodeURIComponent(urlParams[key]);
      });
      endpoint = DynamicTemplate.resolve(endpoint, urlParams);
    }

    if (queryParams) {
      let httpParamsOptions = { encoder: new HttpParamsURIEncoder() };

      if (endpoint.includes('?')) {
        let queryParamsFromEndpoint: string;
        [endpoint, queryParamsFromEndpoint] = endpoint.split('?');

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
        endpoint += '?' + params;
      }
    }

    return this.getEndpoint(endpoint);
  }

  private getEndpointForScope(endpoint: string, scope?: string): string {
    const endpointsConfig = this.config.backend?.occ?.endpoints;
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
}
