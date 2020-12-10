import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle',
  templateUrl:
    './configurator-attribute-single-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  quantity = new FormControl(1);
  priceSelected: number;

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit(): void {
    if (this.attribute.required) {
      if (!this.attribute.selectedSingleValue) {
        this.onSelect(this.attribute.values[0].valueCode);
      }
    }

    this.priceSelected =
      this.attribute.values.find((value) => value.selected)?.price || 0;
  }

  onSelect(value: string): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        quantity: this.quantity.value,
        selectedSingleValue: value,
      },
    };

    this.selectionChange.emit(event);
  }

  onDeselect() {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        quantity: 1,
        selectedSingleValue: '',
      },
    };

    this.selectionChange.emit(event);
  }
}
