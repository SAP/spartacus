import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FeatureModulesService, WindowRef } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';

/**
 * The AsmEnablerService is used to enable ASM for those scenario's
 * where it's actually used. This service is added to avoid any polution
 * of the UI and runtime performance for the ordinary production user.
 */
@Injectable({
  providedIn: 'root',
})
export class AsmEnablerService {
  constructor(
    protected location: Location,
    protected winRef: WindowRef,
    protected launchDialogService: LaunchDialogService,
    protected featureModules: FeatureModulesService
  ) {}

  /**
   * Loads the ASM UI if needed. The ASM UI will be added based on the
   * existence of a URL parameter or previous usage given by local storage.
   */
  load(): void {
    if (this.isEnabled()) {
      this.addUi();
    }
  }

  /**
   * Indicates whether the ASM module is enabled.
   */
  isEnabled(): boolean {
    if (this.isLaunched() && !this.isUsedBefore()) {
      if (this.winRef.localStorage) {
        this.winRef.localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'true');
      }
    }
    return this.isLaunched() || this.isUsedBefore();
  }

  /**
   * Indicates whether ASM is launched through the URL,
   * using the asm flag in the URL.
   */
  protected isLaunched(): boolean {
    const params = this.location.path().split('?')[1];
    return !!params && params.split('&').includes('asm=true');
  }

  /**
   * Evaluates local storage where we persist the usage of ASM.
   */
  protected isUsedBefore(): boolean {
    if (this.winRef.localStorage) {
      return (
        this.winRef.localStorage.getItem(ASM_ENABLED_LOCAL_STORAGE_KEY) ===
        'true'
      );
    } else {
      return false;
    }
  }

  /**
   * Adds the ASM UI by using the `cx-storefront` outlet.
   */
  protected addUi(): void {
    this.featureModules
      .resolveFeature('asm')
      .subscribe(() => this.launchDialogService.launch(LAUNCH_CALLER.ASM));
  }
}
