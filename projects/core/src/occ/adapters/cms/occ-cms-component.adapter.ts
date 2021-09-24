import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CmsComponentAdapter } from '../../../cms/connectors/component/cms-component.adapter';
import { CMS_COMPONENT_NORMALIZER } from '../../../cms/connectors/component/converters';
import { CmsComponent, PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class OccCmsComponentAdapter implements CmsComponentAdapter {
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
    return this.http
      .get<T>(this.getComponentEndPoint(id, pageContext), {
        headers: this.headers,
      })
      .pipe(this.converter.pipeable<any, T>(CMS_COMPONENT_NORMALIZER));
  }

  findComponentsByIds(
    ids: string[],
    pageContext: PageContext,
    fields = 'DEFAULT',
    currentPage = 0,
    pageSize = ids.length,
    sort?: string
  ): Observable<CmsComponent[]> {
    const requestParams = {
      ...this.getContextParams(pageContext),
      ...this.getPaginationParams(currentPage, pageSize, sort),
    };

    requestParams['componentIds'] = ids.toString();

    return this.http
      .get<Occ.ComponentList>(
        this.getComponentsEndpoint(requestParams, fields),
        {
          headers: this.headers,
        }
      )
      .pipe(
        pluck('component'),
        this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER)
      );
  }

  protected getComponentEndPoint(id: string, pageContext: PageContext): string {
    return this.occEndpoints.buildUrl('component', {
      urlParams: { id },
      queryParams: this.getContextParams(pageContext),
    });
  }

  protected getComponentsEndpoint(requestParams: any, fields: string): string {
    return this.occEndpoints.buildUrl('components', {
      queryParams: { fields, ...requestParams },
    });
  }

  protected getPaginationParams(
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): { [key: string]: string } {
    const requestParams = {};
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
