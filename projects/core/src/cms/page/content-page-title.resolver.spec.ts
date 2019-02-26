import { TestBed, inject } from '@angular/core/testing';

import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import { Page, PageMetaResolver, CmsService } from '../../cms/';
import { ContentPageTitleResolver } from './content-page-title.resolver';
import { PageMetaService } from '../facade';
import { PageMeta } from '../model/page.model';

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
  let service: PageMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageMetaService,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageMetaResolver,
          useExisting: ContentPageTitleResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageMetaService);
  });

  it('PageTitleService should be created', inject(
    [PageMetaService],
    (pageTitleService: PageMetaService) => {
      expect(pageTitleService).toBeTruthy();
    }
  ));

  it('should resolve content page title', () => {
    let result: PageMeta;
    const subscription = service.getMeta().subscribe(value => {
      result = value;
    });
    subscription.unsubscribe();

    expect(result.title).toEqual('Page title');
  });
});
