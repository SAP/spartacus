/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  PaginationModel,
  QueryState,
  TranslatePipe,
  TranslationService,
  UserPaymentService,
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
import {
  ICON_TYPE,
  IconComponent,
  PaginationComponent,
  SpinnerComponent,
  OutletModule,
} from '@spartacus/storefront';
import { Observable, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OpfCheckoutBillingAddressFormService } from '../opf-checkout-billing-address-form';
import { OpfCheckoutPaymentWrapperComponent } from '../opf-checkout-payment-wrapper/opf-checkout-payment-wrapper.component';
import { OpfCheckoutOutlets } from '../../root/model';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    IconComponent,
    NgTemplateOutlet,
    OpfCheckoutPaymentWrapperComponent,
    PaginationComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    OutletModule,
  ],
})
export class OpfCheckoutPaymentsComponent implements OnInit, OnDestroy {
  protected opfBaseService = inject(OpfBaseFacade);
  protected opfConfig = inject(OpfConfig);
  protected translation = inject(TranslationService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfCheckoutBillingAddressFormService = inject(
    OpfCheckoutBillingAddressFormService
  );
  protected userPaymentService = inject(UserPaymentService);

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

  @Input()
  forceRadioInputsView? = false;

  @Input()
  forceDefaultPaymentOptionInputSelection? = false;

  @Input()
  renderPaymentWrapper? = true;

  @Input()
  noRenderPaymentWrapperMessage?: string;

  readonly opfCheckoutOutlets = OpfCheckoutOutlets;

  readonly SAVED_CARDS_ID = -1;

  protected outletContext$ = new Subject<any>();

  selectedPaymentId?: number;

  isOnlyOnePaymentOptionAvailable = false;

  activeConfigurations$: Observable<
    QueryState<OpfActiveConfigurationsResponse | undefined>
  >;

  iconTypes = ICON_TYPE;

  @Output() paymentChange = new EventEmitter<OpfActiveConfiguration>();

  @Output() selectedPaymentProviderName = new EventEmitter<string>();

  protected paginationModel: PaginationModel | undefined;
  protected paymentDisabled$ =
    this.opfCheckoutBillingAddressFormService.paymentOptionsDisabled$;

  protected isStateEmpty(
    state: QueryState<OpfActiveConfigurationsResponse | undefined>
  ) {
    return !state?.loading && !state?.data?.value?.length;
  }

  protected handleDefaultPaymentOptionInputSelection(
    state: QueryState<OpfActiveConfigurationsResponse | undefined>
  ) {
    const firstPaymentOption = state.data?.value?.[0];

    if (this.isOnlyOnePaymentOptionAvailable) {
      this.selectedPaymentId = firstPaymentOption?.id;
      const providerName = firstPaymentOption?.displayName;
      if (providerName) {
        this.selectedPaymentProviderName.emit(providerName);
      }
    }

    this.opfMetadataStoreService.updateOpfMetadata({
      defaultSelectedPaymentOptionId: firstPaymentOption?.id,
    });

    if (
      this.forceDefaultPaymentOptionInputSelection &&
      !this.selectedPaymentId
    ) {
      this.selectedPaymentId = firstPaymentOption?.id;
    }
  }

  protected checkIfOnlyOnePaymentOptionAvailable(
    state: QueryState<OpfActiveConfigurationsResponse | undefined>
  ): boolean {
    return (
      state.data?.value?.length === 1 && state.data?.page?.totalPages === 1
    );
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
              this.paginationModel = this.getPaginationModel(state.data?.page);

              if (this.onlyPaymentWrapperMode && this.selectedPaymentId) {
                state.data.value = state.data.value.filter(
                  (config) => config.id === this.selectedPaymentId
                );
              }

              this.isOnlyOnePaymentOptionAvailable =
                this.checkIfOnlyOnePaymentOptionAvailable(state);

              this.handleDefaultPaymentOptionInputSelection(state);
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
            this.emitOutletContext();
          } else if (
            !state.termsAndConditionsChecked &&
            this.explicitTermsAndConditions
          ) {
            isPreselected = false;
            this.selectedPaymentId = undefined;
            this.emitOutletContext();
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

  protected emitOutletContext(): void {
    this.outletContext$.next({
      selectedPaymentId: this.selectedPaymentId,
      savedCardsId: this.SAVED_CARDS_ID,
      disabled: this.disabled && this.explicitTermsAndConditions,
      savedCardsSelected: this.onSavedCardsSelected.bind(this),
    });
  }

  onSavedCardsSelected(): void {
    this.selectedPaymentId = this.SAVED_CARDS_ID;
    this.opfMetadataStoreService.updateOpfMetadata({
      selectedPaymentOptionId: this.SAVED_CARDS_ID,
    });
    this.emitOutletContext();
  }

  changePayment(payment: OpfActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
    this.opfMetadataStoreService.updateOpfMetadata({
      selectedPaymentOptionId: this.selectedPaymentId,
    });
    this.emitOutletContext();
    this.paymentChange.emit(payment);
  }

  getPaginationModel(
    pagination?: OpfActiveConfigurationsPagination
  ): PaginationModel {
    if (pagination?.number !== undefined) {
      this.paginationIndex = pagination.number - 1;
    }

    return {
      currentPage: this.paginationIndex,
      pageSize: pagination?.size,
      totalPages: pagination?.totalPages,
      totalResults: pagination?.totalElements,
    };
  }

  pageChange(page: number): void {
    this.paginationIndex = page;
    this.updateActiveConfiguration();
  }

  ngOnInit(): void {
    this.userPaymentService.loadPaymentMethods();
    this.updateActiveConfiguration();
    this.preselectPaymentOption();
    this.emitOutletContext();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
