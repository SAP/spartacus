import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
@Component({
  selector: 'cx-configurator-attribute-checkbox-list',
  templateUrl: './configurator-attribute-checkbox-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeCheckBoxListComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(
    protected configUtilsService: ConfiguratorStorefrontUtilsService
  ) {
    super();
  }

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
      changedAttribute: {
        ...this.attribute,
        values: selectedValues,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.selectionChange.emit(event);
  }

  onChangeQuantity(eventObject): void {
    const value: Configurator.Value = this.configUtilsService
      .assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      )
      .find((item) => item.valueCode === eventObject.valueCode);

    if (!value) {
      if (isDevMode()) {
        console.warn('no value for event:', eventObject);
      }

      return;
    }

    value.quantity = eventObject.quantity;

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: [value],
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.VALUE_QUANTITY,
    };

    this.selectionChange.emit(event);
  }
}
