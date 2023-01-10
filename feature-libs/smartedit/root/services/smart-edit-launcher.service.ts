/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { FeatureConfigService, FeatureModulesService } from '@spartacus/core';
import { asapScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';
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

  // TODO: make platformId as required dependency and remove featureConfigService
  constructor(
    config: SmartEditConfig,
    location: Location,
    featureModules: FeatureModulesService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    platformId: Object,
    featureConfigService: FeatureConfigService
  );
  /**
   * @deprecated since 5.1
   */
  constructor(
    config: SmartEditConfig,
    location: Location,
    featureModules: FeatureModulesService
  );
  constructor(
    protected config: SmartEditConfig,
    protected location: Location,
    protected featureModules: FeatureModulesService,
    @Optional() @Inject(PLATFORM_ID) protected platformId?: Object,
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {}

  /**
   * Lazy loads modules when Spartacus launced inside Smart Edit
   */
  // load(): void {
  //   if (
  //     this.isLaunchedInSmartEdit() &&
  //     this.featureModules.isConfigured(SMART_EDIT_FEATURE)
  //   ) {
  //     if (this.featureConfigService?.isLevel('5.1')) {
  //       if (this.platformId && isPlatformBrowser(this.platformId)) {
  //         console.log('confused here');
  //         // we don't want to process smartedit when doing SSR
  //         this.featureModules.resolveFeature(SMART_EDIT_FEATURE).subscribe();
  //       }
  //     } else {
  //       console.log('am I being called with the * thing');
  //       this.featureModules.resolveFeature(SMART_EDIT_FEATURE).subscribe();
  //     }
  //   }
  // }

  /**
   * Lazy loads modules when Spartacus launced inside Smart Edit
   */
  load(): void {
    if (
      this.isLaunchedInSmartEdit() &&
      this.featureModules.isConfigured('smartEdit')
    ) {
      // console.log(this.config);
      console.log('hi from launcher - scheduler');
      // this.featureModules.resolveFeature('smartEdit').subscribe();
      setTimeout(() =>
        this.featureModules
          .resolveFeature('smartEdit')
          .pipe(observeOn(asapScheduler))
          .subscribe()
      );

      // console.log('a', this.config);
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
    console.log(`cmsToken = ${cmsToken}`);
    this._cmsTicketId = cmsToken?.split('=')[1];

    console.log(`path pop = ${path.split('/').pop()}`);

    return (
      path.split('/').pop() === this.config.smartEdit?.storefrontPreviewRoute &&
      !!this._cmsTicketId
    );
  }
}
