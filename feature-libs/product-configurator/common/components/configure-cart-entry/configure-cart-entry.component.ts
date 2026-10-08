/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AbstractOrderContext } from '@spartacus/cart/base/components';
import {
  AbstractOrderKey,
  AbstractOrderType,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  FeatureDirective,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CommonConfigurator,
  ConfiguratorType,
  ReadOnlyPostfix,
} from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

@Component({
  selector: 'cx-configure-cart-entry',
  templateUrl: './configure-cart-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgTemplateOutlet,
    RouterLink,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class ConfigureCartEntryComponent {
  protected routingService = inject(RoutingService);

  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;
  /**
   * Indicates whether the link navigates from bundle information to the
   * configuration overview.
   */
  @Input() isBundleOverviewLink = false;
  /**
   * Container row identifier of a bundle line item. When set, the link
   * navigates to the nested product configuration within the bundle.
   */
  @Input() rowId?: string;
  /**
   * ID of an element that provides an additional description for the link.
   */
  @Input() a11yDescriptionId?: string;
  abstractOrderContext = inject(AbstractOrderContext, { optional: true });

  // we default to active cart as owner in case no context is provided
  // in this case no id of abstract order is needed
  abstractOrderKey$: Observable<AbstractOrderKey> = this.abstractOrderContext
    ? this.abstractOrderContext.key$
    : of({ type: AbstractOrderType.CART });

  /** Query params when `productConfiguratorCPQContainer` is disabled. */
  legacyQueryParams$: Observable<{
    forceReload: boolean;
    resolveIssues: boolean;
    navigateToCheckout: boolean;
    productCode: string | undefined;
  }> = this.isInCheckout().pipe(
    map((isInCheckout) => ({
      forceReload: true,
      resolveIssues: this.msgBanner && this.hasIssues(),
      navigateToCheckout: isInCheckout,
      productCode: this.cartEntry.product?.code,
    }))
  );

  /** Query params when `productConfiguratorCPQContainer` is enabled. */
  cpqContainerQueryParams$: Observable<{
    forceReload: boolean;
    resolveIssues: boolean;
    navigateToCheckout: boolean;
    isBundleOverview: boolean;
    productCode: string | undefined;
    rowId: string | undefined;
  }> = this.isInCheckout().pipe(
    map((isInCheckout) => {
      const resolveIssues = this.msgBanner && this.hasIssues();
      return {
        forceReload: true,
        resolveIssues,
        navigateToCheckout: isInCheckout,
        isBundleOverview: !isInCheckout && this.isBundleOverviewLink,
        // the nested product of a bundle line item is identified by its row, not
        // by a product code, which would be resolved against the catalog
        productCode: this.rowId ? undefined : this.cartEntry.product?.code,
        // Issue resolution (overview / cart banner) and bundle line deep links
        // are mutually exclusive; rowId is only for "Edit Product Configuration".
        rowId: resolveIssues ? undefined : this.rowId,
      };
    })
  );

  /**
   * Verifies whether the entry has any issues.
   *
   * @returns - whether there are any issues
   */
  hasIssues(): boolean {
    return this.commonConfigUtilsService.hasIssues(this.cartEntry);
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
   * Retrieves the resource key for the link text.
   *
   * @returns - The resource key that controls the link text
   */
  /**
   * Link text when `productConfiguratorCPQContainer` is disabled.
   *
   * @returns - The resource key that controls the link text
   */
  getLegacyLinkTextResourceKey(): string {
    if (this.getDisplayOnly()) {
      return 'configurator.header.displayConfiguration';
    }
    if (this.msgBanner) {
      return 'configurator.header.resolveIssues';
    }
    return 'configurator.header.editConfiguration';
  }

  /**
   * Link text when `productConfiguratorCPQContainer` is enabled.
   *
   * @returns - The resource key that controls the link text
   */
  getCpqContainerLinkTextResourceKey(): string {
    if (this.isBundleOverviewLink) {
      return 'configurator.header.show';
    }
    if (this.getDisplayOnly()) {
      return 'configurator.header.displayConfiguration';
    }
    if (this.msgBanner) {
      return 'configurator.header.resolveIssues';
    }
    if (this.rowId) {
      return 'configurator.header.editProductConfiguration';
    }
    return this.cartEntry.product?.configuratorType === ConfiguratorType.CPQ
      ? 'configurator.header.editBundleConfiguration'
      : 'configurator.header.editConfiguration';
  }

  /**
   * Verifies whether the link to the configuration is disabled.
   *
   *  @returns - 'true' if the configuration is not read only, otherwise 'false'
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
    if (this.a11yDescriptionId) {
      return this.a11yDescriptionId;
    }
    const errorMsgId = 'cx-error-msg-' + this.cartEntry.entryNumber;
    return !this.getDisplayOnly() && this.msgBanner ? errorMsgId : undefined;
  }

  protected isInCheckout(): Observable<boolean> {
    return this.routingService.getRouterState().pipe(
      map((routerState) => {
        return routerState.state.semanticRoute === 'checkoutReviewOrder';
      })
    );
  }

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}
}
