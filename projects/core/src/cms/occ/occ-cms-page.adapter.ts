import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageType } from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsPageAdapter } from '../connectors/page/cms-page.adapter';
import { CMS_PAGE_NORMALIZE } from '../connectors/page/converters';
import { ConverterService } from '../../util/converter.service';
import { CmsStructureModel } from '../model/page.model';

@Injectable()
export class OccCmsPageAdapter implements CmsPageAdapter {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getBaseEndPoint(): string {
    return this.occEndpoints.getEndpoint('cms');
  }

  load(
    pageContext: PageContext,
    fields?: string
  ): Observable<CmsStructureModel> {
    let httpStringParams = '';

    // load page by id
    if (pageContext.type === undefined) {
      if (fields !== undefined) {
        httpStringParams = httpStringParams + '?fields=' + fields;
      }

      return this.http
        .get(this.getBaseEndPoint() + `/pages/${pageContext.id}`, {
          headers: this.headers,
          params: new HttpParams({
            fromString: httpStringParams,
          }),
        })
        .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZE));
    }

    // load page by context
    // for smartedit preview page, page is loaded by previewToken which added by interceptor
    if (pageContext.id !== 'smartedit-preview') {
      httpStringParams = 'pageType=' + pageContext.type;

      if (pageContext.type === PageType.CONTENT_PAGE) {
        httpStringParams =
          httpStringParams + '&pageLabelOrId=' + pageContext.id;
      } else {
        httpStringParams = httpStringParams + '&code=' + pageContext.id;
      }
    }

    if (fields !== undefined) {
      httpStringParams = httpStringParams + '&fields=' + fields;
    }

    return this.http
      .get(this.getBaseEndPoint() + `/pages`, {
        headers: this.headers,
        params: new HttpParams({
          fromString: httpStringParams,
        }),
      })
      .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZE));
  }
}
