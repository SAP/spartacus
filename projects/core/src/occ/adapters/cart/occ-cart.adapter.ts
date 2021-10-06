import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { CartAdapter } from '../../../cart/connectors/cart/cart.adapter';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';
import { Cart } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../utils/interceptor-util';
import {
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
} from '../../utils/occ-constants';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  public loadAll(userId: string): Observable<Cart[]> {
    return this.http
      .get<Occ.CartList>(
        this.occEndpointsService.buildUrl('carts', { urlParams: { userId } })
      )
      .pipe(
        pluck('carts'),
        this.converterService.pipeableMany(CART_NORMALIZER)
      );
  }

  public load(userId: string, cartId: string): Observable<Cart> {
    if (cartId === OCC_CART_ID_CURRENT) {
      return this.loadAll(userId).pipe(
        map((carts) => {
          if (carts) {
            const activeCart = carts.find((cart) => {
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
          this.occEndpointsService.buildUrl('cart', {
            urlParams: { userId, cartId },
          })
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
        this.occEndpointsService.buildUrl('createCart', {
          urlParams: { userId },
          queryParams: params,
        }),
        toAdd
      )
      .pipe(this.converterService.pipeable(CART_NORMALIZER));
  }

  delete(userId: string, cartId: string): Observable<{}> {
    let headers = new HttpHeaders();
    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }
    return this.http.delete<{}>(
      this.occEndpointsService.buildUrl('deleteCart', {
        urlParams: { userId, cartId },
      }),
      { headers }
    );
  }

  addEmail(userId: string, cartId: string, email: string): Observable<{}> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    const httpParams: HttpParams = new HttpParams().set('email', email);

    const url = this.occEndpointsService.buildUrl('addEmail', {
      urlParams: {
        userId,
        cartId,
      },
    });

    return this.http.put(url, httpParams, { headers });
  }
}
