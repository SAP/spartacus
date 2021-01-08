import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle',
  templateUrl:
    './configurator-attribute-single-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnDestroy, OnInit {
  quantity = new FormControl(1);
  loading$ = new BehaviorSubject<boolean>(false);
  private sub: Subscription;

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit(): void {
    console.log(this.attribute, 'radio bundle');

    this.quantity.setValue(
      this.attribute.selectedSingleValue ? this.attribute.quantity : 0
    );

    this.sub = this.quantity.valueChanges.subscribe((value) => {
      if (!value) {
        this.onDeselect();
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
      Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
    );
  }

  get readOnlyQuantity() {
    return (
      !this.attribute.selectedSingleValue ||
      this.attribute.selectedSingleValue === '0'
    );
  }

  onSelect(value: string): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity: this.quantity.value,
        selectedSingleValue: value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.selectionChange.emit(event);
  }

  onDeselect(): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity: 1,
        selectedSingleValue: '',
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
