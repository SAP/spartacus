import { TestBed, inject } from '@angular/core/testing';

import { PageTitleService } from './page-title.service';
import { PageTitleResolver } from '../page';
import { Injectable } from '@angular/core';
import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import { Page } from '../model/page.model';
import { CmsService } from './cms.service';

const mockTitle = 'title';
const mockPage: Page = {
  type: PageType.CONTENT_PAGE,
  slots: {}
};
class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockPage);
  }
}

@Injectable({
  providedIn: 'root'
})
class ContentPageResolver extends PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<string> {
    return of(mockTitle);
  }
}

fdescribe('PageTitleService', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageTitleService,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageTitleResolver,
          useExisting: ContentPageResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageTitleService);
  });

  it('should be created', inject(
    [PageTitleService],
    (pageTitleService: PageTitleService) => {
      expect(pageTitleService).toBeTruthy();
    }
  ));

  it('should resolve title', () => {
    let result: string;
    const subscription = service.getTitle().subscribe(value => {
      result = value;
    });
    subscription.unsubscribe();

    expect(result).toEqual(mockTitle);
  });
});
