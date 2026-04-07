/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathLocationStrategy, PlatformLocation } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FederatedOriginsService } from './federated-origins.service';

@Injectable({ providedIn: 'root' })
export class FederatedLoginPathLocationStrategy extends PathLocationStrategy {
  federatedOriginService = inject(FederatedOriginsService);

  platformLocation = inject(PlatformLocation);

  // rebase relative URLs onto the origin site
  prepareExternalUrl(url: string) {
    const normalUrl = super.prepareExternalUrl(url);
    if (!this.federatedOriginService.active) {
      return normalUrl;
    }

    // if the normalUrl has a hostname, the origin won't be used
    const rebasedUrl = new URL(
      normalUrl,
      this.federatedOriginService.getOrigin()
    );

    if (!url.startsWith('electronics-spa')) {
      console.log(`preparing url\n  ${url}\n  ${normalUrl}\n  ${rebasedUrl}`);
    }

    return rebasedUrl.href;
  }

  // `pushState` performs a navigation instead of trying to apply the state to the login page
  // TODO: will probably need to make an exception for register states
  override pushState(
    _state: any,
    _title: string,
    url: string,
    queryParams: string
  ) {
    if (!this.federatedOriginService.active) {
      return super.pushState(_state, _title, url, queryParams);
    }

    console.log(`pushState\n  ${_state}\n  ${_title}\n  ${url}`);
    const externalUrl = this.prepareExternalUrl(
      url + this.normalizeQueryParams(queryParams)
    );

    // this.platformLocation.pushState(state, title, externalUrl);
    window.location.assign(externalUrl);
  }

  // replaceState does nothing different.  Used on startup to activate the first state
  override replaceState(
    state: any,
    title: string,
    url: string,
    queryParams: string
  ) {
    if (!this.federatedOriginService.active) {
      return super.replaceState(state, title, url, queryParams);
    }

    console.log(`replaceState\n  ${state}\n  ${title}\n  ${url}`);
    const externalUrl = super.prepareExternalUrl(
      url + this.normalizeQueryParams(queryParams)
    );
    this.platformLocation.replaceState(state, title, externalUrl);
  }

  normalizeQueryParams(params: string): string {
    return !params || params.startsWith('?') ? params : `?${params}`;
  }
}
