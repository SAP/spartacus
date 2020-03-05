import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FeatureConfigService } from '../../features-config';
import { PageType } from '../../model/cms.model';
import { Page, PageMeta } from '../model/page.model';
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
      title: 'content page title',
    });
  }

  resolveTitle(): Observable<string> {
    return of('content page title');
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

  resolve(): Observable<PageMeta> | any {
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

  resolve(): Observable<PageMeta> | any {
    return of({
      title: 'new title resolved by resolve()',
    });
  }

  resolveTitle(): Observable<string> {
    return of('new title resolved by resolveTitle');
  }
}

@Injectable({
  providedIn: 'root',
})
class MockFeatureConfigService {
  isLevel() {
    return false;
  }
}

describe('PageTitleService', () => {
  let service: PageMetaService;
  let cmsService: CmsService;
  let featureConfigService: FeatureConfigService;

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
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    });

    service = TestBed.inject(PageMetaService);
    cmsService = TestBed.inject(CmsService);
    featureConfigService = TestBed.inject(FeatureConfigService);
  });

  it('PageTitleService should be created', inject(
    [PageMetaService],
    (pageTitleService: PageMetaService) => {
      expect(pageTitleService).toBeTruthy();
    }
  ));

  describe('FeatureLevel 1.3', () => {
    it('should call resolve() on resolver class)', () => {
      spyOn(featureConfigService, 'isLevel').and.returnValue(false);
      const resolver: ContentPageResolver = TestBed.inject(ContentPageResolver);
      spyOn(resolver, 'resolve').and.callThrough();
      service
        .getMeta()
        .subscribe()
        .unsubscribe();
      expect(resolver.resolve).toHaveBeenCalled();
    });

    it('should not call resolve() on resolver class)', () => {
      spyOn(featureConfigService, 'isLevel').and.returnValue(true);
      const resolver: ContentPageResolver = TestBed.inject(ContentPageResolver);
      spyOn(resolver, 'resolve').and.callThrough();
      service
        .getMeta()
        .subscribe()
        .unsubscribe();
      expect(resolver.resolve).not.toHaveBeenCalled();
    });

    it('should resolve page title using resolveTitle()', () => {
      spyOn(featureConfigService, 'isLevel').and.returnValue(true);

      const resolver: ContentPageResolver = TestBed.inject(ContentPageResolver);
      spyOn(resolver, 'resolveTitle').and.callThrough();

      service
        .getMeta()
        .subscribe()
        .unsubscribe();

      expect(resolver.resolveTitle).toHaveBeenCalled();
    });
  });

  describe('resolveTitle', () => {
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
  });
});
