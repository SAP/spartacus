/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { ConfigureCartEntryComponent } from '../configure-cart-entry/configure-cart-entry.component';

@Component({
  selector: 'cx-configurator-cart-entry-info',
  templateUrl: './configurator-cart-entry-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfigureCartEntryComponent, AsyncPipe, TranslatePipe],
})
export class ConfiguratorCartEntryInfoComponent {
  protected cartItemContext =
    inject(CartItemContext, { optional: true }) ?? undefined;
  protected commonConfigUtilsService = inject(CommonConfiguratorUtilsService);

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly quantityControl$: Observable<UntypedFormControl> =
    this.cartItemContext?.quantityControl$ ?? EMPTY;

  /**
   * Disabled state of the quantity control, tracked reactively. The control is
   * enabled/disabled imperatively while the cart loads (on the same instance,
   * with control events suppressed). Re-reading `disabled` on the control's
   * `statusChanges` AND whenever the cart entry (`orderEntry$`) re-emits lets
   * this OnPush component pick up the final enabled state instead of the
   * transient disabled one captured when the link first renders.
   */
  readonly quantityControlDisabled$: Observable<boolean> = combineLatest([
    this.quantityControl$,
    this.orderEntry$.pipe(startWith(null)),
  ]).pipe(
    switchMap(([quantityControl]) =>
      quantityControl.statusChanges.pipe(
        startWith(quantityControl.status),
        map(() => quantityControl.disabled)
      )
    )
  );

  readonly readonly$: Observable<boolean> =
    this.cartItemContext?.readonly$ ?? EMPTY;

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> =
    this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);

  /**
   * Verifies whether the configuration infos have any entries and the first entry has a status.
   * Only in this case we want to display the configuration summary
   *
   * @param {OrderEntry} item - Cart item
   * @returns {boolean} - whether the status of configuration infos entry has status
   */
  hasStatus(item: OrderEntry): boolean {
    const configurationInfos = item.configurationInfos;

    return configurationInfos
      ? configurationInfos.length > 0 && configurationInfos[0].status !== 'NONE'
      : false;
  }

  /**
   * Verifies whether the configurator type is attribute based one.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
   */
  isAttributeBasedConfigurator(item: OrderEntry): boolean {
    const configurationInfos = item.configurationInfos;

    return configurationInfos
      ? this.commonConfigUtilsService.isAttributeBasedConfigurator(
          configurationInfos[0]?.configuratorType
        )
      : false;
  }

  getHiddenConfigurationInfoId(index: number): string {
    return 'cx-configuration-hidden-info-' + index.toString();
  }
}
