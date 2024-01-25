/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { Address, AddressValidation } from '../../../model/address.model';
import {
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  ADDRESS_VALIDATION_NORMALIZER,
} from '../../../user/connectors/address/converters';
import { UserAddressAdapter } from '../../../user/connectors/address/user-address.adapter';
import { ConverterService } from '../../../util/converter.service';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../utils/interceptor-util';
import { OCC_USER_ID_ANONYMOUS } from '../../utils/occ-constants';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccUserAddressAdapter implements UserAddressAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadAll(userId: string): Observable<Address[]> {
    const url = this.occEndpoints.buildUrl('addresses', {
      urlParams: { userId },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });

    return this.http.get<Occ.AddressList>(url, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      }),
      map((addressList) => addressList.addresses ?? []),
      this.converter.pipeableMany(ADDRESS_NORMALIZER)
    );
  }

  add(userId: string, address: Address): Observable<{}> {
    const url = this.occEndpoints.buildUrl('addresses', {
      urlParams: { userId },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    address = this.converter.convert(address, ADDRESS_SERIALIZER);

    return this.http.post(url, address, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }

  update(userId: string, addressId: string, address: Address): Observable<{}> {
    const url = this.occEndpoints.buildUrl('addressDetail', {
      urlParams: { userId, addressId },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    address = this.converter.convert(address, ADDRESS_SERIALIZER);

    return this.http.patch(url, address, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }

  verify(userId: string, address: Address): Observable<AddressValidation> {
    const url = this.occEndpoints.buildUrl('addressVerification', {
      urlParams: { userId },
    });
    let headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }
    address = this.converter.convert(address, ADDRESS_SERIALIZER);

    return this.http.post<AddressValidation>(url, address, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      }),
      this.converter.pipeable(ADDRESS_VALIDATION_NORMALIZER)
    );
  }

  delete(userId: string, addressId: string): Observable<{}> {
    const url = this.occEndpoints.buildUrl('addressDetail', {
      urlParams: { userId, addressId },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });

    return this.http.delete(url, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }
}
