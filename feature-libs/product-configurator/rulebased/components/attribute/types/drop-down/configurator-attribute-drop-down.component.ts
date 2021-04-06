import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import {
  ConfiguratorAttributeQuantityComponentOptions,
  Quantity,
} from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  // TODO(#11681): make quantityService a required dependency
  /**
   * default constructor
   * @param {ConfiguratorAttributeQuantityService} quantityService
   */
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(quantityService: ConfiguratorAttributeQuantityService);

  /**
   * @deprecated since 3.3
   */
  constructor();

  constructor(
    protected quantityService?: ConfiguratorAttributeQuantityService
  ) {
    super();
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
  }

  get withQuantity() {
    return (
      this.quantityService?.withQuantity(
        this.attribute.dataType,
        this.attribute.uiType
      ) ?? false
    );
  }

  get disableQuantityActions() {
    return (
      this.quantityService?.disableQuantityActions(
        this.attribute.selectedSingleValue
      ) ?? true
    );
  }

  onSelect(): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: this.attributeDropDownForm.value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };
    this.selectionChange.emit(event);
  }

  onHandleQuantity(quantity): void {
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

  onChangeQuantity(eventObject): void {
    if (!eventObject.quantity) {
      this.attributeDropDownForm.setValue('');
      this.onSelect();
    } else {
      this.onHandleQuantity(eventObject.quantity);
    }
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {boolean} disableQuantityActions - Disable quantity actions
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    const initialQuantity: Quantity = {
      quantity:
        this.attributeDropDownForm.value !== '0'
          ? this.attribute.quantity ?? 0
          : 0,
    };

    return {
      allowZero: !this.attribute.required,
      initialQuantity: initialQuantity,
      disableQuantityActions: this.loading$.pipe(
        map((loading) => {
          return loading || this.disableQuantityActions;
        })
      ),
    };
  }
}
