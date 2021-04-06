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
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import {
  ConfiguratorAttributeQuantityComponentOptions,
  Quantity,
} from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-checkbox-list',
  templateUrl: './configurator-attribute-checkbox-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeCheckBoxListComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeCheckBoxForms = new Array<FormControl>();
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  // TODO(#11681): make config a required dependency
  /**
   * default constructor
   * @param {ConfiguratorAttributeQuantityService} quantityService
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configUtilsService: ConfiguratorStorefrontUtilsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    quantityService: ConfiguratorAttributeQuantityService
  );

  /**
   * @deprecated since 3.3
   */
  constructor(configUtilsService: ConfiguratorStorefrontUtilsService);

  constructor(
    protected configUtilsService: ConfiguratorStorefrontUtilsService,
    protected quantityService?: ConfiguratorAttributeQuantityService
  ) {
    super();
  }

  ngOnInit() {
    const selectedValues = this.attribute.values.filter(
      (value) => value.selected
    );

    for (const value of this.attribute.values) {
      let attributeCheckBoxForm;

      if (value.selected === true) {
        attributeCheckBoxForm = new FormControl({
          value: true,
          disabled:
            this.attribute.required && selectedValues.length < 2 ? true : false,
        });
      } else {
        attributeCheckBoxForm = new FormControl(false);
      }
      this.attributeCheckBoxForms.push(attributeCheckBoxForm);
    }
  }

  get withQuantityOnAttributeLevel(): boolean {
    return (
      this.attribute.dataType ===
      Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
    );
  }
  get withQuantity(): boolean {
    return (
      this.quantityService?.withQuantity(
        this.attribute.dataType,
        this.attribute.uiType
      ) ?? false
    );
  }

  get disableQuantityActions(): boolean {
    return (
      !this.quantityService ||
      (this.attribute.dataType ===
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL &&
        (!this.attribute.values.find((value) => value.selected) ||
          this.attribute.quantity === 0))
    );
  }

  get allowZeroValueQuantity(): boolean {
    const selectedValues = this.attribute.values.filter(
      (value) => value.selected
    );

    if (this.attribute.required) {
      return selectedValues.length > 1;
    }

    return true;
  }

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

  onHandleAttributeQuantity(quantity): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
    };

    this.selectionChange.emit(event);
  }

  onChangeValueQuantity(eventObject, valueCode, formIndex): void {
    if (eventObject.quantity === 0) {
      this.attributeCheckBoxForms[formIndex].setValue(false);
      this.onSelect();
      return;
    }

    const value: Configurator.Value = this.configUtilsService
      .assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      )
      .find((item) => item.valueCode === valueCode);

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

  onChangeQuantity(eventObject): void {
    if (!eventObject.quantity) {
      this.attributeCheckBoxForms.forEach((_, index) =>
        this.attributeCheckBoxForms[index].setValue(false)
      );
      this.onSelect();
    } else {
      this.onHandleAttributeQuantity(eventObject.quantity);
    }
  }

  /**
   * Extract corresponding quantity parameters
   *
   * @param {boolean} allowZero - Allow zero
   * @param {number} initialQuantity - Initial quantity
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    allowZero: boolean,
    initialQuantity: number
  ): ConfiguratorAttributeQuantityComponentOptions {
    const initQuantity: Quantity = {
      quantity: initialQuantity,
    };

    return {
      allowZero: allowZero,
      initialQuantity: initQuantity,
      disableQuantityActions: this.loading$.pipe(
        map((loading) => {
          return loading || this.disableQuantityActions;
        })
      ),
    };
  }
}
