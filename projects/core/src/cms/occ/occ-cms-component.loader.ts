import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CmsComponent, PageType } from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsStructureConfig } from '../config/cms-structure.config';
import { CmsComponentAdapter } from '../services/cms-component.adapter';
import { CmsComponentLoader } from '../services/cms-component.loader';
import { CmsStructureConfigService } from '../services/cms-structure-config.service';

@Injectable()
export class OccCmsComponentLoader extends CmsComponentLoader<any> {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    protected config: CmsStructureConfig,
    protected cmsStructureConfigService: CmsStructureConfigService,
    @Optional() protected adapter: CmsComponentAdapter<CmsComponent>,
    private occEndpoints: OccEndpointsService
  ) {
    super(cmsStructureConfigService, adapter);
  }

  protected getBaseEndPoint(): string {
    return this.occEndpoints.getEndpoint('cms');
  }

  load<T extends CmsComponent>(
    id: string,
    pageContext: PageContext
  ): Observable<T> {
    return this.http
      .get<T>(this.getBaseEndPoint() + `/components/${id}`, {
        headers: this.headers,
        params: new HttpParams({
          fromString: this.getRequestParams(pageContext),
        }),
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  private getRequestParams(pageContext: PageContext): string {
    let requestParams = '';
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        requestParams = 'productCode=' + pageContext.id;
        break;
      }
      case PageType.CATEGORY_PAGE: {
        requestParams = 'categoryCode=' + pageContext.id;
        break;
      }
      case PageType.CATALOG_PAGE: {
        requestParams = 'catalogCode=' + pageContext.id;
        break;
      }
    }

    return requestParams;
  }
}
