import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { CartAdapter } from '../../../cart/connectors/cart/cart.adapter';
import { CART_NORMALIZER } from '../../../cart/connectors/cart/converters';
import { Cart } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

// TODO 2.0: Remove
const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue),updateable),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue),pickupItemsQuantity,net,' +
  'appliedVouchers,productDiscounts(formattedValue)';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  protected getCartEndpoint(_userId: string): string {
    return;
  }

  public loadAll(userId: string): Observable<Cart[]> {
    // TODO 2.0: Remove legacyUrl and all uses
    const legacyUrl = this.getCartEndpoint(userId);

    // TODO 2.0: Remove
    if (legacyUrl) {
      return this.legacyLoadAll(legacyUrl);
    }

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
      // TODO 2.0: Remove legacyUrl and all uses
      const legacyUrl = this.getCartEndpoint(userId);

      // TODO 2.0: Remove
      if (legacyUrl) {
        return this.legacyLoad(legacyUrl, cartId);
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

    // TODO 2.0: Remove legacyUrl and all uses
    const legacyUrl = this.getCartEndpoint(userId);

    // TODO 2.0: Remove
    if (legacyUrl) {
      return this.legacyCreate(legacyUrl, toAdd, oldCartId, toMergeCartGuid);
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

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  private legacyLoadAll(legacyUrl: string): Observable<Cart[]> {
    const params = new HttpParams({
      fromString: `fields=carts(${DETAILS_PARAMS},saveTime)`,
    });

    return this.http.get<Occ.CartList>(legacyUrl, { params }).pipe(
      pluck('carts'),
      this.converterService.pipeableMany(CART_NORMALIZER)
    );
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  private legacyLoad(legacyUrl: string, cartId: string): Observable<Cart> {
    const url = legacyUrl + cartId;
    const params = new HttpParams({
      fromString: `fields=${DETAILS_PARAMS}`,
    });

    return this.http
      .get<Occ.Cart>(url, { params })
      .pipe(this.converterService.pipeable(CART_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints. Will be removed as of 2.0.
   */
  private legacyCreate(
    url: string,
    toAdd: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
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
}
