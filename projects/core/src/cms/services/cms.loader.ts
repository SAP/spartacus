import { Injectable } from '@angular/core';
import { PageContext } from '../../routing/models/page-context.model';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OccCmsConvertor } from '../converter';
import { CMSPage } from '../../occ/occ-models/occ.models';
import { CmsContentConfig } from '../config/cms-content.config';

@Injectable({
  providedIn: 'root'
})
export abstract class CmsLoader {
  constructor(
    protected adapter: OccCmsConvertor,
    protected cmsData: CmsContentConfig
  ) {}

  get(pageContext: PageContext): Observable<any> {
    return this.preload(pageContext).pipe(
      map(pageData => {
        this.adapt(pageContext, pageData);
        return pageData;
      }),
      tap(data => console.log(data))
    );
  }

  protected preload(pageContext: PageContext): Observable<any> {
    console.log('page context', pageContext);
    const page = this.getPreconfiguredPage(pageContext);
    if (page) {
      return of(page);
    } else {
      return this.loadPageData(pageContext);
    }
  }

  protected loadPageData(pageContext: PageContext): Observable<any> {
    return this.preload(pageContext);
  }

  private getPreconfiguredPage(pageContext: PageContext): any {
    return this.cmsData.cmsData.pages.find(page => page.uid === pageContext.id);
  }

  adapt(_pageContext: PageContext, page: CMSPage): void {
    this.adapter.convert(page);
  }
}
