import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorUiKeyGeneratorComponent } from '../base/configurator-ui-key-generator.component';

@Component({
  selector: 'cx-configurator-attribute-checkbox',
  templateUrl: './configurator-attribute-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeCheckBoxComponent
  extends ConfiguratorUiKeyGeneratorComponent
  implements OnInit {
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  attributeCheckBoxForm = new FormControl('');

  ngOnInit() {
    this.attributeCheckBoxForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Fired when a check box has been selected i.e. when a value has been set
   */
  onSelect(): void {
    const selectedValues = this.assembleSingleValue();

    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        values: selectedValues,
      },
    };
    this.selectionChange.emit(event);
  }

  protected assembleSingleValue(): Configurator.Value[] {
    const localAssembledValues: Configurator.Value[] = [];
    const value = this.attribute.values ? this.attribute.values[0] : undefined;
    //we can assume that for this component, value is always present
    if (value) {
      const localAttributeValue: Configurator.Value = {
        valueCode: value.valueCode,
      };

      localAttributeValue.name = value.name;
      localAttributeValue.selected = this.attributeCheckBoxForm.value;
      localAssembledValues.push(localAttributeValue);
    }

    return localAssembledValues;
  }
}
