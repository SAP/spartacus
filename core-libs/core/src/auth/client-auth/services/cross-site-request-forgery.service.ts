/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FeatureToggles } from '../../../features-config';
import { CSRFResponse } from '../../user-auth/models/csrf-response';
import { AuthConfigService } from '../../user-auth/services/auth-config.service';
import { appendAuthReqId } from '../../user-auth/utils/url-with-auth-req-id';

/**
 * Service to handle CSRF (Cross-Site Request Forgery) protection mechanisms
 * by retrieving CSRF tokens as needed.
 *
 * This service provides a method to fetch the CSRF token from a configured
 * endpoint, which can be used to ensure secure communication by protecting
 * against CSRF attacks.
 */
@Injectable({
  providedIn: 'root',
})
export class CrossSiteRequestForgeryService {
  protected http = inject(HttpClient);
  protected authConfigService = inject(AuthConfigService);
  private featureToggles = inject(FeatureToggles);

  /**
   * Returns the CSRF token from the configured endpoint.
   *
   * When concurrentLoginPagesSupport is enabled and an authReqId is provided,
   * the ID is appended as an auth_req_id query parameter so the authorization
   * server can correlate the token with the correct pending PKCE session.
   * See {@link appendAuthReqId} for the URL-handling strategy used to support
   * both absolute and relative endpoint configurations.
   *
   * @param authReqId the concurrent-login request identifier, if present
   */
  getCsrfToken(authReqId?: string) {
    const rawUrl = this.authConfigService.getCsrfEndpoint();
    const url =
      this.featureToggles.concurrentLoginPagesSupport && authReqId
        ? (appendAuthReqId(rawUrl, authReqId) ?? rawUrl)
        : rawUrl;
    return this.http.get<CSRFResponse>(url, {
      withCredentials: true,
    });
  }
}
