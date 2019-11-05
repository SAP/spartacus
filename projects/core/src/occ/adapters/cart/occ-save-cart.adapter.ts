import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SAVE_CART_NORMALIZER } from '../../../cart/connectors/save-cart/converters';
import { SaveCartAdapter } from '../../../cart/connectors/save-cart/save-cart.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models';
import { OccEndpointsService } from '../../services';

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
    saveCartName: string,
    saveCartDescription: string
  ) {
    const httpParams = new HttpParams()
      .set('saveCartName', saveCartName)
      .set('saveCartDescription', saveCartDescription);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .patch<Occ.SaveCartResult>(
        this.occEndpointsService.getUrl('saveCart', { userId, cartId }),
        httpParams,
        { headers }
      )
      .pipe(this.converterService.pipeable(SAVE_CART_NORMALIZER));
  }
}
