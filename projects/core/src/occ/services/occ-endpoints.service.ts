import { HttpParams } from '@angular/common/http';
import { Injectable, isDevMode, Optional } from '@angular/core';
import { DynamicTemplate } from '../../config/utils/dynamic-template';
import { getContextParameterDefault } from '../../site-context/config/context-config-utils';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { OccConfig } from '../config/occ-config';

@Injectable({
  providedIn: 'root',
})
export class OccEndpointsService {
  private activeBaseSite: string;

  private readonly SCOPE_SUFFIX = '_scopes';

  constructor(
    private config: OccConfig,
    @Optional() private baseSiteService: BaseSiteService
  ) {
    this.activeBaseSite =
      getContextParameterDefault(this.config, BASE_SITE_CONTEXT_ID) || '';

    if (this.baseSiteService) {
      this.baseSiteService
        .getActive()
        .subscribe(value => (this.activeBaseSite = value));
    }
  }

  /**
   * Returns and endpoint starting from the OCC baseUrl (no baseSite)
   * @param endpoint Endpoint suffix
   */
  getRawEndpoint(endpoint: string): string {
    if (!this.config || !this.config.backend || !this.config.backend.occ) {
      return '';
    }
    endpoint = this.config.backend.occ.endpoints[endpoint];

    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }

    return this.config.backend.occ.baseUrl + endpoint;
  }

  /**
   * Returns base OCC endpoint (baseUrl + prefix + baseSite)
   */
  getBaseEndpoint(): string {
    if (!this.config || !this.config.backend || !this.config.backend.occ) {
      return '';
    }

    return (
      (this.config.backend.occ.baseUrl || '') +
      this.config.backend.occ.prefix +
      this.activeBaseSite
    );
  }

  /**
   * Returns an OCC endpoint including baseUrl and baseSite
   * @param endpoint Endpoint suffix
   */
  getEndpoint(endpoint: string): string {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return this.getBaseEndpoint() + endpoint;
  }

  /**
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
    scope = ''
  ): string {
    endpoint = this.getEndpointForScope(endpoint, scope);

    if (urlParams) {
      Object.keys(urlParams).forEach(key => {
        urlParams[key] = encodeURIComponent(urlParams[key]);
      });
      endpoint = DynamicTemplate.resolve(endpoint, urlParams);
    }

    if (queryParams) {
      let httpParamsOptions;

      if (endpoint.includes('?')) {
        let queryParamsFromEndpoint;
        [endpoint, queryParamsFromEndpoint] = endpoint.split('?');

        httpParamsOptions = { fromString: queryParamsFromEndpoint };
      }

      let httpParams = new HttpParams(httpParamsOptions);
      Object.keys(queryParams).forEach(key => {
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

  private getEndpointForScope(endpoint: string, scope: string): string {
    const endpointsConfig =
      this.config.backend &&
      this.config.backend.occ &&
      this.config.backend.occ.endpoints;

    if (scope) {
      const endpointConfig = endpointsConfig[`${endpoint}${this.SCOPE_SUFFIX}`];
      if (endpointConfig && endpointConfig[scope]) {
        return endpointConfig[scope];
      }
      if (isDevMode()) {
        console.warn(
          `${endpoint} endpoint configuration missing for scope "${scope}"`
        );
      }
    }

    return endpointsConfig[endpoint] || endpoint;
  }
}
