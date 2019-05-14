import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsComponent, CmsComponentList } from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsComponentAdapter } from '../connectors/component/cms-component.adapter';
import { IdList } from '../model/idList.model';
import { ConverterService } from '../../util/converter.service';
import { CMS_COMPONENT_NORMALIZER } from '../connectors/component/converters';
import { pluck } from 'rxjs/operators';
import { PageType } from '../../model/cms.model';

@Injectable()
export class OccCmsComponentAdapter implements CmsComponentAdapter {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
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

  loadList(
    ids: string[],
    pageContext: PageContext,
    fields = 'DEFAULT',
    currentPage = 0,
    pageSize = ids.length,
    sort?: string
  ): Observable<CmsComponent[]> {
    const requestParams = this.getComponentsRequestParams(
      pageContext,
      currentPage,
      pageSize,
      sort
    );

    const idList: IdList = { idList: ids };

    return this.http
      .post<CmsComponentList>(
        this.getComponentsEndpoint(requestParams, fields),
        idList,
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
    return this.occEndpoints.getUrl(
      'component',
      { id },
      this.getComponentRequestParams(pageContext)
    );
  }

  protected getComponentsEndpoint(requestParams: any, fields: string): string {
    return this.occEndpoints.getUrl('components', { fields }, requestParams);
  }

  private getComponentsRequestParams(
    pageContext: PageContext,
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): { [key: string]: string } {
    const requestParams = this.getComponentRequestParams(pageContext);

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

  private getComponentRequestParams(
    pageContext: PageContext
  ): { [key: string]: string } {
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
