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
  @Input() formGroupName: string;

  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.parent = this.controlContainer.control as FormGroup;
    console.log(this.parent);
  }
  removeEntry() {
    this.remove.emit({ entry: this.entry, index: this.formGroupName });
  }

  updateEntry() {
    this.update.emit({ entry: this.entry, index: +this.formGroupName });
  }
}
