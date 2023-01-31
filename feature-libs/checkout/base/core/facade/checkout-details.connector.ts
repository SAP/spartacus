import { Injectable } from '@angular/core';
import { AuthStorageService, ConverterService } from '@spartacus/core';
import { QueryClient } from '@tanstack/query-core';
import { from } from 'rxjs';
import { CHECKOUT_NORMALIZER } from '../connectors';

// let token: AuthToken | undefined;

@Injectable({
  providedIn: 'root',
})
export class CheckoutDetailsConnector {
  token: string;
  constructor(
    protected converter: ConverterService,
    protected authStorageService: AuthStorageService
  ) {
    this.token = this.authStorageService.getItem('access_token');
  }

  getCheckoutDetails(userId: string, cartId: string) {
    return from(
      CheckoutQueryApi.getCheckoutDetails(userId, cartId, this.token)
    ).pipe(this.converter.pipeable(CHECKOUT_NORMALIZER));
  }
}

const client = new QueryClient();
client.mount();

class CheckoutQueryApi {
  static getCheckoutDetails = (userId: string, cartId: string, token: string) =>
    client.fetchQuery({
      queryKey: ['checkout', userId, cartId],
      queryFn: () =>
        fetch(
          `https://40.76.109.9:9002/occ/v2/electronics-spa/users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)`,
          {
            method: 'GET',
            headers: new Headers({
              Authorization: `bearer ${token}`,
            }),
          }
        ).then((res) => res.json()),
    });
}
