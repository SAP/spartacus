import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Address } from '../../occ/occ-models/occ.models';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { CartAddressAdapter } from '../connectors/address';

@Injectable()
export class OccCartAddressAdapter implements CartAddressAdapter {
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }

  public create(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address> {
    return this.http
      .post<Address>(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        address,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
