import { Injectable } from '@angular/core';
import { CdsConfig } from '../config/cds-config';
import { DynamicTemplate } from '../utils/dynamic-template';

@Injectable({
  providedIn: 'root',
})
export class CdsEndpointsService {
  constructor(private cdsConfig: CdsConfig) {}

  getUrl(endpoint: string, urlParams: object = {}): string {
    if (
      this.cdsConfig &&
      this.cdsConfig.cds &&
      this.cdsConfig.cds.endpoints[endpoint]
    ) {
      endpoint = this.cdsConfig.cds.endpoints[endpoint];
    }

    if (!urlParams['tenant']) {
      urlParams['tenant'] = this.cdsConfig.cds.tenant;
    }

    Object.keys(urlParams).forEach(key => {
      urlParams[key] = encodeURIComponent(urlParams[key]);
    });
    endpoint = DynamicTemplate.resolve(endpoint, urlParams);

    return this.getEndpoint(endpoint);
  }

  private getEndpoint(endpoint: string): string {
    /*
     * If the endpoint to get the url for already has the configured base url appended,
     * do not try and append it again
     */
    if (endpoint.startsWith(this.getBaseEndpoint())) {
      return endpoint;
    }

    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }

    return `${this.getBaseEndpoint()}${endpoint}`;
  }

  private getBaseEndpoint(): string {
    if (!this.cdsConfig || !this.cdsConfig.cds || !this.cdsConfig.cds.baseUrl) {
      return '';
    }

    return this.cdsConfig.cds.baseUrl;
  }
}
