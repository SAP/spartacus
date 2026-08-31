/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  ConverterService,
  LoggerService,
  UserIdService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import {
  OPF_ACTIVE_CONFIGURATIONS_NORMALIZER,
  OpfBaseAdapter,
  OpfEndpointsService,
} from '@spartacus/opf/base/core';
import {
  OPF_CC_ACCESS_CODE_HEADER,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfActiveConfigurationsQuery,
  OpfActiveConfigurationsResponse,
  OpfConfig,
  OpfMetadataStatePersistanceService,
} from '@spartacus/opf/base/root';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class OpfApiBaseAdapter implements OpfBaseAdapter {
  protected http = inject(HttpClient);
  protected converter = inject(ConverterService);
  protected opfEndpointsService = inject(OpfEndpointsService);
  protected config = inject(OpfConfig);
  protected opfMetadataStatePersistanceService = inject(
    OpfMetadataStatePersistanceService
  );
  protected logger = inject(LoggerService);
  protected userIdService = inject(UserIdService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected cartAccessCodeFacade = inject(CartAccessCodeFacade);

  protected headerWithNoLanguage: { [name: string]: string } = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  protected header: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Accept-Language':
      this.opfMetadataStatePersistanceService.getActiveLanguage(),
  };

  protected headerWithContentLanguage: { [name: string]: string } = {
    ...this.headerWithNoLanguage,
    'Content-Language':
      this.opfMetadataStatePersistanceService.getActiveLanguage(),
  };

  getActiveConfigurations(
    query?: OpfActiveConfigurationsQuery
  ): Observable<OpfActiveConfigurationsResponse> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.http.get<OpfActiveConfigurationsResponse>(
          this.getActiveConfigurationsEndpoint(query),
          { headers }
        )
      ),
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      this.converter.pipeable(OPF_ACTIVE_CONFIGURATIONS_NORMALIZER)
    );
  }

  protected getActiveConfigurationsEndpoint(
    query?: OpfActiveConfigurationsQuery
  ): string {
    return this.opfEndpointsService.buildUrl('getActiveConfigurations', {
      queryParams: query,
    });
  }

  protected getHeaders(): Observable<HttpHeaders> {
    const headers = new HttpHeaders(this.header).set(
      OPF_CC_PUBLIC_KEY_HEADER,
      this.config.opf?.commerceCloudPublicKey || ''
    );

    if (this.config.opf?.enableActiveConfigurationAccessCodeHeader !== true) {
      return of(headers);
    }

    return this.getAccessCode().pipe(
      map((accessCode) => headers.set(OPF_CC_ACCESS_CODE_HEADER, accessCode))
    );
  }

  protected getAccessCode(): Observable<string> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) =>
        this.activeCartFacade
          .takeActiveCartId()
          .pipe(
            switchMap((cartId) =>
              this.cartAccessCodeFacade.getCartAccessCode(userId, cartId)
            )
          )
      ),
      map((response) => response?.accessCode ?? '')
    );
  }
}
