import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Configurator } from '../../../../../core/model/configurator.model';
import { FormControl } from '@angular/forms';
import { QuantityUpdateEvent } from '../../../../form/configurator-form.event';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'cx-configurator-attribute-checkbox-quantity',
  templateUrl: './configurator-attribute-checkbox-quantity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeCheckBoxQuantityComponent
  implements OnDestroy, OnInit {
  loading$ = new BehaviorSubject<boolean>(false);
  quantity = new FormControl(1);
  private sub: Subscription;

  @Input() value: Configurator.Value;
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();

  ngOnInit() {
    this.quantity.setValue(this.value.quantity);

    this.sub = this.quantity.valueChanges.subscribe(() =>
      this.onHandleQuantity()
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onHandleQuantity(): void {
    this.loading$.next(true);

    this.handleQuantity.emit({
      quantity: this.quantity.value,
      valueCode: this.value.valueCode,
    });
  }
}
