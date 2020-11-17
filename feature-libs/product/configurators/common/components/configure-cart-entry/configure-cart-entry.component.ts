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

  getOwnerType(): CommonConfigurator.OwnerType {
    return this.cartEntry.orderCode !== undefined
      ? CommonConfigurator.OwnerType.ORDER_ENTRY
      : CommonConfigurator.OwnerType.CART_ENTRY;
  }

  getEntityKey(): string {
    return this.cartEntry.orderCode !== undefined
      ? this.commonConfigUtilsService.getComposedOwnerId(
          this.cartEntry.orderCode,
          this.cartEntry.entryNumber
        )
      : '' + this.cartEntry.entryNumber;
  }

  getRoute(): string {
    const configuratorType = this.cartEntry.product.configuratorType;
    return this.readOnly
      ? 'configureOverview' + configuratorType
      : 'configure' + configuratorType;
  }

  getDisplayOnly(): boolean {
    return this.readOnly;
  }

  isDisabled() {
    return this.readOnly ? false : this.disabled;
  }

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}
}
