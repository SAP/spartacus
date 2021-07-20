import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeQuantityService } from '../../quantity';
import { ConfiguratorUiKeyGeneratorComponent } from './configurator-ui-key-generator.component';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ConfiguratorAttributeBaseComponent extends ConfiguratorUiKeyGeneratorComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super();
  }

  /**
   * Checks if we are supposed to render a quantity control, which
   * can be derived from the attribute meta data
   *
   * @return {boolean} - Display quantity picker?
   */
  get withQuantity(): boolean {
    return (
      this.quantityService?.withQuantity(
        this.attribute?.dataType ?? Configurator.DataType.NOT_IMPLEMENTED,
        this.attribute?.uiType ?? Configurator.UiType.NOT_IMPLEMENTED
      ) ?? false
    );
  }

  /**
   * Fires an event to handle a quantity.
   *
   * @param {number} quantity - Quantity value
   */
  onHandleQuantity(quantity: number): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
    };

    this.emitEvent(event);
  }

  /**
   * Emits an event containing a given value..
   *
   * @param {ConfigFormUpdateEvent} eventValue - Value to emit
   */
  emitEvent(eventValue: ConfigFormUpdateEvent): void {
    this.loading$.next(true);
    this.selectionChange.emit(eventValue);
  }
}
