import { Injectable } from '@angular/core';
import { SaveForLaterAdapter } from '../connectors/cart/save-for-later.adapter';
import { Observable, throwError } from 'rxjs';
import { Occ } from '../../occ/occ-models/occ.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { ConverterService } from '../../util/converter.service';
import { CART_NORMALIZER } from '../connectors/cart/converters';
import { Cart } from '../../model/cart.model';

const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue)),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue),pickupItemsQuantity,net,' +
  'appliedVouchers,productDiscounts(formattedValue)';

@Injectable()
export class OccSaveForLaterAdapter implements SaveForLaterAdapter {
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = `users/${userId}/carts/`;
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }

  public load(userId: string, cartId: string): Observable<Cart> {
    const url = this.getCartEndpoint(userId) + cartId;
    const params = new HttpParams({
      fromString: `fields=${DETAILS_PARAMS}`,
    });
    return this.http.get<Occ.Cart>(url, { params: params }).pipe(
      catchError((error: any) => throwError(error)),
      this.converter.pipeable(CART_NORMALIZER)
    );
  }

  public create(userId: string, cartId?: string): Observable<Cart> {
    const url = this.getCartEndpoint(userId) + cartId + `/savedcart`;
    return this.http.get<Occ.Cart>(url).pipe(
      this.converter.pipeable(CART_NORMALIZER),
      catchError((error: any) => throwError(error.json()))
    );
  }
}
