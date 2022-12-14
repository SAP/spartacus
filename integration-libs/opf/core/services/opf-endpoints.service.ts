/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BaseSiteService, Config } from '@spartacus/core';

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

  buildUrl(endpoint: string): string {
    const baseUrl = this.getBaseEndpoint();
    const opfEndpoint = this.getEndpointFromContext(endpoint);
    const result = `${baseUrl}/${this._activeBaseSite}/${opfEndpoint}`;
    return result;
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
