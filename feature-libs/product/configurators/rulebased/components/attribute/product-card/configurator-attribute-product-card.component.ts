import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
})
export class ConfiguratorAttributeProductCardComponent {
  @Input() product: Configurator.Value;
  @Input() multiple: boolean = false;
  @Output() handleSelect = new EventEmitter();
  @Output() handleDeselect = new EventEmitter();

  onHandleSelect(value: string): void {
    this.handleSelect.emit(value);
  }

  onHandleDeselect(value: string): void {
    this.handleDeselect.emit(value);
  }
}
