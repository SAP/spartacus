import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartEntryAdapter } from '../../../../../../../../projects/core/src/cart/connectors/entry/cart-entry.adapter';
import { CART_MODIFICATION_NORMALIZER } from '../../../../../../../../projects/core/src/cart/connectors/entry/converters';
import { CartModification } from '../../../../../../../../projects/core/src/model/cart.model';
import { ConverterService } from '../../../../../../../../projects/core/src/util/converter.service';
import { OccEndpointsService } from '../../../../../../../../projects/core/src/occ/services/occ-endpoints.service';

@Injectable()
export class OccCartEntryAdapter implements CartEntryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

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

    const url = this.occEndpointsService.getUrl('removeEntries', {
      userId,
      cartId,
      entryNumber,
    });

    return this.http.delete(url, { headers });
  }
}
