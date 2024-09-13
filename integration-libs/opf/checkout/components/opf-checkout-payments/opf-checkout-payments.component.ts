/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  QueryState,
} from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfBaseFacade,
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentsComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  activeConfigurations$ = this.opfBaseService
    .getActiveConfigurationsState()
    .pipe(
      tap((state: QueryState<ActiveConfiguration[] | undefined>) => {
        if (state.error) {
          this.displayError('loadActiveConfigurations');
        } else if (!state.loading && !Boolean(state.data?.length)) {
          this.displayError('noActiveConfigurations');
        }

        if (state.data && !state.error && !state.loading) {
          this.opfMetadataStoreService.updateOpfMetadata({
            defaultSelectedPaymentOptionId: state?.data[0]?.id,
          });
        }
      })
    );

  @Input()
  disabled = true;

  selectedPaymentId?: number;

  constructor(
    protected opfBaseService: OpfBaseFacade,
    protected opfMetadataStoreService: OpfMetadataStoreService,
    protected globalMessageService: GlobalMessageService
  ) {}

  /**
   * Method pre-selects (based on terms and conditions state)
   * previously selected payment option ID by customer.
   */
  protected preselectPaymentOption(): void {
    let isPreselected = false;
    this.subscription.add(
      this.opfMetadataStoreService
        .getOpfMetadataState()
        .subscribe((state: OpfMetadataModel) => {
          if (state.termsAndConditionsChecked && !isPreselected) {
            isPreselected = true;
            this.selectedPaymentId = !state.selectedPaymentOptionId
              ? state.defaultSelectedPaymentOptionId
              : state.selectedPaymentOptionId;
            this.opfMetadataStoreService.updateOpfMetadata({
              selectedPaymentOptionId: this.selectedPaymentId,
            });
          } else if (!state.termsAndConditionsChecked) {
            isPreselected = false;
            this.selectedPaymentId = undefined;
          }
        })
    );
  }

  protected displayError(errorKey: string): void {
    this.globalMessageService.add(
      { key: `opfCheckout.errors.${errorKey}` },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  changePayment(payment: ActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
    this.opfMetadataStoreService.updateOpfMetadata({
      selectedPaymentOptionId: this.selectedPaymentId,
    });
  }

  ngOnInit(): void {
    this.preselectPaymentOption();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
