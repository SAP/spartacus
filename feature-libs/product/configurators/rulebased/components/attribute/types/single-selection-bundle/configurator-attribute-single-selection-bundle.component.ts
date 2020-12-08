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
  selector: 'cx-configurator-attribute-single-selection-bundle',
  templateUrl:
    './configurator-attribute-single-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeSingleSelectionBundleForm = new FormControl('');

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  quantity = new FormControl(0);

  ngOnInit(): void {
    this.quantity.setValue(this.attribute.quantity);

    this.attributeSingleSelectionBundleForm.setValue(
      this.attribute.selectedSingleValue
    );
  }

  /**
   * Submits a value.
   *
   * @param {string} value - Selected value
   */
  onSelect(value: string): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        name: this.attribute.name,
        selectedSingleValue: value,
        uiType: this.attribute.uiType,
        groupId: this.attribute.groupId,
      },
    };

    console.log(event);
    this.selectionChange.emit(event);
  }
}
