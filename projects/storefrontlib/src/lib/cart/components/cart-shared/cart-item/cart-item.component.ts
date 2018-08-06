import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() entry: any;
  @Input() potentialPromotions: any[];
  @Input() appliedPromotions: any[];
  parent: FormGroup;

  timeout: any;

  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.parent = this.controlContainer.control as FormGroup;
  }
  removeEntry() {
    this.remove.emit(this.entry);
  }

  updateEntry(updatedQuantity: number) {
    this.update.emit({ entry: this.entry, updatedQuantity });
  }
}
