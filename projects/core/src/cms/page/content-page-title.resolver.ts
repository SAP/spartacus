import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PageType } from '../../occ/occ-models/occ.models';
import { CmsService } from '../facade/cms.service';
import { PageMetaResolver } from './page-meta.resolver';
import { PageMeta, Page } from '../model/page.model';
import { PageTitleResolver } from './page.resolvers';

@Injectable({
  providedIn: 'root'
})
export class ContentPageTitleResolver extends PageMetaResolver
  implements PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      map(page => {
        return {
          title: this.resolveTitle(page)
        };
      })
    );
  }

  resolveTitle(page: Page) {
    return page.title;
  }
}
