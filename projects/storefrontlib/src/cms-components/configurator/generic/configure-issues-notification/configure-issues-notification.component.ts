import { Component, Input } from '@angular/core';
import { GenericConfigUtilsService, OrderEntry } from '@spartacus/core';
import { ICON_TYPE } from '../../../misc/icon';

@Component({
  selector: 'cx-configure-issues-notification',
  templateUrl: './configure-issues-notification.component.html',
})
export class ConfigureIssuesNotificationComponent {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  @Input() disabled: boolean;
  iconTypes = ICON_TYPE;

  constructor(private genericConfigUtilsService: GenericConfigUtilsService) {}

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

  /**
   * Retrieves a certain issue message key depending on the number of issues for translation.
   *
   * @param numberOfErrors - number of errors
   * @return {string} - the error message key
   */
  getIssueMessageKey(numberOfErrors: number): string {
    if (numberOfErrors && numberOfErrors !== 0) {
      if (numberOfErrors === 1) {
        return 'configurator.notificationBanner.numberOfIssue';
      } else {
        return 'configurator.notificationBanner.numberOfIssues';
      }
    }
    return '';
  }
}
