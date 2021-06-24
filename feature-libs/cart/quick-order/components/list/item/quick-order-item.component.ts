import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuickOrderService } from '../../../core/services/quick-order.service';
import { OrderEntry } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-quick-order-item',
  templateUrl: './quick-order-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderItemComponent implements OnInit, OnDestroy {
  quantityControl: FormControl;

  @Input()
  entry: OrderEntry;

  @Input()
  index: number;

  private subscription = new Subscription();

  constructor(protected quickOrderService: QuickOrderService) {}

  ngOnInit(): void {
    this.quantityControl = new FormControl(this.entry.quantity);

    this.subscription.add(
      this.quantityControl.valueChanges.subscribe(() => {
        this.quickOrderService.updateEntryQuantity(
          this.index,
          this.quantityControl.value
        );
      })
    );
  }

  removeEntry(): void {
    this.quickOrderService.removeEntry(this.index);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
