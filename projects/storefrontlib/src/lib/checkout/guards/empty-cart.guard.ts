import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CartDataService } from '@spartacus/core';

@Injectable()
export class EmptyCartGuard implements CanActivate {
  constructor(private cartDataService: CartDataService) {}

  canActivate(): boolean {
    return this.cartDataService.hasCart;
  }
}
