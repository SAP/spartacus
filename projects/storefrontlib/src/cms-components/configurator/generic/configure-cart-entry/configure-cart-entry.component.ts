import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  GenericConfigurator,
  GenericConfigUtilsService,
  OrderEntry,
  TranslationService,
} from '@spartacus/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { take } from 'rxjs/operators';

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
    const translation = this.getDisplayOnly()
      ? this.translation.translate('configurator.header.displayConfiguration')
      : this.translation.translate('configurator.header.editConfiguration');

    translation
      .pipe(take(1))
      .subscribe((reason) => this.modalService.closeActiveModal(reason));
  }

  constructor(
    private genericConfigUtilsService: GenericConfigUtilsService,
    private modalService: ModalService,
    private translation: TranslationService
  ) {}
}
