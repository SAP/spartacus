import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartCouponAnchorService {
  eventEmit: EventEmitter<string>;

  constructor() {
    this.eventEmit = new EventEmitter<string>();
  }
}
