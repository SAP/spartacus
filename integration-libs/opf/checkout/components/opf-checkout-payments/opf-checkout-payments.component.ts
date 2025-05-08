/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  PaginationModel,
  QueryState,
  TranslationService,
} from '@spartacus/core';
import {
  OpfActiveConfiguration,
  OpfActiveConfigurationsPagination,
  OpfActiveConfigurationsResponse,
  OpfBaseFacade,
  OpfConfig,
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutPaymentsComponent implements OnInit, OnDestroy {
  protected opfBaseService = inject(OpfBaseFacade);
  protected opfConfig = inject(OpfConfig);
  protected translation = inject(TranslationService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected globalMessageService = inject(GlobalMessageService);

  protected subscription = new Subscription();

  protected paginationIndex = 0;

  @Input()
  isHeadingDisplayed? = true;

  @Input()
  headingTranslationKey?: string;

  @Input()
  isPaymentRenderBelow? = true;

  @Input()
  isPaymentInfoMessageEnabled? = true;

  @Input()
  elementsPerPage?: number;

  @Input()
  disabled = true;

  @Input()
  explicitTermsAndConditions: boolean | null | undefined;

  @Input()
  onlyPaymentWrapperMode? = false;

  @Input()
  customPaymentTemplate?: TemplateRef<any>;

  @Input()
  hideOnlyOnePaymentProviderLabel? = false;

  selectedPaymentId?: number;

  isOnlyOnePaymentOptionAvailable = false;

  activeConfigurations$: Observable<
    QueryState<OpfActiveConfigurationsResponse | undefined>
  >;

  iconTypes = ICON_TYPE;

  @Output() paymentChange = new EventEmitter<OpfActiveConfiguration>();

  @Output() selectedPaymentProviderName = new EventEmitter<string>();

  protected isStateEmpty(
    state: QueryState<OpfActiveConfigurationsResponse | undefined>
  ) {
    return !state?.loading && !Boolean(state?.data?.value?.length);
  }

  getActiveConfigurations(): Observable<
    QueryState<OpfActiveConfigurationsResponse | undefined>
  > {
    return this.opfBaseService
      .getActiveConfigurationsState({
        pageSize: this.elementsPerPage,
        pageNumber: this.paginationIndex + 1,
      })
      .pipe(
        tap(
          (state: QueryState<OpfActiveConfigurationsResponse | undefined>) => {
            if (state.error) {
              this.displayError('loadActiveConfigurations');
            } else if (this.isStateEmpty(state)) {
              this.displayError('noActiveConfigurations');
            }

            if (state.data?.value && !state.error && !state.loading) {
              if (this.onlyPaymentWrapperMode && this.selectedPaymentId) {
                state.data.value = state.data.value.filter(
                  (config) => config.id === this.selectedPaymentId
                );
              }

              this.isOnlyOnePaymentOptionAvailable =
                state.data.value.length === 1;

              if (this.isOnlyOnePaymentOptionAvailable) {
                this.selectedPaymentId = state.data?.value[0]?.id;
                const providerName = state.data?.value[0]?.displayName;
                if (providerName) {
                  this.selectedPaymentProviderName.emit(providerName);
                }
              }

              this.opfMetadataStoreService.updateOpfMetadata({
                defaultSelectedPaymentOptionId: state.data?.value[0]?.id,
              });
            }
          }
        )
      );
  }

  updateActiveConfiguration() {
    this.activeConfigurations$ = this.getActiveConfigurations();
  }

  getPaymentInfoMessage(paymentId: number | undefined): Observable<string> {
    const defaultMessage = 'opfCheckout.defaultPaymentInfoMessage';
    const translationKey =
      paymentId && this.opfConfig?.opf?.paymentOption?.paymentInfoMessagesMap
        ? (this.opfConfig.opf.paymentOption.paymentInfoMessagesMap[paymentId] ??
          defaultMessage)
        : defaultMessage;

    return this.translation.translate(translationKey);
  }

  get isPaymentInfoMessageVisible(): boolean {
    return Boolean(
      this.opfConfig?.opf?.paymentOption?.enableInfoMessage &&
        this.isPaymentInfoMessageEnabled
    );
  }

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
          if (
            !isPreselected &&
            (state.termsAndConditionsChecked ||
              !this.explicitTermsAndConditions)
          ) {
            isPreselected = true;
            this.selectedPaymentId = !state.selectedPaymentOptionId
              ? state.defaultSelectedPaymentOptionId
              : state.selectedPaymentOptionId;
            this.opfMetadataStoreService.updateOpfMetadata({
              selectedPaymentOptionId: this.selectedPaymentId,
            });
          } else if (
            !state.termsAndConditionsChecked &&
            this.explicitTermsAndConditions
          ) {
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

  changePayment(payment: OpfActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
    this.opfMetadataStoreService.updateOpfMetadata({
      selectedPaymentOptionId: this.selectedPaymentId,
    });
    this.paymentChange.emit(payment);
  }

  getPaginationModel(
    pagination?: OpfActiveConfigurationsPagination
  ): PaginationModel {
    const paginationModel: PaginationModel = {
      currentPage: this.paginationIndex,
      pageSize: pagination?.size,
      totalPages: pagination?.totalPages,
      totalResults: pagination?.totalElements,
    };

    return paginationModel;
  }

  pageChange(page: number): void {
    this.paginationIndex = page;
    this.updateActiveConfiguration();
  }

  ngOnInit(): void {
    this.updateActiveConfiguration();
    this.preselectPaymentOption();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
