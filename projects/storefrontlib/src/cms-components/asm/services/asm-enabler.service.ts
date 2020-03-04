import { Location } from '@angular/common';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { OutletService } from '../../../cms-structure/index';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';
import { AsmMainUiComponent } from '../asm-main-ui/asm-main-ui.component';
import { TriggerService } from 'projects/storefrontlib/src/shared/services/trigger/config/trigger.service';
import { TriggerConfig } from 'projects/storefrontlib/src/shared/services/trigger/config/trigger-config';

/**
 * The AsmEnablerService is used to enable ASM for those scenario's
 * where it's actually used. This service is added to avoid any polution
 * of the UI and runtime performance for the ordinary production user.
 */
@Injectable({
  providedIn: 'root',
})
export class AsmEnablerService {
  /** indicates whether the ASM UI has been added already */
  private isUiAdded = false;

  constructor(
    protected location: Location,
    protected winRef: WindowRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletService: OutletService<ComponentFactory<any>>,
    protected triggerService: TriggerService,
    protected triggerConfig: TriggerConfig
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
  private isLaunched(): boolean {
    const params = this.location.path().split('?')[1];
    return params && params.split('&').includes('asm=true');
  }

  /**
   * Evaluates local storage where we persist the usage of ASM.
   */
  private isUsedBefore(): boolean {
    return (
      this.winRef.localStorage &&
      this.winRef.localStorage.getItem(ASM_ENABLED_LOCAL_STORAGE_KEY) === 'true'
    );
  }

  /**
   * Adds the ASM UI by using the `cx-storefront` outlet.
   */
  private addUi(): void {
    if (this.isUiAdded) {
      return;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      AsmMainUiComponent
    );
    this.triggerService.renderDialog(this.triggerConfig.trigger?.asm, factory);
    // this.outletService.add('cx-storefront', factory, OutletPosition.BEFORE);
    this.isUiAdded = true;
  }
}
