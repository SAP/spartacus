import { TestBed, inject } from '@angular/core/testing';

import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import {
  Page,
  PageTitleResolver,
  CmsService,
  PageTitleService
} from '../../cms/';
import { ContentPageTitleResolver } from './content-page-title.resolver';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  title: 'Page title',
  slots: {}
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

describe('ContentPageTitleResolver', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageTitleService,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageTitleResolver,
          useExisting: ContentPageTitleResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageTitleService);
  });

  it('PageTitleService should be created', inject(
    [PageTitleService],
    (pageTitleService: PageTitleService) => {
      expect(pageTitleService).toBeTruthy();
    }
  ));

  it('should resolve content page title', () => {
    let result: string;
    const subscription = service.getTitle().subscribe(value => {
      result = value;
    });
    subscription.unsubscribe();

    expect(result).toEqual('Page title');
  });
});
