import { Component, Input, OnDestroy } from '@angular/core';
import {
  AsmDialogActionEvent,
  AsmDialogActionType,
  CUSTOMER_360_SECTION_TITLE,
} from '@spartacus/asm/root';
import { TranslationService, UrlCommand, User } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

import { getAsmDialogActionEvent } from '../../core/utils/utils';
import { Customer360Sections } from './asm-customer-360.model';

@Component({
  selector: 'cx-asm-customer-360',
  templateUrl: './asm-customer-360.component.html',
})
export class AsmCustomer360Component implements OnDestroy {
  iconTypes = ICON_TYPE;
  loading = false;
  tabs = Customer360Sections;
  activeTab = 0;

  constructor(
    protected modalService: ModalService,
    protected translation: TranslationService
  ) {}

  @Input() customer: User;

  selectTab(selectedTab: any): void {
    this.activeTab = selectedTab;
  }

  getActiveTabContent(): string {
    return this.tabs[this.activeTab].sectionContent;
  }

  getAvatar(): string {
    return (
      (this.customer.firstName?.charAt(0) || '') +
      (this.customer.lastName?.charAt(0) || '')
    );
  }

  getTabTitle(sectionTitle: string): Observable<string> {
    let key = '';
    switch (sectionTitle) {
      case CUSTOMER_360_SECTION_TITLE.ACTIVITY:
        key = 'asm.customer360.activity';
        break;
      case CUSTOMER_360_SECTION_TITLE.FEEDBACK:
        key = 'asm.customer360.feedback';
        break;
      case CUSTOMER_360_SECTION_TITLE.MAPS:
        key = 'asm.customer360.maps';
        break;
      case CUSTOMER_360_SECTION_TITLE.OVERVIEW:
        key = 'asm.customer360.overview';
        break;
      case CUSTOMER_360_SECTION_TITLE.PROFILE:
        key = 'asm.customer360.profile';
        break;
      case CUSTOMER_360_SECTION_TITLE.PROMOTIONS:
        key = 'asm.customer360.promotions';
        break;
    }
    return this.translation.translate(key);
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

  ngOnDestroy(): void {}
}
