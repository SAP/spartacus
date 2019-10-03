import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartEntryAdapter } from '../../../cart/connectors/entry/cart-entry.adapter';
import { CART_MODIFICATION_NORMALIZER } from '../../../cart/connectors/entry/converters';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';
import { CartModification } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCartEntryAdapter implements CartEntryAdapter {
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
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpointsService.getEndpoint(cartEndpoint);
  }

  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({});

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // TODO: Deprecated, remove Issue: #4125
    if (!this.featureConfigService.isLevel('1.1')) {
      return this.legacyAdd(userId, cartId, productCode, quantity);
    }

    const url = this.occEndpointsService.getUrl(
      'addEntries',
      {
        userId,
        cartId,
      },
      { code: productCode, qty: quantity }
    );

    return this.http
      .post<CartModification>(url, toAdd, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    let params = {};
    if (pickupStore) {
      params = { pickupStore };
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // TODO: Deprecated, remove Issue: #4125
    if (!this.featureConfigService.isLevel('1.1')) {
      return this.legacyUpdate(userId, cartId, entryNumber, qty, pickupStore);
    }

    const url = this.occEndpointsService.getUrl(
      'updateEntries',
      { userId, cartId, entryNumber },
      { qty, ...params }
    );

    return this.http
      .patch<CartModification>(url, {}, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // TODO: Deprecated, remove Issue: #4125
    if (!this.featureConfigService.isLevel('1.1')) {
      return this.legacyRemove(userId, cartId, entryNumber);
    }

    const url = this.occEndpointsService.getUrl('removeEntries', {
      userId,
      cartId,
      entryNumber,
    });

    return this.http.delete(url, { headers });
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyAdd(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const url = this.getCartEndpoint(userId) + cartId + '/entries';

    const params = new HttpParams({
      fromString: 'code=' + productCode + '&qty=' + quantity,
    });

    const toAdd = JSON.stringify({});
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers, params })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyUpdate(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    const url =
      this.getCartEndpoint(userId) + cartId + '/entries/' + entryNumber;
    let queryString = 'qty=' + qty;

    if (pickupStore) {
      queryString = queryString + '&pickupStore=' + pickupStore;
    }
    const params = new HttpParams({
      fromString: queryString,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .patch<CartModification>(url, {}, { headers, params })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  /**
   * @deprecated Since 1.1
   * Use configurable endpoints.
   * Remove issue: #4125
   */
  private legacyRemove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const url =
      this.getCartEndpoint(userId) + cartId + '/entries/' + entryNumber;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.delete(url, { headers });
  }
}
