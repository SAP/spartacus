import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
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

  public getOwnerType(): CommonConfigurator.OwnerType {
    return this.cartEntry.orderCode !== undefined
      ? CommonConfigurator.OwnerType.ORDER_ENTRY
      : CommonConfigurator.OwnerType.CART_ENTRY;
  }

  public getEntityKey(): string {
    return this.cartEntry.orderCode !== undefined
      ? this.commonConfigUtilsService.getComposedOwnerId(
          this.cartEntry.orderCode,
          this.cartEntry.entryNumber
        )
      : '' + this.cartEntry.entryNumber;
  }

  public getRoute(): string {
    const configuratorType = this.cartEntry.product.configuratorType;
    return this.readOnly
      ? 'configureOverview' + configuratorType
      : 'configure' + configuratorType;
  }

  public getDisplayOnly(): boolean {
    return this.readOnly;
  }

  public isDisabled() {
    return this.readOnly ? false : this.disabled;
  }

  getReason(): string {
    if (this.readOnly) {
      return 'Display Configuration';
    } else {
      if (this.msgBanner) {
        return 'Resolve Issues';
      }
      return 'Edit Configuration';
    }
  }

  closeActiveModal(): void {
    this.modalService.closeActiveModal(this.getReason());
  }

  constructor(
    private commonConfigUtilsService: CommonConfiguratorUtilsService,
    private modalService: ModalService
  ) {}
}
