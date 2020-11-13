import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { GenericConfigurator } from '../../core/model/generic-configurator.model';
import { GenericConfiguratorUtilsService } from '../../shared/utils/generic-configurator-utils.service';

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
    return this.genericConfigUtilsService.hasIssues(this.cartEntry);
  }

  public getOwnerType(): GenericConfigurator.OwnerType {
    return this.cartEntry.orderCode !== undefined
      ? GenericConfigurator.OwnerType.ORDER_ENTRY
      : GenericConfigurator.OwnerType.CART_ENTRY;
  }

  public getEntityKey(): string {
    return this.cartEntry.orderCode !== undefined
      ? this.genericConfigUtilsService.getComposedOwnerId(
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
    private genericConfigUtilsService: GenericConfiguratorUtilsService,
    private modalService: ModalService
  ) {}
}
