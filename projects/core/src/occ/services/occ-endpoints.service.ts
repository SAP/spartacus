import { Injectable } from '@angular/core';
import { OccConfig } from '../config/occ-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';
import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
  providedIn: 'root'
})
export class OccEndpointsService {
  constructor(private config: OccConfig) {}

  getBaseEndpoint(): string {
    if (!this.config || !this.config.server) {
      return '';
    }

    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite
    );
  }

  getEndpoint(endpoint: string): string {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return this.getBaseEndpoint() + endpoint;
  }

  getUrl(endpoint: string, urlParams?: object, queryParams?: object): string {
    if (this.config.endpoints[endpoint]) {
      endpoint = this.config.endpoints[endpoint];
    }

    if (urlParams) {
      endpoint = DynamicTemplate.resolve(endpoint, urlParams);
    }

    if (queryParams) {
      let httpParamsOptions: HttpParamsOptions;

      if (endpoint.indexOf('?') !== -1) {
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
}
