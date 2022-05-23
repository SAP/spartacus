import { Component, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartItemContextSource } from '@spartacus/cart/base/components';
import {
  CartItemComponentOptions,
  CartItemContext,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { ICON_TYPE, OutletContextData } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

interface ItemListContext {
  readonly: boolean;
  options: CartItemComponentOptions;
  item: OrderEntry;
  quantityControl: FormControl;
}

@Component({
  selector: 'cx-configurator-issues-notification',
  templateUrl: './configurator-issues-notification.component.html',
  host: { role: 'row' },
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class ConfiguratorIssuesNotificationComponent {
  iconTypes = ICON_TYPE;

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    @Optional() public outletContext?: OutletContextData<ItemListContext>
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.outletContext?.context$.pipe(
      map((context: ItemListContext) => {
        console.log(context);
        return context.item;
      })
    ) ?? EMPTY;

  readonly quantityControl$: Observable<FormControl> =
    this.outletContext?.context$.pipe(
      map((context: ItemListContext) => {
        console.log(context);
        return context.quantityControl;
      })
    ) ?? EMPTY;

  readonly readonly$: Observable<boolean> =
    this.outletContext?.context$.pipe(
      map((context: ItemListContext) => {
        console.log(context);
        return context.readonly;
      })
    ) ?? EMPTY;

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> =
    this.commonConfigUtilsService.isActiveCartContext(undefined);

  /**
   * Verifies whether the item has any issues.
   *
   * @param item - Cart item
   * @returns - whether there are any issues
   */
  hasIssues(item: OrderEntry): boolean {
    return this.commonConfigUtilsService.hasIssues(item);
  }

  /**
   * Retrieves the number of issues at the cart item.
   *
   * @param item - Cart item
   * @returns - the number of issues at the cart item
   */
  getNumberOfIssues(item: OrderEntry): number {
    return this.commonConfigUtilsService.getNumberOfIssues(item);
  }

  /**
   * Retrieves the unique id for the error message.
   *
   * @param item - Cart item
   * @returns - Unique id for error message
   */
  getErrorMessageId(item: OrderEntry): string {
    return 'cx-error-msg-' + item.entryNumber;
  }
}
