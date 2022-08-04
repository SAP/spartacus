import { Component, Input, OnDestroy } from '@angular/core';
import { AsmDialogActionEvent, AsmDialogActionType } from '@spartacus/asm/root';
import {
  User,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { getAsmDialogActionEvent } from 'feature-libs/asm/core';
import { ModalService } from 'projects/storefrontlib/shared/components/modal';
import { Customer360Sections } from './asm-customer-360.model';

@Component({
  selector: 'cx-asm-customer-360',
  templateUrl: './asm-customer-360.component.html',
  styles: [
    `
    ::ng-deep ngb-modal-window {
      overflow-y: hidden !important;
    }

    ::ng-deep .modal-dialog {
      display: flex;
      max-height: 80vh !important;
      max-width: 80vw !important;
    }

    ::ng-deep .modal-content {
      max-height: 100%;
    }
    `
  ],
})
export class AsmCustomer360Component implements OnDestroy {
  iconTypes = ICON_TYPE;
  loading = false;
  tabs = Customer360Sections;
  activeTab = 0;


  constructor(
    protected modalService: ModalService
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

  // method to navigate screen and close dialog
  navigateTo(route: string): void {
    let event: AsmDialogActionEvent;
      event = getAsmDialogActionEvent(this.customer, AsmDialogActionType.NAVIGATE, route);
    this.closeModal(event);
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }

  ngOnDestroy(): void {
  }
}
