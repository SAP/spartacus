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
import { BehaviorSubject } from 'rxjs';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';

interface SelectionValue {
  name: string;
  quantity: number;
  selected: boolean;
  valueCode: string;
}

@Component({
  selector: 'cx-configurator-attribute-multi-selection-bundle',
  templateUrl: './configurator-attribute-multi-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeMultiSelectionBundleComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  disableDeselectAction$ = new BehaviorSubject<boolean>(false);
  multipleSelectionValues: SelectionValue[] = [];

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(private quantityService: ConfiguratorAttributeQuantityService) {
    super();
  }

  ngOnInit() {
    this.multipleSelectionValues = this.attribute.values.map(
      ({ name, quantity, selected, valueCode }) => ({
        name,
        quantity,
        selected,
        valueCode,
      })
    );

    if (
      this.attribute.required &&
      this.multipleSelectionValues.filter((value) => value.selected).length < 2
    ) {
      this.disableDeselectAction$.next(true);
    }
  }

  get withQuantity() {
    return this.quantityService.withQuantity(
      this.attribute.dataType,
      this.attribute.uiType
    );
  }

  protected updateMultipleSelectionValues(valueCode, state) {
    const index = this.multipleSelectionValues.findIndex(
      (value) => value.valueCode === valueCode
    );

    this.multipleSelectionValues[index] = {
      ...this.multipleSelectionValues[index],
      selected: state,
    };

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: this.multipleSelectionValues,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    return event;
  }

  protected updateMultipleSelectionValuesQuantity(eventValue) {
    const value: Configurator.Value = this.multipleSelectionValues.find(
      (selectionValue) => selectionValue?.valueCode === eventValue.valueCode
    );

    if (!value) return;

    value.quantity = eventValue.quantity;

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: [value],
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.VALUE_QUANTITY,
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

  onChangeQuantity(eventValue): void {
    this.selectionChange.emit(
      this.updateMultipleSelectionValuesQuantity(eventValue)
    );
  }
}
