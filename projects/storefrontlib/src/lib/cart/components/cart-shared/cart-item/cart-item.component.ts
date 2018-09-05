import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() entry: any;
  @Input() isReadOnly = false;
  @Input() disableProductLink = false;
  @Input() potentialPromotions: any[];
  @Input() appliedPromotions: any[];

  @Input() parent: FormGroup;
  timeout: any;

  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  ngOnInit() {}

  removeEntry() {
    this.remove.emit(this.entry);
  }

  updateEntry(updatedQuantity: number) {
    this.update.emit({ entry: this.entry, updatedQuantity });
  }
}
