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
  selector: 'cx-config-attribute-input-field',
  templateUrl: './config-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeInputFieldComponent implements OnInit {
  attributeInputForm = new FormControl('');

  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}

  @Input() attribute: Configurator.Attribute;
  @Input() group: String;

  @Output() inputChange = new EventEmitter();

  ngOnInit() {
    this.attributeInputForm.setValue(this.attribute.userInput);
  }

  onChange() {
    const event = {
      changedAttribute: {
        name: this.attribute.name,
        userInput: this.attributeInputForm.value,
        uiType: this.attribute.uiType,
      },
      group: this.group,
    };

    this.inputChange.emit(event);
  }
}
