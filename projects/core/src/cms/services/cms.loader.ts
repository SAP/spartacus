import { Injectable, Inject } from '@angular/core';
import { PageContext } from '../../routing/models/page-context.model';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { CMSPage } from '../../occ/occ-models/occ.models';
import { CmsContentConfig } from '../config/cms-content.config';
import { Page } from '../model/page.model';
import { Adapter } from '../adapters/index';

@Injectable({
  providedIn: 'root'
})
export abstract class CmsLoader {
  constructor(
    protected cmsData: CmsContentConfig,
    @Inject(Adapter) protected adapters: Adapter[]
  ) {}

  /**
   * Get the UI page data.
   */
  get(pageContext: PageContext): Observable<Page> {
    return this.preload(pageContext).pipe(
      tap(p => console.log('preload', p)),
      map(pageData => {
        this.adapt(pageContext, pageData);
        return pageData;
      })
    );
  }

  /**
   * The preload method allows to load page data from
   * configuration.
   *
   * TOOD: implement strategy for fallback or merge
   */
  protected preload(pageContext: PageContext): Observable<any> {
    const page = this.getPreconfiguredPage(pageContext);
    if (page) {
      return of(page);
    } else {
      return this.loadPage(pageContext);
    }
  }

  protected loadPage(pageContext: PageContext): Observable<any> {
    return this.preload(pageContext);
  }

  private getPreconfiguredPage(pageContext: PageContext): any {
    return this.cmsData.cmsData.pages.find(page => page.uid === pageContext.id);
  }

  adapt(_pageContext: PageContext, page: CMSPage): void {
    this.adapters.forEach(p => p.convert(page));
  }
}
