import { Injectable, Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PageType } from '../../model/cms.model';
import { Page, PageMeta, USE_SEPARATE_RESOLVERS } from '../model/page.model';
import { PageMetaResolver, PageTitleResolver } from '../page';
import { CmsService } from './cms.service';
import { PageMetaService } from './page-meta.service';

const mockPage: Page = {
  type: PageType.CONTENT_PAGE,
  slots: {},
};

const anotherMockPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'template',
  slots: {},
};

const NewMockPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'template-new',
  slots: {},
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

  resolve(_skip?: boolean): Observable<PageMeta> | any {
    return of({
      title: 'content page title',
    });
  }
}

@Injectable({
  providedIn: 'root',
})
class AnotherPageResolver extends PageMetaResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'template';
  }

  resolve(_skip?: boolean): Observable<PageMeta> | any {
    return of({
      title: 'special page title',
    });
  }
}

@Injectable({
  providedIn: 'root',
})
class NewPageResolver extends PageMetaResolver implements PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'template-new';
  }

  resolve(skip?: boolean): Observable<PageMeta> | any {
    if (skip) {
      return USE_SEPARATE_RESOLVERS;
    }
    return of({
      title: 'new title resolved by resolve()',
    });
  }

  resolveTitle(): Observable<string> {
    return of('new title resolved by resolveTitle');
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
          multi: true,
        },
        {
          provide: PageMetaResolver,
          useExisting: AnotherPageResolver,
          multi: true,
        },
        {
          provide: PageMetaResolver,
          useExisting: NewPageResolver,
          multi: true,
        },
      ],
    });

    service = TestBed.get(PageMetaService as Type<PageMetaService>);
    cmsService = TestBed.get(CmsService as Type<CmsService>);
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

  it('should resolve special page title', () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(of(anotherMockPage));
    let result: PageMeta;
    service
      .getMeta()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();

    expect(result.title).toEqual('special page title');
  });

  it('should resolve page title using resolveTitle()', () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(of(NewMockPage));
    let result: PageMeta;
    service
      .getMeta()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();

    expect(result.title).toEqual('new title resolved by resolveTitle');
  });
});
