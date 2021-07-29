import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-checkbox',
  templateUrl: './configurator-attribute-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeCheckBoxComponent
  extends ConfiguratorAttributeMultiSelectionBaseComponent
  implements OnInit {
  /**
   * @deprecated since 4.1: remove redundant input parameter
   */
  @Input() group: string;

  attributeCheckBoxForm = new FormControl('');

  ngOnInit() {
    this.attributeCheckBoxForm.setValue(this.attribute.selectedSingleValue);
  }

  assembleSingleValue(): Configurator.Value[] {
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
