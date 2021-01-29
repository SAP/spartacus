import { Component, Optional } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext, ICON_TYPE } from '@spartacus/storefront';
import { EMPTY } from 'rxjs';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

@Component({
  selector: 'cx-configurator-issues-notification',
  templateUrl: './configurator-issues-notification.component.html',
})
export class ConfiguratorIssuesNotificationComponent {
  iconTypes = ICON_TYPE;

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    // TODO(#10946): make CartItemContext a required dependency
    @Optional() protected cartItemContext?: CartItemContext
  ) {}

  readonly orderEntry$ = this.cartItemContext?.item$ ?? EMPTY;
  readonly quantityControl$ = this.cartItemContext?.quantityControl$ ?? EMPTY;
  readonly readonly$ = this.cartItemContext?.readonly$ ?? EMPTY;

  /**
   * Verifies whether the item has any issues.
   *
   * @param {OrderEntry} item - Cart item
   * @returns {boolean} - whether there are any issues
   */
  hasIssues(item: OrderEntry): boolean {
    return this.commonConfigUtilsService.hasIssues(item);
  }

  /**
   * Retrieves the number of issues at the cart item.
   *
   * @param {OrderEntry} item - Cart item
   * @returns {number} - the number of issues at the cart item
   */
  getNumberOfIssues(item: OrderEntry): number {
    return this.commonConfigUtilsService.getNumberOfIssues(item);
  }
}
