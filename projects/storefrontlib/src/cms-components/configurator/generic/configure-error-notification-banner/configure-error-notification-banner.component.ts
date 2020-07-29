import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '../../../misc/icon';
import { OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-configure-error-notification-banner',
  templateUrl: './configure-error-notification-banner.component.html',
})
export class ConfigureErrorNotificationBannerComponent {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  iconTypes = ICON_TYPE;

  constructor() {}

  /**
   * Verifies whether the item has any issues.
   *
   * @returns {boolean} - whether there are any issues
   */
  hasIssues(): boolean {
    return this.getNumberOfIssues() > 0;
  }

  /**
   * Retrieves the number of issues at the cart item.
   *
   * @returns {number} - the number of issues at the cart item
   */
  getNumberOfIssues(): number {
    let numberOfIssues = 0;
    if (this.item.statusSummaryList) {
      this.item.statusSummaryList.forEach((statusSummary) => {
        if (statusSummary.status === 'ERROR') {
          numberOfIssues = statusSummary.numberOfIssues;
        }
      });
    }
    return numberOfIssues;
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
