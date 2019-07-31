import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { CartAdapter } from '../../../cart/connectors/cart/cart.adapter';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';
import { Cart } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  public loadAll(userId: string): Observable<Cart[]> {
    return this.http
      .get<Occ.CartList>(this.occEndpointsService.getUrl('carts', { userId }))
      .pipe(
        pluck('carts'),
        this.converterService.pipeableMany(CART_NORMALIZER)
      );
  }

  public load(userId: string, cartId: string): Observable<Cart> {
    if (cartId === 'current') {
      return this.loadAll(userId).pipe(
        map(carts => {
          if (carts) {
            const activeCart = carts.find(cart => {
              return cart['saveTime'] === undefined;
            });
            return activeCart;
          } else {
            return null;
          }
        })
      );
    } else {
      return this.http
        .get<Occ.Cart>(
          this.occEndpointsService.getUrl('cart', { userId, cartId })
        )
        .pipe(this.converterService.pipeable(CART_NORMALIZER));
    }
  }

  create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    const toAdd = JSON.stringify({});
    let params = {};

    if (oldCartId) {
      params = { oldCartId: oldCartId };
    }
    if (toMergeCartGuid) {
      params['toMergeCartGuid'] = toMergeCartGuid;
    }

    return this.http
      .post<Occ.Cart>(
        this.occEndpointsService.getUrl('createCart', { userId }, params),
        toAdd
      )
      .pipe(this.converterService.pipeable(CART_NORMALIZER));
  }
}
