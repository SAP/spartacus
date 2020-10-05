import { Component, Input } from '@angular/core';
import { GenericConfiguratorUtilsService, OrderEntry } from '@spartacus/core';
import { ICON_TYPE } from '../../../misc/icon';

@Component({
  selector: 'cx-configurator-issues-notification',
  templateUrl: './configurator-issues-notification.component.html',
})
export class ConfiguratorIssuesNotificationComponent {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  @Input() disabled: boolean;
  iconTypes = ICON_TYPE;

  constructor(
    protected genericConfigUtilsService: GenericConfiguratorUtilsService
  ) {}

  /**
   * Verifies whether the item has any issues.
   *
   * @returns {boolean} - whether there are any issues
   */
  hasIssues(): boolean {
    return this.genericConfigUtilsService.hasIssues(this.item);
  }

  /**
   * Retrieves the number of issues at the cart item.
   *
   * @returns {number} - the number of issues at the cart item
   */
  getNumberOfIssues(): number {
    return this.genericConfigUtilsService.getNumberOfIssues(this.item);
  }
}
