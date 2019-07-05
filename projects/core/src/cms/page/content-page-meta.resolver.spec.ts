import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CmsService, Page, PageMetaResolver } from '..';
import { PageMetaService } from '../facade';
import { PageMeta } from '../model/page.model';
import { ContentPageMetaResolver } from './content-page-meta.resolver';
import { PageType } from '../../model/cms.model';
import { I18nTestingModule } from '../../i18n';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  title: 'Page title',
  slots: {},
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

describe('ContentPageMetaResolver', () => {
  let service: ContentPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageMetaResolver,
          useExisting: ContentPageMetaResolver,
          multi: true,
        },
      ],
    });

    service = TestBed.get(ContentPageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve content page title', () => {
    let result: PageMeta;

    service
      .resolve()
      .subscribe(meta => {
        result = meta;
      })
      .unsubscribe();

    expect(result.title).toEqual('Page title');
  });

  it('should resolve one breadcrumb', () => {
    let result: PageMeta;
    service
      .resolve()
      .subscribe(meta => {
        result = meta;
      })
      .unsubscribe();
    expect(result.breadcrumbs.length).toEqual(1);
  });

  it('should resolve home breadcrumb', () => {
    let result: PageMeta;
    service
      .resolve()
      .subscribe(meta => {
        result = meta;
      })
      .unsubscribe();
    expect(result.breadcrumbs[0].label).toEqual('common.home');
  });
});
