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
  selector: 'cx-configurator-attribute-single-selection-bundle-dropdown',
  templateUrl:
    './configurator-attribute-single-selection-bundle-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');
  selectionValue: Configurator.Value;

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);

    this.selectionValue = this.attribute.values.find((value) => value.selected);

    console.log(this.selectionValue);
  }
  /**
   * Triggered when a value has been selected
   */
  onSelect(): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: this.attributeDropDownForm.value,
      },
    };
    this.selectionChange.emit(event);
  }

  handleDeselect(): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: '0',
      },
    };
    this.selectionChange.emit(event);
  }
}
