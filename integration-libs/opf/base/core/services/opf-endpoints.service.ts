/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  BaseSiteService,
  DynamicAttributes,
  StringTemplate,
} from '@spartacus/core';

import { OpfApiConfig, OpfConfig } from '@spartacus/opf/base/root';

@Injectable({
  providedIn: 'root',
})
export class OpfEndpointsService {
  private _activeBaseSite: string;

  constructor(
    protected opfConfig: OpfConfig,
    protected opfApiConfig: OpfApiConfig,
    protected baseSiteService: BaseSiteService
  ) {
    if (this.baseSiteService) {
      this.baseSiteService
        .getActive()
        .subscribe((value) => (this._activeBaseSite = value));
    }
  }

  buildUrl(endpoint: string, attributes?: DynamicAttributes): string {
    const baseUrl = this.getBaseEndpoint();
    let opfEndpoint = this.getEndpointFromContext(endpoint);
    if (attributes) {
      const { urlParams } = attributes;

      if (urlParams && opfEndpoint) {
        opfEndpoint = StringTemplate.resolve(opfEndpoint, urlParams, true);
      }
    }

    return `${baseUrl}/${this._activeBaseSite}/${opfEndpoint}`;
  }

  private getEndpointFromContext(endpoint: string): string | undefined {
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
}
