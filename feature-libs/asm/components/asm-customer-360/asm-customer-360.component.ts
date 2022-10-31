/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { AsmConfig, getAsmDialogActionEvent } from '@spartacus/asm/core';
import {
  Asm360Facade,
  AsmCustomer360Data,
  AsmCustomer360TabConfig,
  AsmDialogActionEvent,
  AsmDialogActionType,
} from '@spartacus/asm/root';
import { UrlCommand, User } from '@spartacus/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360',
  templateUrl: './asm-customer-360.component.html',
})
export class AsmCustomer360Component implements OnInit {
  iconTypes = ICON_TYPE;
  loading = false;
  tabs: Array<AsmCustomer360TabConfig>;
  activeTab = 0;
  currentTab: AsmCustomer360TabConfig;

  customer: User;

  customer360Tab$: Observable<Array<AsmCustomer360Data | undefined>>;

  constructor(
    protected asmConfig: AsmConfig,
    protected asm360Facade: Asm360Facade,
    protected injector: Injector,
    protected launchDialogService: LaunchDialogService
  ) {
    this.tabs = asmConfig.asm?.customer360?.tabs ?? [];
    this.currentTab = this.tabs[0];
  }

  ngOnInit(): void {
    this.launchDialogService.data$.subscribe((data) => {
      const customer: User = data.customer;

      this.customer = customer;
    });

    this.setTabData();
  }

  selectTab(selectedTab: any): void {
    this.activeTab = selectedTab;
    this.currentTab = this.tabs[selectedTab];

    this.setTabData();
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
    this.launchDialogService.closeDialog(reason);
  }

  protected setTabData(): void {
    this.customer360Tab$ = this.asm360Facade.get360Data(this.activeTab).pipe(
      map((response) => {
        if (response) {
          return this.currentTab.components.map((component) => {
            const requestData = component.requestData;

            if (requestData) {
              return response.value.find(
                (data) => data.type === requestData.customer360Type
              );
            }
          });
        } else {
          return [];
        }
      })
    );
  }
}
