import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractCartComponent } from '../abstract-cart-component';

@Component({
  selector: 'y-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent extends AbstractCartComponent
  implements OnInit {
  isLoading = false;
  @Input() iconOnly;

  @Input() productCode;
  @Input() quantity = 1;

  cartEntryQuantity;
  sub;

  ngOnInit() {
    // initiation of components in the list view...
    this.setup();
  }

  // ngOnDestroy() {
  //     if (this.sub) {
  //         console.log('unsubscribe...');
  //         this.sub.unsubscribe();
  //     }
  //  }

  fetchData() {
    this.setup();
    //super.fetchData();
  }

  private setup() {
    //if (this.contextParameters && this.contextParameters.productCode) {
    //  this.productCode = this.contextParameters.productCode;
    //}
    if (this.productCode) {
      console.log(this.productCode);
      // subscribe to changes for cart entries related to this product so that
      // we can update the cartEntryQuantity as well as control a loading UI
      this.cartModel.getEntry(this.productCode).subscribe(cartEntryData => {
        // TODO: since its going often too fast, we might want to simulate a delay here...
        this.isLoading = false;
        this.setCartEntryQuantity(cartEntryData);
      });
    }
  }

  public addToCart() {
    if (!this.productCode) {
      console.warn('no product code found on this component');
      return;
    }
    this.isLoading = true;
    this.cartLoader.addCartEntry(this.productCode, this.quantity);
  }

  private setCartEntryQuantity(entry) {
    let newQuantity;
    if (!entry) {
      newQuantity = 0;
    } else {
      if (entry && entry.product && entry.product.code === this.productCode) {
        newQuantity = entry.quantity;
      }
    }

    this.cartEntryQuantity = newQuantity;
    this.cd.markForCheck();
  }
}
