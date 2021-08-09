import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SAVE_CART_NORMALIZER } from '../../../cart/connectors/save-cart/converters';
import { SaveCartAdapter } from '../../../cart/connectors/save-cart/save-cart.adapter';
import { SaveCartResult } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

/**
 * TODO(#11938): 4.0: use OccSavedCartAdapter instead from saved-cart feature-lib of cart
 *
 * When the saved cart feature module exist, there exist a race condition between the 'saveCart' key for the default occ config
 * Allows wishlist to function when the key value is pulled from the saved-cart feature-lib
 *
 * Keep in mind that this adapter will be removed in 4.0 as we will delegate this functionality to the saved-cart feature-lib
 **/
@Injectable()
export class OccSaveCartAdapter implements SaveCartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  public saveCart(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<SaveCartResult> {
    let httpParams = new HttpParams();

    if (Boolean(saveCartName)) {
      httpParams = httpParams.set('saveCartName', saveCartName);
    }

    if (Boolean(saveCartDescription)) {
      httpParams = httpParams.set('saveCartDescription', saveCartDescription);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return !this.occEndpointsService
      .buildUrl('saveCart', { urlParams: { userId, cartId } })
      .includes('saveCartName')
      ? this.http
          .patch<Occ.SaveCartResult>(
            this.occEndpointsService.buildUrl('saveCart', {
              urlParams: { userId, cartId },
            }),
            httpParams,
            { headers }
          )
          .pipe(this.converterService.pipeable(SAVE_CART_NORMALIZER))
      : this.http
          .patch<Occ.SaveCartResult>(
            this.occEndpointsService.buildUrl('saveCart', {
              urlParams: {
                userId,
                cartId,
                saveCartName,
                saveCartDescription,
              },
            }),
            cartId
          )
          .pipe(this.converterService.pipeable(SAVE_CART_NORMALIZER));
  }
}
