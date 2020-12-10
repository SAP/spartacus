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

@Component({
  selector: 'cx-configurator-attribute-multi-selection-bundle',
  templateUrl: './configurator-attribute-multi-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeMultiSelectionBundleComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  multipleSelectionValues = [];

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.multipleSelectionValues = this.attribute.values.map(
      ({ name, selected, valueCode }) => ({
        name,
        selected,
        valueCode,
      })
    );
  }

  protected updateMultipleSelectionValues(valueCode, state) {
    const multipleSelectionValuesIndex = this.multipleSelectionValues.findIndex(
      (value) => value.valueCode === valueCode
    );

    this.multipleSelectionValues[multipleSelectionValuesIndex] = {
      ...this.multipleSelectionValues[multipleSelectionValuesIndex],
      selected: state,
    };

    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        values: this.multipleSelectionValues,
      },
    };

    return event;
  }

  onSelect(eventValue): void {
    this.selectionChange.emit(
      this.updateMultipleSelectionValues(eventValue, true)
    );
  }

  onDeselect(eventValue): void {
    this.selectionChange.emit(
      this.updateMultipleSelectionValues(eventValue, false)
    );
  }
}
