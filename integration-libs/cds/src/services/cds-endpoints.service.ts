/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CdsConfig } from '../config/cds-config';
import { DynamicTemplate } from '../utils/dynamic-template';
import { CdsConfiguration } from '../cds-models';

@Injectable({
  providedIn: 'root',
})
export class CdsEndpointsService {
  constructor(private cdsConfig: CdsConfig) {}

  getUrl(endpoint: string, urlParams: object = {}, queryParams?): string {
    const site = queryParams?.site;
    const cdsConfig = this.getCdsConfig(site);

    if (cdsConfig?.cds?.endpoints[endpoint]) {
      endpoint = cdsConfig.cds.endpoints[endpoint];
    }

    if (!urlParams['tenant']) {
      urlParams['tenant'] = cdsConfig.cds.tenant;
    }

    Object.keys(urlParams).forEach((key) => {
      urlParams[key] = encodeURIComponent(urlParams[key]);
    });
    endpoint = DynamicTemplate.resolve(endpoint, urlParams);

    if (queryParams) {
      let httpParamsOptions;

      if (endpoint.includes('?')) {
        let queryParamsFromEndpoint;
        [endpoint, queryParamsFromEndpoint] = endpoint.split('?');

        httpParamsOptions = { fromString: queryParamsFromEndpoint };
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

    return this.getEndpoint(endpoint, site);
  }

  private getEndpoint(endpoint: string, site: string): string {
    const baseEndpoint = this.getSiteBaseEndpoint(site);
    /*
     * If the endpoint to get the url for already has the configured base url appended,
     * do not try and append it again
     */
    if (endpoint.startsWith(baseEndpoint)) {
      return endpoint;
    }

    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }

    return `${baseEndpoint}${endpoint}`;
  }

  private getCdsConfig(site: string) {
    const foundConfig = this.cdsConfig.cdsConfigs?.filter(
      (config: CdsConfiguration) => config.site === site
    );
    return foundConfig?.length
      ? {
          cds: foundConfig[0],
        }
      : this.cdsConfig;
  }

  private getSiteBaseEndpoint(site: string): string {
    const cdsConfig = this.getCdsConfig(site);
    if (!cdsConfig || !cdsConfig.cds || !cdsConfig.cds.baseUrl) {
      return '';
    }

    return cdsConfig.cds.baseUrl;
  }
}
