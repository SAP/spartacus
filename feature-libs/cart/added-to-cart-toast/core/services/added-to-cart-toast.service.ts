import { Injectable } from '@angular/core';
import { Product, ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartToastItem } from '../models/added-to-cart-toast.model';

@Injectable({ providedIn: 'root' })
export class AddedToCartToastService {
  cartToastItems: CartToastItem[] = [];

  constructor(protected productService: ProductService) {}

  getToasts(): Observable<CartToastItem[]> {
    return of(this.cartToastItems);
  }

  addToast(quantityAdded: number, product: Product, containerClass: string) {
    const newCartToastItem: CartToastItem = {
      productName: product.name,
      quantity: quantityAdded,
      baseClass: containerClass,
      unitPrice: product.price?.formattedValue,
      images: product.images,
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
