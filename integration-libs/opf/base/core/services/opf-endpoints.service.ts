/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BaseSiteService,
  DynamicAttributes,
  HttpParamsURIEncoder,
  StringTemplate,
} from '@spartacus/core';

import { OpfApiConfig, OpfConfig } from '@spartacus/opf/base/root';

@Injectable({
  providedIn: 'root',
})
export class OpfEndpointsService {
  protected opfConfig = inject(OpfConfig);
  protected opfApiConfig = inject(OpfApiConfig);
  protected baseSiteService = inject(BaseSiteService);

  private _activeBaseSite: string;

  protected initialize(): void {
    if (this.baseSiteService) {
      this.baseSiteService
        .getActive()
        .subscribe((value) => (this._activeBaseSite = value));
    }
  }

  constructor() {
    this.initialize();
  }

  buildUrl(endpoint: string, attributes?: DynamicAttributes): string {
    const baseUrl = this.getBaseEndpoint();
    let opfEndpoint = this.getEndpointFromContext(endpoint);
    if (attributes) {
      const { urlParams, queryParams } = attributes;

      if (urlParams && opfEndpoint) {
        opfEndpoint = StringTemplate.resolve(opfEndpoint, urlParams, true);
      }

      if (queryParams) {
        let httpParamsOptions = { encoder: new HttpParamsURIEncoder() };

        if (opfEndpoint.includes('?')) {
          let queryParamsFromEndpoint: string;
          [opfEndpoint, queryParamsFromEndpoint] = opfEndpoint.split('?');
          httpParamsOptions = {
            ...httpParamsOptions,
            ...{ fromString: queryParamsFromEndpoint },
          };
        }

        const httpParams = this.getHttpParamsFromQueryParams(
          queryParams,
          httpParamsOptions
        );

        const params = httpParams.toString();
        if (params.length) {
          opfEndpoint += '?' + params;
        }
      }
    }

    return `${baseUrl}/${this._activeBaseSite}/${opfEndpoint}`;
  }

  private getEndpointFromContext(endpoint: string): string {
    const endpointsConfig = this.opfApiConfig.backend?.opfApi?.endpoints;

    if (!endpointsConfig) {
      return '';
    }

    const endpointConfig: any =
      endpointsConfig[endpoint as keyof typeof endpointsConfig];

    return endpointConfig;
  }

  private getBaseEndpoint(): string {
    if (this.opfConfig && this.opfConfig.opf && this.opfConfig.opf.opfBaseUrl) {
      return this.opfConfig.opf.opfBaseUrl;
    }

    return '';
  }

  protected getHttpParamsFromQueryParams(
    queryParams: any,
    options: HttpParamsOptions
  ) {
    let httpParams = new HttpParams(options);
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key as keyof object];
      if (value !== undefined) {
        if (value === null) {
          httpParams = httpParams.delete(key);
        } else {
          httpParams = httpParams.set(key, value);
        }
      }
    });
    return httpParams;
  }
}
