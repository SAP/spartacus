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

  isCustomer360Configured: boolean | undefined = false;
  isCustomer360Loaded$ = new BehaviorSubject<boolean>(false);

  @ViewChild('customer360Launcher') customer360LauncherElement: ElementRef;

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
    this.isCustomer360Configured =
      this.featureModules?.isConfigured('customer360');
    if (this.isCustomer360Configured) {
      // trigger lazy loading of the Customer 360 feature:
      this.featureModules?.resolveFeature('customer360').subscribe(() => {
        this.isCustomer360Loaded$.next(true);
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

  openCustomer360() {
    this.subscription.add(
      this.isCustomer360Loaded$
        .pipe(filter((isReady) => Boolean(isReady)))
        .subscribe(() => {
          const data = { customer: this.customer };
          this.launchDialogService?.openDialogAndSubscribe(
            LAUNCH_CALLER.ASM_CUSTOMER_360,
            this.customer360LauncherElement,
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
