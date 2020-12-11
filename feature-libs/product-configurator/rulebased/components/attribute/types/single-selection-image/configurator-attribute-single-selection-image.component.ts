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
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-single-selection-image',
  templateUrl: './configurator-attribute-single-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionImageComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeRadioButtonForm = new FormControl('');

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Submits a value.
   *
   * @param {string} value - Selected value
   */
  onClick(value: string): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        selectedSingleValue: value,
        uiType: this.attribute.uiType,
        groupId: this.attribute.groupId,
      },
    };
    this.selectionChange.emit(event);
  }
}
