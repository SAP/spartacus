import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { CartAdapter } from '../../../cart/connectors/cart/cart.adapter';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';
import { Cart } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../utils/interceptor-util';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_CART_ID_CURRENT,
} from '../../utils/occ-constants';

// TODO: Deprecated, remove Issue: #4125. Use configurable endpoints.
const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue),updateable),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue),pickupItemsQuantity,net,' +
  'appliedVouchers,productDiscounts(formattedValue),user';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService,
    protected featureConfigService?: FeatureConfigService
  ) {}

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = `users/${userId}/carts/`;
    return this.occEndpointsService.getEndpoint(cartEndpoint);
  }

  public loadAll(userId: string): Observable<Cart[]> {
    // TODO: Deprecated, remove Issue: #4125.
    if (!this.featureConfigService.isLevel('1.1')) {
      return this.legacyLoadAll(userId);
    }

    return this.http
      .get<Occ.CartList>(this.occEndpointsService.getUrl('carts', { userId }))
      .pipe(
        pluck('carts'),
        this.converterService.pipeableMany(CART_NORMALIZER)
      );
  }

  public load(userId: string, cartId: string): Observable<Cart> {
    if (cartId === OCC_CART_ID_CURRENT) {
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
      // TODO: Deprecated, remove Issue: #4125.
      if (!this.featureConfigService.isLevel('1.1')) {
        return this.legacyLoad(userId, cartId);
      }
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
    // TODO: Deprecated, remove Issue: #4125.
    if (!this.featureConfigService.isLevel('1.1')) {
      return this.legacyCreate(userId, toAdd, oldCartId, toMergeCartGuid);
    }

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

  delete(userId: string, cartId: string): Observable<{}> {
    let headers = new HttpHeaders();
    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }
    return this.http.delete<{}>(
      this.occEndpointsService.getUrl('deleteCart', { userId, cartId }),
      { headers }
    );
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyLoadAll(userId: string): Observable<Cart[]> {
    const url = this.getCartEndpoint(userId);
    const params = new HttpParams({
      fromString: `fields=carts(${DETAILS_PARAMS},saveTime)`,
    });

    return this.http.get<Occ.CartList>(url, { params }).pipe(
      pluck('carts'),
      this.converterService.pipeableMany(CART_NORMALIZER)
    );
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyLoad(userId: string, cartId: string): Observable<Cart> {
    const url = this.getCartEndpoint(userId) + cartId;
    const params = new HttpParams({
      fromString: `fields=${DETAILS_PARAMS}`,
    });

    return this.http
      .get<Occ.Cart>(url, { params })
      .pipe(this.converterService.pipeable(CART_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyCreate(
    userId: string,
    toAdd: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    const url = this.getCartEndpoint(userId);
    let queryString = `fields=${DETAILS_PARAMS}`;

    if (oldCartId) {
      queryString = `${queryString}&oldCartId=${oldCartId}`;
    }
    if (toMergeCartGuid) {
      queryString = `${queryString}&toMergeCartGuid=${toMergeCartGuid}`;
    }

    const params = new HttpParams({
      fromString: queryString,
    });

    return this.http
      .post<Occ.Cart>(url, toAdd, { params })
      .pipe(this.converterService.pipeable(CART_NORMALIZER));
  }

  addEmail(userId: string, cartId: string, email: string): Observable<{}> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    const httpParams: HttpParams = new HttpParams().set('email', email);

    const url = this.occEndpointsService.getUrl('addEmail', {
      userId,
      cartId,
    });

    return this.http.put(url, httpParams, { headers });
  }
}
