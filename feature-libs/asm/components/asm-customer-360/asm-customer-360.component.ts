import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
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
    `,
  ],
})
export class AsmCustomer360Component implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;
  loading = false;
  tabs = Customer360Sections;
  activeTab = 0;

  constructor(protected modalService: ModalService) {}

  @Input() customer: User;

  ngOnInit(): void {
    console.log(this.customer);
  }

  selectTab(selectedTab: any): void {
    console.log(selectedTab);
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

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }

  ngOnDestroy(): void {}
}
