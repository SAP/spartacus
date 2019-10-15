import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum COUPON_COMPONENT_EVENT {
  ScrollIn = 'SCROLLIN',
}

@Injectable({
  providedIn: 'root',
})
export class CartCouponComponentService {
  readonly events: Observable<COUPON_COMPONENT_EVENT> = new EventEmitter<
    COUPON_COMPONENT_EVENT
  >();

  scrollIn() {
    (this.events as EventEmitter<COUPON_COMPONENT_EVENT>).emit(
      COUPON_COMPONENT_EVENT.ScrollIn
    );
  }
}
