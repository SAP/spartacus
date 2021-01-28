import { Location } from '@angular/common';
import { Injectable, NgModuleRef } from '@angular/core';
import {
  CmsConfig,
  ConfigInitializerService,
  LazyModulesService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
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

  private smartEditModuleInstance$: Observable<
    NgModuleRef<any> | undefined
  > = this.configInitializer.getStable('featureModules').pipe(
    map((config: CmsConfig) => config.featureModules ?? {}),
    switchMap((featureModulesConfig) =>
      featureModulesConfig['smartEdit']?.module
        ? this.lazyModule.resolveModuleInstance(
            featureModulesConfig['smartEdit']?.module,
            'smartEdit'
          )
        : of(undefined)
    ),
    shareReplay()
  );

  constructor(
    protected config: SmartEditConfig,
    protected location: Location,
    protected lazyModule: LazyModulesService,
    protected configInitializer: ConfigInitializerService
  ) {}

  /**
   * Lazy loads modules when Spartacus launced inside Smart Edit
   */
  load(): void {
    if (this.isLaunchedInSmartEdit()) {
      this.smartEditModuleInstance$.subscribe();
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
      path.split('/').pop() === this.config.smartEdit.storefrontPreviewRoute &&
      !!this._cmsTicketId
    );
  }
}
