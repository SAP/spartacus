import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FeatureModulesService } from '@spartacus/core';
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

  constructor(
    protected config: SmartEditConfig,
    protected location: Location,
    protected featureModules: FeatureModulesService
  ) {}

  /**
   * Lazy loads modules when Spartacus launced inside Smart Edit
   */
  load(): void {
    if (
      this.isLaunchedInSmartEdit() &&
      this.featureModules.isConfigured('smartEdit')
    ) {
      this.featureModules.resolveFeature('smartEdit').subscribe();
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
