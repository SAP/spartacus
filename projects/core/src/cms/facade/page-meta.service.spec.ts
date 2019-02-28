import { TestBed, inject } from '@angular/core/testing';

import { PageMetaService } from './page-meta.service';
import { PageMetaResolver } from '../page';
import { Injectable } from '@angular/core';
import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import { Page, PageMeta } from '../model/page.model';
import { CmsService } from './cms.service';

const mockPage: Page = {
  type: PageType.CONTENT_PAGE,
  slots: {}
};

const anotherMockPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'template',
  slots: {}
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockPage);
  }
}

@Injectable()
class ContentPageResolver extends PageMetaResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return of({
      title: 'content page title'
    });
  }
}

@Injectable({
  providedIn: 'root'
})
class AnotherPageResolver extends PageMetaResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'template';
  }

  resolve(): Observable<PageMeta> {
    return of({
      title: 'special page title'
    });
  }
}

describe('PageTitleService', () => {
  let service: PageMetaService;
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageMetaService,
        ContentPageResolver,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageMetaResolver,
          useExisting: ContentPageResolver,
          multi: true
        },
        {
          provide: PageMetaResolver,
          useExisting: AnotherPageResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageMetaService);
    cmsService = TestBed.get(CmsService);
  });

  describe('ContentPage', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockPage));
    });

    it('PageTitleService should be created', inject(
      [PageMetaService],
      (pageTitleService: PageMetaService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('should resolve content page title', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual('content page title');
    });
  });

  describe('Special ContentPage', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(anotherMockPage));
    });

    it('should resolve special page title', () => {
      let result: PageMeta;
      service
        .getMeta()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual('special page title');
    });
  });
});
