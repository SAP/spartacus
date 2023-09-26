/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponentAdapter } from '../../../cms/connectors/component/cms-component.adapter';
import { CMS_COMPONENT_NORMALIZER } from '../../../cms/connectors/component/converters';
import { CmsComponent, PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { UserIdService } from '../../../auth';

@Injectable({
  providedIn: 'root',
})
export class OccCmsComponentAdapter implements CmsComponentAdapter {
  protected readonly userIdService = inject(UserIdService);
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load<T extends CmsComponent>(
    id: string,
    pageContext: PageContext
  ): Observable<T> {
    const userId$ = this.userIdService
      ? this.userIdService.getUserId()
      : of('');

    return userId$.pipe(
      switchMap((userId: string) => {
        return this.http.get<T>(
          this.getComponentEndPoint(id, pageContext, userId),
          {
            headers: this.headers,
          }
        );
      }),
      this.converter.pipeable<any, T>(CMS_COMPONENT_NORMALIZER)
    );
  }

  findComponentsByIds(
    ids: string[],
    pageContext: PageContext,
    fields = 'DEFAULT',
    currentPage = 0,
    pageSize = ids.length,
    sort?: string
  ): Observable<CmsComponent[]> {
    const userId$ = this.userIdService
      ? this.userIdService.getUserId()
      : of('');
    const requestParams = {
      ...this.getContextParams(pageContext),
      ...this.getPaginationParams(currentPage, pageSize, sort),
    };

    requestParams['componentIds'] = ids.toString();

    return userId$.pipe(
      switchMap((userId: string) => {
        return this.http.get<Occ.ComponentList>(
          this.getComponentsEndpoint(requestParams, fields, userId),
          {
            headers: this.headers,
          }
        );
      }),
      map((componentList) => componentList.component ?? []),
      this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER)
    );
  }

  protected getComponentEndPoint(
    id: string,
    pageContext: PageContext,
    userId: string
  ): string {
    const queryParams = this.getContextParams(pageContext);

    const attributes = userId
      ? {
          urlParams: { id, userId },
          queryParams,
        }
      : { urlParams: { id }, queryParams };
    return this.occEndpoints.buildUrl('component', attributes);
  }

  protected getComponentsEndpoint(
    requestParams: any,
    fields: string,
    userId: string
  ): string {
    const queryParams = { fields, ...requestParams };

    const attributes = userId
      ? {
          urlParams: { userId },
          queryParams,
        }
      : { queryParams };

    return this.occEndpoints.buildUrl('components', attributes);
  }

  protected getPaginationParams(
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): { [key: string]: string } {
    const requestParams: { [key: string]: string } = {};
    if (currentPage !== undefined) {
      requestParams['currentPage'] = currentPage.toString();
    }
    if (pageSize !== undefined) {
      requestParams['pageSize'] = pageSize.toString();
    }
    if (sort !== undefined) {
      requestParams['sort'] = sort;
    }

    return requestParams;
  }

  protected getContextParams(pageContext: PageContext): {
    [key: string]: string;
  } {
    let requestParams = {};
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        requestParams = { productCode: pageContext.id };
        break;
      }
      case PageType.CATEGORY_PAGE: {
        requestParams = { categoryCode: pageContext.id };
        break;
      }
      case PageType.CATALOG_PAGE: {
        requestParams = { catalogCode: pageContext.id };
        break;
      }
    }

    return requestParams;
  }
}
