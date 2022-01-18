import { Component, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry, TranslationService } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CartItemContext,
} from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import { ConfiguratorCartEntryBundleInfoService } from './configurator-cart-entry-bundle-info.service';

/**
 * Requires default change detection strategy, as the disabled state of the quantity from control may change,
 * which would not be proper detected with onPush strategy.
 */
@Component({
  selector: 'cx-configurator-cart-entry-bundle-info',
  templateUrl: './configurator-cart-entry-bundle-info.component.html',
})
export class ConfiguratorCartEntryBundleInfoComponent {
  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService,
    protected breakpointService: BreakpointService,
    protected translation: TranslationService,
    @Optional() protected cartItemContext?: CartItemContext
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly quantityControl$: Observable<FormControl> =
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

  /**
   * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
   */
  isDesktop(): Observable<boolean> {
    return this.breakpointService?.isUp(BREAKPOINT.md);
  }

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> =
    this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);

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
      .translate('configurator.a11y.cartEntryBundleInfo', { items: items })
      .pipe(take(1))
      .subscribe((text) => (translatedText = text));

    return this.getButtonText(translatedText);
  }

  getHiddenItemInfo(item: LineItem): string {
    let translatedText = '';

    if (item) {
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
    }
    return translatedText;
  }

  getHiddenItemInfoId(index: number): string {
    return 'cx-item-hidden-info-' + index?.toString();
  }
}
