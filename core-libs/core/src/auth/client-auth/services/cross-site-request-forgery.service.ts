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
   * Returns CSRF Token
   */
  getCsrfToken(authReqId?: string) {
    const rawUrl = this.authConfigService.getCsrfEndpoint();
    let url = rawUrl;
    if (this.featureToggles.concurrentLoginPagesSupport && authReqId) {
      const parsed = new URL(rawUrl);
      parsed.searchParams.set('auth_req_id', authReqId);
      url = parsed.toString();
    }
    return this.http.get<CSRFResponse>(url, {
      withCredentials: true,
    });
  }
}
