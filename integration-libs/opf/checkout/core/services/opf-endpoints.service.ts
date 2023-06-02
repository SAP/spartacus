/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  BaseSiteService,
  Config,
  DynamicAttributes,
  StringTemplate,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OpfEndpointsService {
  private _activeBaseSite: string;

  constructor(
    private config: Config,
    private baseSiteService: BaseSiteService
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
    const endpointsConfig = this.config.backend?.occ?.endpoints;

    if (!endpointsConfig) {
      return '';
    }

    const endpointConfig: any =
      endpointsConfig[endpoint as keyof typeof endpointsConfig];

    return endpointConfig;
  }

  private getBaseEndpoint(): string {
    if (!this.config || !this.config.opf || !this.config.opf.baseUrl) {
      return '';
    }

    return this.config.opf.baseUrl;
  }
}
