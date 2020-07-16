import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-checkbox',
  templateUrl: './config-attribute-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeCheckBoxComponent implements OnInit {
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}

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
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        values: selectedValues,
        uiType: this.attribute.uiType,
      },
      groupId: this.group,
    };
    this.selectionChange.emit(event);
  }

  protected assembleSingleValue(): any[] {
    const localAssembledValues: any = [];

    const localAttributeValue: Configurator.Value = {};
    localAttributeValue.valueCode = this.attribute.values[0].valueCode;
    localAttributeValue.name = this.attribute.values[0].name;
    localAttributeValue.selected = this.attributeCheckBoxForm.value;
    localAssembledValues.push(localAttributeValue);
    return localAssembledValues;
  }
}
