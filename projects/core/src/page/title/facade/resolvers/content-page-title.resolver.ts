import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { CmsService, Page } from '../../../../cms/index';
import { PageType } from '../../../../occ/index';
import { PageTitleResolver } from '../page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class ContentPageTitleResolver extends PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
  }

  hasMatch(page: Page) {
    return page.type === PageType.CONTENT_PAGE;
  }

  resolve(): Observable<string> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      map(page => page.title)
    );
  }
}
