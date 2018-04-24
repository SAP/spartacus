import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() entry: any;
  @Input() potentialPromotions: any[];
  @Input() appliedPromotions: any[];
  @Input() parent: FormGroup;
  @Input() formGroupName: string;

  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  removeEntry() {
    this.remove.emit({ entry: this.entry, index: this.formGroupName });
  }

  updateEntry() {
    this.update.emit(+this.formGroupName);
  }
}
