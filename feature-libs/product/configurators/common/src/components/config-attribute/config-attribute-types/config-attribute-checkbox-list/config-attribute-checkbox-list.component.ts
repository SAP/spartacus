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
import { ConfigUtilsService } from '../../../service/config-utils.service';
@Component({
  selector: 'cx-config-attribute-checkbox-list',
  templateUrl: './config-attribute-checkbox-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeCheckBoxListComponent implements OnInit {
  uiKeyGenerator = ConfigUIKeyGeneratorService;
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(protected configUtilsService: ConfigUtilsService) {}

  attributeCheckBoxForms = new Array<FormControl>();

  ngOnInit() {
    for (const value of this.attribute.values) {
      let attributeCheckBoxForm;
      if (value.selected === true) {
        attributeCheckBoxForm = new FormControl(true);
      } else {
        attributeCheckBoxForm = new FormControl(false);
      }
      this.attributeCheckBoxForms.push(attributeCheckBoxForm);
    }
  }

  /**
   * Triggered when a value is selected
   */
  onSelect(): void {
    const selectedValues = this.configUtilsService.assembleValuesForMultiSelectAttributes(
      this.attributeCheckBoxForms,
      this.attribute
    );

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
