import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Cart,
  ConverterService,
  EntitiesModel,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { SAVED_CARTS_NORMALIZER } from '../../core/connectors/converters';
import { SavedCartAdapter } from '../../core/connectors/saved-cart.adapter';

@Injectable()
export class OccSavedCartAdapter implements SavedCartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadList(userId: string): Observable<EntitiesModel<Cart>> {
    return this.http
      .get<Occ.CartList>(this.getSavedCartList(userId))
      .pipe(this.converter.pipeable(SAVED_CARTS_NORMALIZER));
  }

  protected getSavedCartList(userId: string): string {
    return this.occEndpoints.getUrl('savedCarts', { userId });
  }
}
