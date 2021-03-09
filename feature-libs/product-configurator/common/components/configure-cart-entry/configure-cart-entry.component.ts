import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

@Component({
  selector: 'cx-configure-cart-entry',
  templateUrl: './configure-cart-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureCartEntryComponent {
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;

  /**
   * Verifies whether the entry has any issues.
   *
   * @returns {boolean} - whether there are any issues
   */
  hasIssues(): boolean {
    return this.commonConfigUtilsService.hasIssues(this.cartEntry);
  }

  /**
   * Verifies whether the cart entry has an order code and returns a corresponding owner type.
   *
   * @returns {CommonConfigurator.OwnerType} - an owner type
   */
  getOwnerType(): CommonConfigurator.OwnerType {
    return this.cartEntry.orderCode !== undefined
      ? CommonConfigurator.OwnerType.ORDER_ENTRY
      : CommonConfigurator.OwnerType.CART_ENTRY;
  }

  /**
   * Verifies whether the cart entry has an order code, retrieves a composed owner ID
   * and concatenates a corresponding entry number.
   *
   * @returns {string} - an entry key
   */
  getEntityKey(): string {
    const entryNumber = this.cartEntry.entryNumber;
    if (entryNumber === undefined) {
      throw new Error('No entryNumber present in entry');
    }

    return this.cartEntry.orderCode
      ? this.commonConfigUtilsService.getComposedOwnerId(
          this.cartEntry.orderCode,
          entryNumber
        )
      : entryNumber.toString();
  }

  /**
   * Retrieves a corresponding route depending whether the configuration is read only or not.
   *
   * @returns {string} - a route
   */
  getRoute(): string {
    const configuratorType = this.cartEntry.product?.configuratorType;
    return this.readOnly
      ? 'configureOverview' + configuratorType
      : 'configure' + configuratorType;
  }

  /**
   * Retrieves the state of the configuration.
   *
   *  @returns {boolean} - 'true' if the configuration is read only, otherwise 'false'
   */
  getDisplayOnly(): boolean {
    return this.readOnly;
  }

  /**
   * Verifies whether the link to the configuration is disabled.
   *
   *  @returns {boolean} - 'true' if the the configuration is not read only, otherwise 'false'
   */
  isDisabled() {
    return this.readOnly ? false : this.disabled;
  }

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}
}
