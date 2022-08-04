import { Injectable } from '@angular/core';
import { CartFacade } from '@spartacus/pickup-in-store/root';

@Injectable()
export class CartService implements CartFacade {
  getPickupOption(_productCode: string): void {}
}
