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
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './config-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeRadioButtonComponent implements OnInit {
  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}

  attributeRadioButtonForm = new FormControl('');

  @Input() attribute: Configurator.Attribute;

  @Output() selectionChange = new EventEmitter();

  ngOnInit() {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  onSelect() {
    const attribute: Configurator.Attribute = {
      name: this.attribute.name,
      selectedSingleValue: this.attributeRadioButtonForm.value,
      uiType: this.attribute.uiType,
    };

    this.selectionChange.emit(attribute);
  }
}
