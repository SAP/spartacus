import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  AuthService,
  Cart,
  CartService,
  OccEndpointsService,
  Order,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-applied-coupons',
  templateUrl: './applied-coupons.component.html',
})
export class AppliedCouponsComponent implements OnInit {
  userId: string;

  @Input()
  readonly = false;
  @Input()
  cart: Cart | Order;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private occEndpoints: OccEndpointsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService
      .getUserToken()
      .pipe(map(token => token.userId))
      .subscribe(userId => {
        this.userId = userId;
      });
  }

  getVouchers(userId: string, cartId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.getEndpoint(userId, cartId), { headers });
  }

  removeVoucher(voucherId: string) {
    this.http
      .delete(this.getEndpoint(this.userId, this.cart.code, voucherId))
      .subscribe(() => this.cartService.loadDetails());
  }

  getEndpoint(userId: string, cartId: string, voucherId?: string): string {
    const endpoint = voucherId
      ? `/users/${userId}/carts/${cartId}/vouchers/${voucherId}`
      : `/users/${userId}/carts/${cartId}/vouchers`;
    return this.occEndpoints.getEndpoint(endpoint);
  }
}
