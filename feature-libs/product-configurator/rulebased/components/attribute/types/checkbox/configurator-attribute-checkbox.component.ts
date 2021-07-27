import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import { ConfiguratorUiKeyGeneratorService } from '../base/configurator-ui-key-generator.service';

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

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected uiKeyGeneratorService: ConfiguratorUiKeyGeneratorService
  ) {
    super(quantityService, uiKeyGeneratorService);
  }

  ngOnInit() {
    this.attributeCheckBoxForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Fired when a check box has been selected i.e. when a value has been set
   */
  onSelect(): void {
    super.onSelect(this.assembleSingleValue());
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
