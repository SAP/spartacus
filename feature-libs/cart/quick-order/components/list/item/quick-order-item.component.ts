import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-quick-order-item',
  templateUrl: './quick-order-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderItemComponent implements OnInit, OnDestroy {
  quantityControl: FormControl;

  // Type will be set up later
  @Input()
  entry: any;

  private subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.quantityControl = new FormControl(this.entry.quantity);

    this.subscription.add(
      this.quantityControl.valueChanges.subscribe(() => {
        // TODO
      })
    );
  }

  removeEntry(): void {
    // TODO
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
