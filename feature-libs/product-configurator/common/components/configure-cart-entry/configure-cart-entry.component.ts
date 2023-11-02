/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Params } from '@angular/router';
import {
  AbstractOrderContext,
  AbstractOrderType,
  CartItemComponentOptions,
  OrderEntry,
} from '@spartacus/cart/base/root';

import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

interface AbstractOrderData {
  id?: string;
  type: AbstractOrderType;
}

@Component({
  selector: 'cx-configure-cart-entry',
  templateUrl: './configure-cart-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureCartEntryComponent {
  protected static readonly ERROR_MESSAGE_ENTRY_INCONSISTENT =
    "We don't expect order and quote code defined at the same time";
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;
  @Input() options: CartItemComponentOptions;

  abstractOrderContext = inject(AbstractOrderContext, { optional: true });

  // we default to active cart as owner in case no context is provided
  // in this case no id of abstract order is needed
  abstractOrderData$: Observable<AbstractOrderData> = this.abstractOrderContext
    ? combineLatest([
        this.abstractOrderContext.id$,
        this.abstractOrderContext.type$,
      ]).pipe(map(([id, type]) => ({ id, type })))
    : of({ type: AbstractOrderType.CART });

  /**
   * Verifies whether the entry has any issues.
   *
   * @returns - whether there are any issues
   */
  hasIssues(): boolean {
    return this.commonConfigUtilsService.hasIssues(this.cartEntry);
  }

  /**
   * @deprecated Use retrieveOwnerTypeFromAbstractOrderType instead
   * Verifies whether the cart entry has an order code and returns a corresponding owner type.
   *
   * @returns - an owner type
   */
  getOwnerType(): CommonConfigurator.OwnerType {
    return this.cartEntry.orderCode !== undefined
      ? CommonConfigurator.OwnerType.ORDER_ENTRY
      : CommonConfigurator.OwnerType.CART_ENTRY;
  }

  /**
   * Retrieves owner for an abstract order type
   *
   * @returns - an owner type
   */
  retrieveOwnerTypeFromAbstractOrderType(
    abstractOrderData: AbstractOrderData
  ): CommonConfigurator.OwnerType {
    switch (abstractOrderData.type) {
      case AbstractOrderType.ORDER: {
        return CommonConfigurator.OwnerType.ORDER_ENTRY;
      }
      case AbstractOrderType.QUOTE: {
        return CommonConfigurator.OwnerType.QUOTE_ENTRY;
      }
      case AbstractOrderType.SAVED_CART: {
        return CommonConfigurator.OwnerType.SAVED_CART_ENTRY;
      }
      default: {
        return CommonConfigurator.OwnerType.CART_ENTRY;
      }
    }
  }

  /**
   * @deprecated Use retrieveEntityKey instead
   * Verifies whether the cart entry has an order code, retrieves a composed owner ID
   * and concatenates a corresponding entry number.
   *
   * @returns - an entry key
   */
  getEntityKey(): string {
    const entryNumber = this.cartEntry.entryNumber;
    if (entryNumber === undefined) {
      throw new Error('No entryNumber present in entry');
    }

    return this.cartEntry.orderCode
      ? this.commonConfigUtilsService.getComposedOwnerId(
          this.cartEntry.orderCode,
          entryNumber
        )
      : entryNumber.toString();
  }

  /**
   * Verifies whether the cart entry has an order code, retrieves a composed owner ID
   * and concatenates a corresponding entry number.
   *
   * @returns - an entry key
   */
  retrieveEntityKey(abstractOrderData: AbstractOrderData): string {
    const orderType = abstractOrderData.type;
    const ownerDocumentIdNeeded: boolean =
      orderType === AbstractOrderType.ORDER ||
      orderType === AbstractOrderType.QUOTE ||
      orderType === AbstractOrderType.SAVED_CART;
    const entryNumber = this.cartEntry.entryNumber;
    if (entryNumber === undefined) {
      throw new Error('No entryNumber present in entry');
    }
    return ownerDocumentIdNeeded
      ? this.getConfiguratorOwnerId(abstractOrderData, entryNumber)
      : entryNumber.toString();
  }

  protected getConfiguratorOwnerId(
    abstractOrderData: AbstractOrderData,
    entryNumber: number
  ): string {
    const abstractOrderId = abstractOrderData.id;
    if (abstractOrderId === undefined) {
      throw new Error(
        'Abstract order entry owner id must be provided in context'
      );
    }
    return this.commonConfigUtilsService.getComposedOwnerId(
      abstractOrderId,
      entryNumber
    );
  }

  /**
   * Retrieves a corresponding route depending whether the configuration is read only or not.
   *
   * @returns - a route
   */
  getRoute(): string {
    const configuratorType = this.cartEntry.product?.configuratorType;
    return this.readOnly
      ? 'configureOverview' + configuratorType
      : 'configure' + configuratorType;
  }

  /**
   * Retrieves the state of the configuration.
   *
   *  @returns - 'true' if the configuration is read only, otherwise 'false'
   */
  getDisplayOnly(): boolean {
    return this.readOnly;
  }

  /**
   * Verifies whether the link to the configuration is disabled.
   *
   *  @returns - 'true' if the the configuration is not read only, otherwise 'false'
   */
  isDisabled() {
    return this.readOnly ? false : this.disabled;
  }

  /**
   * Retrieves the additional resolve issues accessibility description.
   *
   * @returns - If there is a 'resolve issues' link, the ID to the element with additional description will be returned.
   */
  getResolveIssuesA11yDescription(): string | undefined {
    const errorMsgId = 'cx-error-msg-' + this.cartEntry.entryNumber;
    return !this.readOnly && this.msgBanner ? errorMsgId : undefined;
  }

  /**
   * Compiles query parameters for the router link. 'resolveIssues' is only set if the component is
   * rendered in the context of the message banner, and if issues exist at all
   * @returns Query parameters
   */
  getQueryParams(): Params {
    return {
      forceReload: true,
      resolveIssues: this.msgBanner && this.hasIssues(),
    };
  }

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}
}
