/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { Injectable, Optional } from '@angular/core';
import { FeatureModulesService, ScriptLoader } from '@spartacus/core';
import { SmartEditConfig } from '../config/smart-edit-config';

/**
 * The SmartEditLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
@Injectable({
  providedIn: 'root',
})
export class SmartEditLauncherService {
  private _cmsTicketId: string | undefined;

  get cmsTicketId(): string | undefined {
    return this._cmsTicketId;
  }

  // TODO: make scriptLoader as required dependency and remove featureModules
  constructor(
    config: SmartEditConfig,
    location: Location,
    featureModules: FeatureModulesService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    scriptLoader: ScriptLoader
  );
  /**
   * @deprecated since 5.2
   */
  constructor(
    config: SmartEditConfig,
    location: Location,
    featureModules: FeatureModulesService
  );
  constructor(
    protected config: SmartEditConfig,
    protected location: Location,
    /**
     * @deprecated since 5.2
     */
    protected featureModules: FeatureModulesService,
    @Optional() protected scriptLoader?: ScriptLoader
  ) {}

  /**
   * load webApplicationInjector.js first when Spartacus launched inside SmartEdit
   */
  load(): void {
    if (this.isLaunchedInSmartEdit()) {
      setTimeout(() => {
        this.scriptLoader?.embedScript({
          src: 'assets/webApplicationInjector.js',
          params: undefined,
          attributes: {
            id: 'text/smartedit-injector',
            'data-smartedit-allow-origin': this.config.smartEdit?.allowOrigin,
          },
        });
        console.log('2', this.config.smartEdit?.allowOrigin);
        console.log('abc');
      }, 10000);
    }
  }

  /**
   * Indicates whether Spartacus is launched in SmartEdit
   */
  isLaunchedInSmartEdit(): boolean {
    const path = this.location.path().split('?')[0];
    const params = this.location.path().split('?')[1];
    const cmsToken = params
      ?.split('&')
      .find((param) => param.startsWith('cmsTicketId='));
    this._cmsTicketId = cmsToken?.split('=')[1];

    return (
      path.split('/').pop() === this.config.smartEdit?.storefrontPreviewRoute &&
      !!this._cmsTicketId
    );
  }
}
