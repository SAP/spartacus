import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartToastItem, OrderEntry } from '../../root';

@Injectable({ providedIn: 'root' })
export class AddedToCartToastComponentService {
  cartToastItems: CartToastItem[] = [];

  constructor() {}

  getToasts(): Observable<CartToastItem[]> {
    return of(this.cartToastItems);
  }

  addToast(
    quantityAdded: number,
    orderEntry: OrderEntry,
    containerClass: string
  ) {
    const { basePrice, product } = orderEntry;
    const newCartToastItem: CartToastItem = {
      productName: product?.name,
      quantity: quantityAdded,
      baseClass: containerClass,
      unitPrice: basePrice?.formattedValue,
      images: product?.images,
    };
    const index = this.cartToastItems.push(newCartToastItem) - 1;
    setTimeout(() => {
      this.removePrevious();
    }, 500);
    return this.cartToastItems[index];
  }

  removeToast() {
    this.cartToastItems.pop();
  }

  clearTimeouts() {
    for (let i = 0; i < this.cartToastItems.length - 1; i++) {
      clearTimeout(this.cartToastItems[i].timeoutRef);
    }
  }

  removePrevious() {
    this.clearTimeouts();
    this.cartToastItems.splice(0, this.cartToastItems.length - 1);
  }

  setPosition(className: string) {
    const length = this.cartToastItems.length;
    if (length) this.cartToastItems[length - 1].baseClass = className;
  }
}
