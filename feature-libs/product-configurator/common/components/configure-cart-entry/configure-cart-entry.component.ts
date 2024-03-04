/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { RoutingService } from '@spartacus/core';
import {
  AbstractOrderKey,
  AbstractOrderType,
  OrderEntry,
} from '@spartacus/cart/base/root';

import { AbstractOrderContext } from '@spartacus/cart/base/components';
import { Observable, of } from 'rxjs';
import {
  CommonConfigurator,
  ReadOnlyPostfix,
} from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-configure-cart-entry',
  templateUrl: './configure-cart-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureCartEntryComponent {
  protected routingService = inject(RoutingService);

  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;
  abstractOrderContext = inject(AbstractOrderContext, { optional: true });

  // we default to active cart as owner in case no context is provided
  // in this case no id of abstract order is needed
  abstractOrderKey$: Observable<AbstractOrderKey> = this.abstractOrderContext
    ? this.abstractOrderContext.key$
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
    abstractOrderKey: AbstractOrderKey
  ): CommonConfigurator.OwnerType {
    switch (abstractOrderKey.type) {
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
  retrieveEntityKey(abstractOrderKey: AbstractOrderKey): string {
    const entryNumber = this.cartEntry.entryNumber;
    if (entryNumber === undefined) {
      throw new Error('No entryNumber present in entry');
    }
    return abstractOrderKey.type !== AbstractOrderType.CART
      ? this.commonConfigUtilsService.getComposedOwnerId(
          abstractOrderKey.id,
          entryNumber
        )
      : entryNumber.toString();
  }

  /**
   * Retrieves a corresponding route depending whether the configuration is read only or not.
   *
   * @returns - a route
   */
  getRoute(): string {
    const configuratorType = this.cartEntry.product?.configuratorType;
    return !this.readOnly || configuratorType?.endsWith(ReadOnlyPostfix)
      ? 'configure' + configuratorType
      : 'configureOverview' + configuratorType;
  }

  /**
   * Retrieves the state of the configuration.
   *
   *  @returns - 'true' if the configuration is read only or configurator type contains a read-only postfix, otherwise 'false'
   */
  getDisplayOnly(): boolean {
    const configuratorType = this.cartEntry.product?.configuratorType;
    return (
      this.readOnly ||
      !configuratorType ||
      configuratorType.endsWith(ReadOnlyPostfix)
    );
  }

  /**
   * Verifies whether the link to the configuration is disabled.
   *
   *  @returns - 'true' if the the configuration is not read only, otherwise 'false'
   */
  isDisabled(): boolean {
    return this.readOnly ? false : this.disabled;
  }

  /**
   * Retrieves the additional resolve issues accessibility description.
   *
   * @returns - If there is a 'resolve issues' link, the ID to the element with additional description will be returned.
   */
  getResolveIssuesA11yDescription(): string | undefined {
    const errorMsgId = 'cx-error-msg-' + this.cartEntry.entryNumber;
    return !this.getDisplayOnly() && this.msgBanner ? errorMsgId : undefined;
  }

  /**
   * Compiles query parameters for the router link.
   * 'resolveIssues' is only set if the component is
   * rendered in the context of the message banner, and if issues exist at all
   * 'navigateToCart' is set to 'true' if the navigation to the cart is relevant, otherwise set to 'false'
   *
   * @returns Query parameters
   */
  getQueryParams(): Params {
    return {
      forceReload: true,
      resolveIssues: this.msgBanner && this.hasIssues(),
      navigateToCart: this.isCartRelevant(),
    };
  }

  protected isCartRelevant(): boolean {
    let isCartRelevant = false;
    const locations = ['cart', 'product', 'search'];
    this.routingService
      .getRouterState()
      .pipe(
        map((routerState) => {
          let isFound = false;
          locations.forEach((location) => {
            if (routerState.state.semanticRoute === location) {
              isFound = true;
            }
          });
          return isFound;
        })
      )
      .subscribe((value) => (isCartRelevant = value));
    return isCartRelevant;
  }

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}
}
