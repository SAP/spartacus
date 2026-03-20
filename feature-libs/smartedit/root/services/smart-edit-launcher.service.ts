/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FeatureModulesService, ScriptLoader } from '@spartacus/core';
import { SmartEditConfig } from '../config/smart-edit-config';
import { SMART_EDIT_FEATURE } from '../feature-name';

/**
 * The SmartEditLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
@Injectable({
  providedIn: 'root',
})
export class SmartEditLauncherService {
  protected readonly featureModulesService = inject(FeatureModulesService);
  private _cmsTicketId: string | undefined;
  private static readonly STORAGE_KEY_CMS_TICKET_ID = 'smartedit.cmsTicketId';

  get cmsTicketId(): string | undefined {
    return this._cmsTicketId;
  }

  constructor(
    protected config: SmartEditConfig,
    protected location: Location,
    protected scriptLoader: ScriptLoader
  ) {}

  /**
   * load webApplicationInjector.js first when Spartacus launched inside SmartEdit
   */
  load(): void {
    if (this.isLaunchedInSmartEdit()) {
      this.featureModulesService.resolveFeature(SMART_EDIT_FEATURE).subscribe();

      this.scriptLoader?.embedScript({
        src: 'assets/webApplicationInjector.js',
        params: undefined,
        attributes: {
          id: 'text/smartedit-injector',
          'data-smartedit-allow-origin': this.config.smartEdit?.allowOrigin,
        },
      });
    }
  }

  /**
   * Indicates whether Spartacus is launched in SmartEdit
   */
  isLaunchedInSmartEdit(): boolean {
    const [path, params] = this.location.path().split('?');
    const cmsToken = params
      ?.split('&')
      .find((param) => param.startsWith('cmsTicketId='));
    const cmsTicketId = cmsToken?.split('=')[1] ?? undefined;

    return (
      this.isInitialSmartEditPage(path, cmsTicketId) ||
      this.isFullPageRedirectInSmartEdit()
    );
  }

  private isInitialSmartEditPage(
    path: string,
    cmsTicketId: string | undefined
  ): boolean {
    // When both the SmartEdit cmsTicketId and the storefrontPreviewRoute values are found in the URL, store the cmsTicketId in sessionStorage.
    // so it survives full-page navigation (e.g. CDC OIDC redirect flow).
    if (
      path.split('/').pop() === this.config.smartEdit?.storefrontPreviewRoute &&
      !!cmsTicketId
    ) {
      this.persistCmsTicketId(cmsTicketId);
      this._cmsTicketId = cmsTicketId;
      return true;
    }
    return false;
  }

  private isFullPageRedirectInSmartEdit(): boolean {
    // Fall back to sessionStorage for scenarios where a full-page redirect
    // drops the cmsTicketId and other SmartEdit context from the URL.
    this._cmsTicketId = this.restoreCmsTicketId();
    return !!this._cmsTicketId;
  }

  private persistCmsTicketId(cmsTicketId: string): void {
    sessionStorage.setItem(
      SmartEditLauncherService.STORAGE_KEY_CMS_TICKET_ID,
      cmsTicketId
    );
  }

  private restoreCmsTicketId(): string | undefined {
    const stored = sessionStorage.getItem(
      SmartEditLauncherService.STORAGE_KEY_CMS_TICKET_ID
    );
    return stored ?? undefined;
  }
}
