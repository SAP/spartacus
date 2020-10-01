import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartBundleAdapter } from '../../../cart/connectors/bundle';
import { Observable } from 'rxjs';
import { CART_MODIFICATION_NORMALIZER } from '../../../cart/connectors/entry/converters';
import { CartModification } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { Product } from 'projects/core/src/model';

@Injectable()
export class OccCartBundleAdapter implements CartBundleAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  public start(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    templateId: string
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({
      productCode: productCode,
      quantity: quantity,
      templateId: templateId,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('startBundle', {
      userId,
      cartId,
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public view(userId: string, cartId: string): Observable<CartModification> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('viewBundles', {
      userId,
      cartId,
    });

    return this.http
      .get<CartModification>(url, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public update(
    userId: string,
    cartId: string,
    entryGroupId: string,
    product: Product,
    quantity: number
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({
      product: product,
      quantity: quantity,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('editBundle', {
      userId,
      cartId,
      entryGroupId,
    });

    return this.http
      .put<CartModification>(url, toAdd, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public remove(
    userId: string,
    cartId: string,
    entryGroupId: string
  ): Observable<CartModification> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.getUrl('editBundle', {
      userId,
      cartId,
      entryGroupId,
    });

    return this.http
      .delete<CartModification>(url, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }
}
