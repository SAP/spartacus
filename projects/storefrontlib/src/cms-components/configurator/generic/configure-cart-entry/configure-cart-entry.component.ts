import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  GenericConfigurator,
  GenericConfigUtilsService,
  OrderEntry,
} from '@spartacus/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';

@Component({
  selector: 'cx-configure-cart-entry',
  templateUrl: './configure-cart-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureCartEntryComponent {
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;

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

  closeActiveModal(): void {
    const reason: string = this.getDisplayOnly()
      ? 'Display Configuration'
      : 'Edit Configuration';
    this.modalService.closeActiveModal(reason);
  }

  constructor(
    private genericConfigUtilsService: GenericConfigUtilsService,
    private modalService: ModalService
  ) {}
}
