import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartAdapter } from '../../core/connectors/saved-cart.adapter';

@Injectable()
export class OccSavedCartAdapter implements SavedCartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  create(
    userId: string,
    cartId: string,
    cartDescription: string,
    cartName: string
  ): Observable<any> {
    return this.http.patch(
      this.getSavedCartEndpoint(userId, cartId, cartDescription, cartName),
      {}
    );
  }

  protected getSavedCartEndpoint(
    userId: string,
    cartId: string,
    cartDescription: string,
    cartName: string
  ): string {
    return this.occEndpoints.getUrl('saveCart', {
      userId,
      cartId,
      saveCartName: cartName,
      saveCartDescription: cartDescription,
    });
  }
}
