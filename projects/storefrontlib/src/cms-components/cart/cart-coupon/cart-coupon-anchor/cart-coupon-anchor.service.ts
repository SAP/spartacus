import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartCouponAnchorService {
  private eventEmit: EventEmitter<string>;

  constructor() {
    this.eventEmit = new EventEmitter<string>();
  }

  public getEventEmit(): EventEmitter<string> {
    return this.eventEmit;
  }
}
