/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsmDialogActionEvent } from '@spartacus/asm/customer-360/root';
import { FeatureModulesService, User } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  isCustomerEmulationSessionInProgress$: Observable<boolean>;

  isCustomer360Configured = false;

  @ViewChild('customer360Launcher') customer360LauncherElement: ElementRef;

  protected subscription = new Subscription();

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userAccountFacade: UserAccountFacade,
    protected launchDialogService: LaunchDialogService,
    protected featureModules: FeatureModulesService
  ) {}

  ngOnInit() {
    this.isCustomer360Configured =
      this.featureModules.isConfigured('customer360');

    this.subscription.add(
      this.userAccountFacade.get().subscribe((user) => {
        if (user) {
          this.customer = user;
        }
      })
    );
    this.isCustomerEmulationSessionInProgress$ =
      this.asmComponentService.isCustomerEmulationSessionInProgress();
  }

  logoutCustomer() {
    this.asmComponentService.logoutCustomer();
  }

  openCustomer360() {
    const data = { customer: this.customer };
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.ASM_CUSTOMER_360,
      this.customer360LauncherElement,
      data
    );

    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(filter((result) => Boolean(result)))
        .subscribe((event: AsmDialogActionEvent) => {
          this.asmComponentService.handleAsmDialogAction(event);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
