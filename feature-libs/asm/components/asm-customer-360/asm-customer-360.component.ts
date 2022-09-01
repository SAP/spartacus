import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';
import { AsmDialogActionEvent, AsmDialogActionType } from '@spartacus/asm/root';
import { UrlCommand, User } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ModalService } from '@spartacus/storefront';
import { AsmConfig } from 'feature-libs/asm/core';
import { AsmCustomer360TabConfig } from 'feature-libs/asm/core/models/customer-360-config';
import { Customer360SectionConfig } from 'feature-libs/asm/core/models/customer-360-section-config';

import { getAsmDialogActionEvent } from '../../core/utils/utils';
import { Customer360SectionContextSource } from './sections/customer-360-section-context-source.model';
import { Customer360SectionContext } from './sections/customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360',
  templateUrl: './asm-customer-360.component.html',
  providers: [
    Customer360SectionContextSource,
    {
      provide: Customer360SectionContext,
      useExisting: Customer360SectionContextSource,
    },
  ],
})
export class AsmCustomer360Component implements OnDestroy {
  iconTypes = ICON_TYPE;
  loading = false;
  tabs: Array<AsmCustomer360TabConfig>;
  activeTab = 0;
  currentTab: AsmCustomer360TabConfig;
  injectors: Array<Array<Injector>>;

  constructor(
    asmConfig: AsmConfig,
    protected injector: Injector,
    protected modalService: ModalService
  ) {
    this.tabs = asmConfig.asm?.customer360?.tabs ?? [];
    this.currentTab = this.tabs[0];
    this.injectors = this.tabs.map((tab) => {
      return tab.components.map((component) =>
        this.createInjector(component.config)
      );
    });
  }

  @Input() customer: User;

  selectTab(selectedTab: any): void {
    this.activeTab = selectedTab;
    this.currentTab = this.tabs[selectedTab];
  }

  getAvatar(): string {
    return (
      (this.customer.firstName?.charAt(0) || '') +
      (this.customer.lastName?.charAt(0) || '')
    );
  }

  // method to navigate screen and close dialog
  navigateTo(route: UrlCommand): void {
    let event: AsmDialogActionEvent;
    event = getAsmDialogActionEvent(
      this.customer,
      AsmDialogActionType.NAVIGATE,
      route
    );
    this.closeModal(event);
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }

  createInjector(config: any): Injector {
    return Injector.create({
      providers: [{ provide: Customer360SectionConfig, useValue: config }],
      parent: this.injector,
    });
  }

  ngOnDestroy(): void {}
}
