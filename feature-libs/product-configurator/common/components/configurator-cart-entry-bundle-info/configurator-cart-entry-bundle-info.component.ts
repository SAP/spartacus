/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Optional, inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import {
  CxNumericPipe,
  FeatureToggles,
  TranslatePipe,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { BreakpointService } from '@spartacus/storefront';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
    ConfigureCartEntryComponent,
    AsyncPipe,
    TranslatePipe,
    CxNumericPipe,
  ],
})
export class ConfiguratorCartEntryBundleInfoComponent {
  protected config = inject(CommonConfiguratorUISettingsConfig);
  private featureToggles = inject(FeatureToggles);

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
    map((entry) =>
      this.configCartEntryBundleInfoService.retrieveLineItems(entry)
    )
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
   * Verifies whether the configurator type is a bundle based one.
   *
   * @param {OrderEntry} entry - Order entry
   * @returns {boolean} - 'true' if the expected configurator type, otherwise 'false'
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
        numberOfLineItems > this.getCpqProductCartEntriesThreshold()
    )
  );

  /**
   * Retrieves the maximum number of line items that are expanded within the cart entry.
   *
   * @returns {number} - the configured threshold
   */
  getCpqProductCartEntriesThreshold(): number {
    return (
      this.config.productConfigurator?.cpqProductCartEntriesThreshold ?? 10
    );
  }

  /**
   * Compiles the accessibility description of the link that navigates to the
   * configuration overview.
   *
   * @param {number} items - number of line items
   * @returns {string} - accessibility description
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

  getItemsLinkMsgId(entry: OrderEntry): string {
    return 'cx-item-list-info-' + entry.entryNumber;
  }

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

  getHiddenItemInfoId(index: number): string {
    return 'cx-item-hidden-info-' + index.toString();
  }
}
