import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';
import { VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER } from '../variant';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorOccService {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.getUrl('addCpqConfigurationToCart', {
      userId: parameters.userId,
      cartId: parameters.cartId,
    });

    const occAddToCartParameters = this.converterService.convert(
      parameters,
      VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<CartModification>(url, occAddToCartParameters, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }
}
