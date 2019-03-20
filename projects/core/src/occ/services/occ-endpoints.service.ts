import { Injectable, Optional } from '@angular/core';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { OccConfig } from '../config/occ-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';
import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
  providedIn: 'root'
})
export class OccEndpointsService {
  private activeBaseSite = this.config.site.baseSite;

  constructor(
    @Optional() private baseSiteService: BaseSiteService,
    private config: OccConfig
  ) {
    if (this.baseSiteService) {
      this.baseSiteService
        .getActive()
        .subscribe(value => (this.activeBaseSite = value));
    }
  }

  getBaseEndpoint(): string {
    if (!this.config || !this.config.server) {
      return '';
    }

    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.activeBaseSite
    );
  }

  getEndpoint(endpoint: string = ''): string {
    return this.getBaseEndpoint() + '/' + endpoint;
  }

  getUrl(endpoint: string, urlParams?: object, queryParams?: object) {
    if (this.config.endpoints[endpoint]) {
      endpoint = this.config.endpoints[endpoint];
    }

    if (urlParams) {
      endpoint = DynamicTemplate.resolve(
        endpoint,
        urlParams
      );
      console.log('urlParams', endpoint);
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

      endpoint += '?' + httpParams.toString();

      console.log('queryParams', endpoint);
    }

    return this.getEndpoint(endpoint);
  }
}
