import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

interface Quantity {
  quantity: number;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  templateUrl: './configurator-attribute-quantity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeQuantityComponent
  implements OnDestroy, OnInit {
  loading$ = new BehaviorSubject<boolean>(false);
  quantity = new FormControl(1);
  protected sub: Subscription;

  @Input() initialQuantity: Quantity;
  @Input() readonly = false;
  @Output() changeQuantity = new EventEmitter<Quantity>();

  ngOnInit() {
    this.quantity.setValue(this.initialQuantity);

    this.sub = this.quantity.valueChanges.subscribe(() =>
      this.onChangeQuantity()
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChangeQuantity(): void {
    this.loading$.next(true);

    this.changeQuantity.emit({
      quantity: this.quantity.value,
    });
  }
}
