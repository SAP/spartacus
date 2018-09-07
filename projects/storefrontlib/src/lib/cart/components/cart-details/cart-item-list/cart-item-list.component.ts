import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../../cart-shared/cart-item/cart-item.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'y-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.scss']
})
export class CartItemListComponent implements OnInit {
  @Input() isReadOnly = false;

  @Input() hasHeader = true;

  @Input() items: Item[] = [];

  form: FormGroup = this.fb.group({});

  constructor(protected cartService: CartService, protected fb: FormBuilder) {}

  ngOnInit() {
    this.items.forEach(item => {
      const { code } = item.product;
      if (!this.form.controls[code]) {
        this.form.setControl(code, this.createEntryFormGroup(item));
      } else {
        const entryForm = this.form.controls[code] as FormGroup;
        entryForm.controls.quantity.setValue(item.quantity);
      }
    });
  }

  removeEntry(item) {
    this.cartService.removeCartEntry(item);
    delete this.form.controls[item.product.code];
  }

  updateEntry({ item, updatedQuantity }) {
    this.cartService.updateCartEntry(item.entryNumber, updatedQuantity);
  }

  private createEntryFormGroup(entry) {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity
    });
  }
}
