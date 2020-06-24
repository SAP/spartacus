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
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-checkbox',
  templateUrl: './config-attribute-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeCheckBoxComponent implements OnInit {
  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  attributeCheckBoxForms = new FormControl('');

  ngOnInit() {
    this.attributeCheckBoxForms.setValue(this.attribute.selectedSingleValue);
  }

  assembleValues(): any[] {
    const localAssembledValues: any = [];

    const localAttributeValue: Configurator.Value = {};
    localAttributeValue.valueCode = this.attribute.values[0].valueCode;
    localAttributeValue.name = this.attribute.values[0].name;
    localAttributeValue.selected = this.attributeCheckBoxForms.value;
    localAssembledValues.push(localAttributeValue);
    return localAssembledValues;
  }

  onSelect() {
    const selectedValues = this.assembleValues();

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
}
