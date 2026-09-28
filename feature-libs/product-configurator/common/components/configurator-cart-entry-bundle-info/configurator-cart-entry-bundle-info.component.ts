/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Optional, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import {
  CxNumericPipe,
  FeatureToggles,
  ProductScope,
  ProductService,
  TranslatePipe,
  TranslationService,
  UrlPipe,
  useFeatureStyles,
} from '@spartacus/core';
import { BreakpointService } from '@spartacus/storefront';
import { EMPTY, Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { CommonConfiguratorUISettingsConfig } from '../config/common-configurator-ui-settings.config';
import { ConfigureCartEntryComponent } from '../configure-cart-entry/configure-cart-entry.component';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import { ConfiguratorCartEntryBundleInfoService } from './configurator-cart-entry-bundle-info.service';

/**
 * Requires default change detection strategy, as the disabled state of the quantity from control may change,
 * which would not be proper detected with onPush strategy.
 */
@Component({
  selector: 'cx-configurator-cart-entry-bundle-info',
  templateUrl: './configurator-cart-entry-bundle-info.component.html',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    ConfigureCartEntryComponent,
    AsyncPipe,
    TranslatePipe,
    CxNumericPipe,
    UrlPipe,
  ],
})
export class ConfiguratorCartEntryBundleInfoComponent {
  protected config = inject(CommonConfiguratorUISettingsConfig);
  private featureToggles = inject(FeatureToggles);
  protected productService = inject(ProductService);

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService,
    protected breakpointService: BreakpointService,
    protected translation: TranslationService,
    @Optional() protected cartItemContext?: CartItemContext
  ) {
    useFeatureStyles('productConfiguratorCPQContainer');
  }

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly quantityControl$: Observable<UntypedFormControl> =
    this.cartItemContext?.quantityControl$ ?? EMPTY;

  readonly readonly$: Observable<boolean> =
    this.cartItemContext?.readonly$ ?? EMPTY;

  hideItems = true;

  lineItems$: Observable<LineItem[]> = this.orderEntry$.pipe(
    switchMap((entry) => {
      const lineItems =
        this.configCartEntryBundleInfoService.retrieveLineItems(entry);
      if (lineItems.length === 0) {
        return of([]);
      }
      return combineLatest(
        lineItems.map((lineItem) => this.enrichWithProduct(lineItem))
      );
    })
  );

  numberOfLineItems$: Observable<number> = this.lineItems$.pipe(
    map((items) => items.length)
  );

  /**
   * Toggles the state of the items list.
   */
  toggleItems(): void {
    this.hideItems = !this.hideItems;
  }

  /**
   * Adds the product data (used for the PDP link) to a line item. Lookup
   * errors leave the product undefined so that a miss does not fail the stream.
   *
   * @param lineItem - Line item
   * @returns Line item enriched with its product, if it can be loaded
   */
  protected enrichWithProduct(lineItem: LineItem): Observable<LineItem> {
    if (!lineItem.productCode) {
      return of(lineItem);
    }
    return this.productService
      .get(lineItem.productCode, ProductScope.LIST)
      .pipe(
        catchError(() => of(undefined)),
        map((product) => ({ ...lineItem, product }))
      );
  }

  /**
   * Verifies whether the configurator type is a bundle based one.
   *
   * @param entry - Order entry
   * @returns 'true' if the expected configurator type, otherwise 'false'
   */
  isBundleBasedConfigurator(entry: OrderEntry): boolean {
    const configInfos = entry.configurationInfos;
    return configInfos
      ? this.commonConfigUtilsService.isBundleBasedConfigurator(
          configInfos[0]?.configuratorType
        )
      : false;
  }

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> =
    this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);

  /**
   * Emits 'true' if the number of line items exceeds the configured threshold and
   * a navigation to the configuration overview is possible. In that case the items
   * are not expanded in place, but the user is taken to the overview page instead.
   */
  readonly navigateToOverview$: Observable<boolean> = combineLatest([
    this.numberOfLineItems$,
    this.shouldShowButton$,
  ]).pipe(
    map(
      ([numberOfLineItems, shouldShowButton]) =>
        !!this.featureToggles.productConfiguratorCPQContainer &&
        shouldShowButton &&
        numberOfLineItems > this.getCartEntryBundleLineItemsThreshold()
    )
  );

  /**
   * Retrieves the maximum number of line items that are expanded within the cart entry.
   *
   * @returns The configured threshold
   */
  protected getCartEntryBundleLineItemsThreshold(): number {
    return (
      this.config.productConfigurator?.cartEntryBundleLineItemsThreshold ?? 10
    );
  }

  /**
   * Compiles the accessibility description of the link that navigates to the
   * configuration overview.
   *
   * @param items - Number of line items
   * @returns Accessibility description
   */
  getItemsLinkMsg(items: number): string {
    let translatedText = '';
    this.translation
      .translate('configurator.a11y.cartEntryBundleInfo', {
        count: items,
        items: items,
      })
      .pipe(take(1))
      .subscribe((text) => (translatedText = text));

    return translatedText;
  }

  /**
   * Builds the DOM id for the accessibility description of the overview link.
   *
   * @param entry - Order entry
   * @returns Element id for `aria-describedby`
   */
  getItemsLinkMsgId(entry: OrderEntry): string {
    return 'cx-item-list-info-' + entry.entryNumber;
  }

  /**
   * Returns the show/hide label for the bundle line items toggle.
   *
   * @param translatedText - Optional prefix (for example an a11y summary)
   * @returns Translated toggle button text
   */
  getButtonText(translatedText?: string): string {
    if (!translatedText) {
      translatedText = '';
    }
    if (this.hideItems) {
      this.translation
        .translate('configurator.header.show')
        .pipe(take(1))
        .subscribe((text) => (translatedText += text));
    } else {
      this.translation
        .translate('configurator.header.hide')
        .pipe(take(1))
        .subscribe((text) => (translatedText += text));
    }

    return translatedText;
  }

  /**
   * Builds the accessibility label for the show/hide bundle items button.
   *
   * @param items - Number of line items
   * @returns Combined a11y summary and toggle label
   */
  getItemsMsg(items: number): string {
    let translatedText = '';
    this.translation
      .translate('configurator.a11y.cartEntryBundleInfo', {
        count: items,
        items: items,
      })
      .pipe(take(1))
      .subscribe((text) => (translatedText = text));

    return this.getButtonText(translatedText);
  }

  /**
   * Builds the accessibility description for a single bundle line item.
   *
   * @param item - Line item shown in the expanded list
   * @returns Translated description of name, price, and quantity when present
   */
  getHiddenItemInfo(item: LineItem): string {
    let translatedText = '';

    if (item.name && item.formattedPrice && item.formattedQuantity) {
      this.translation
        .translate('configurator.a11y.cartEntryBundle', {
          name: item.name,
          price: item.formattedPrice,
          quantity: item.formattedQuantity,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else if (item.name && item.formattedPrice) {
      this.translation
        .translate('configurator.a11y.cartEntryBundleNameWithPrice', {
          name: item.name,
          price: item.formattedPrice,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else if (item.name && item.formattedQuantity) {
      this.translation
        .translate('configurator.a11y.cartEntryBundleNameWithQuantity', {
          name: item.name,
          quantity: item.formattedQuantity,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.cartEntryBundleName', {
          name: item.name,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }

  /**
   * Builds the DOM id for a line item accessibility description.
   *
   * @param index - Index of the line item in the list
   * @returns Element id for `aria-describedby`
   */
  getHiddenItemInfoId(index: number): string {
    return 'cx-item-hidden-info-' + index.toString();
  }
}
