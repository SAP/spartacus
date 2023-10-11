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
  Optional,
  ViewChild,
} from '@angular/core';
import { AsmDialogActionEvent } from '@spartacus/asm/customer-360/root';
import { FeatureModulesService, User } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  isCustomerEmulationSessionInProgress$: Observable<boolean>;

  isAsmCustomer360Configured: boolean | undefined = false;
  isAsmCustomer360Loaded$ = new BehaviorSubject<boolean>(false);

  @ViewChild('asmCustomer360Launcher')
  asmCustomer360LauncherElement: ElementRef;

  protected subscription = new Subscription();

  constructor(
    asmComponentService: AsmComponentService,
    userAccountFacade: UserAccountFacade,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    launchDialogService: LaunchDialogService,
    featureModules: FeatureModulesService
  );
  /**
   * @deprecated since 7.0
   */
  constructor(
    asmComponentService: AsmComponentService,
    userAccountFacade: UserAccountFacade
  );
  constructor(
    protected asmComponentService: AsmComponentService,
    protected userAccountFacade: UserAccountFacade,
    // TODO(CXSPA-3090): Remove optional flag in 7.0
    @Optional() protected launchDialogService?: LaunchDialogService,
    @Optional() protected featureModules?: FeatureModulesService
  ) {}

  ngOnInit() {
    this.isAsmCustomer360Configured =
      this.featureModules?.isConfigured('asmCustomer360');
    if (this.isAsmCustomer360Configured) {
      // trigger lazy loading of the Customer 360 feature:
      this.featureModules?.resolveFeature('asmCustomer360').subscribe(() => {
        this.isAsmCustomer360Loaded$.next(true);
      });
    }

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

  openAsmCustomer360() {
    this.subscription.add(
      this.isAsmCustomer360Loaded$
        .pipe(filter((isReady) => Boolean(isReady)))
        .subscribe(() => {
          const data = { customer: this.customer };
          this.launchDialogService?.openDialogAndSubscribe(
            LAUNCH_CALLER.ASM_CUSTOMER_360,
            this.asmCustomer360LauncherElement,
            data
          );

          this.subscription.add(
            this.launchDialogService?.dialogClose
              .pipe(filter((result) => Boolean(result)))
              .subscribe((event: AsmDialogActionEvent) => {
                this.asmComponentService.handleAsmDialogAction(event);
              })
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
