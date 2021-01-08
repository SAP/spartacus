import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnDestroy, OnInit {
  attributeDropDownForm = new FormControl('');
  loading$ = new BehaviorSubject<boolean>(false);
  quantity = new FormControl(1);

  private sub: Subscription;

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    console.log(this.attribute, 'dropdown');

    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);

    this.quantity.setValue(
      this.attributeDropDownForm.value !== '0' ? this.attribute.quantity : 0
    );

    this.sub = this.quantity.valueChanges.subscribe((value) => {
      if (!value) {
        this.attributeDropDownForm.setValue('');
        this.onSelect();
      } else {
        this.onHandleQuantity();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get withQuantity() {
    return (
      this.attribute.dataType ===
      Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL
    );
  }

  /**
   * Triggered when a value has been selected
   */
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

  onHandleQuantity(): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity: this.quantity.value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
    };

    this.selectionChange.emit(event);
  }
}
