import * as AngularCore from '@angular/core';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PageType } from '../../model/cms.model';
import {
  BreadcrumbMeta,
  Page,
  PageMeta,
  PageRobotsMeta,
} from '../model/page.model';
import {
  PageBreadcrumbResolver,
  PageDescriptionResolver,
  PageHeadingResolver,
  PageImageResolver,
  PageMetaConfig,
  PageMetaResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from '../page';
import { CmsService } from './cms.service';
import { PageMetaService } from './page-meta.service';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  slots: {},
};

const mockContentPageWithTemplate: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'template',
  slots: {},
};

const mockProductPage: Page = {
  type: PageType.PRODUCT_PAGE,
  template: 'any-template',
  slots: {},
};

const PageMetaResolvers: PageMetaConfig = {
  pageMeta: {
    resolvers: [
      {
        property: 'title',
        method: 'resolveTitle',
      },
      {
        property: 'heading',
        method: 'resolveHeading',
      },
      {
        property: 'description',
        method: 'resolveDescription',
        disabledInCsr: true,
      },
      {
        property: 'image',
        method: 'resolveImage',
        disabledInCsr: true,
      },
      {
        property: 'breadcrumbs',
        method: 'resolveBreadcrumbs',
      },
      {
        property: 'robots',
        method: 'resolveRobots',
        disabledInCsr: true,
      },
    ],
    enableInDevMode: true,
  },
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

@Injectable()
class ContentPageResolver
  extends PageMetaResolver
  implements PageTitleResolver {
  pageType = PageType.CONTENT_PAGE;
  resolveTitle(): Observable<string> {
    return of('content page title');
  }
}

@Injectable({
  providedIn: 'root',
})
class PageWithHeadingResolver
  extends PageMetaResolver
  implements PageHeadingResolver {
  pageType = PageType.CONTENT_PAGE;
  pageTemplate = 'template';

  resolveHeading(): Observable<PageMeta> | any {
    return of('page heading');
  }
}
@Injectable({
  providedIn: 'root',
})
class PageWithAllResolvers
  extends PageMetaResolver
  implements
    PageTitleResolver,
    PageHeadingResolver,
    PageImageResolver,
    PageRobotsResolver,
    PageDescriptionResolver,
    PageBreadcrumbResolver {
  pageType = PageType.PRODUCT_PAGE;
  pageTemplate = 'any-template';

  resolveTitle(): Observable<string> {
    return of('page title');
  }

  resolveHeading(): Observable<string> {
    return of('page heading');
  }

  resolveDescription(): Observable<string> {
    return of('page description');
  }
  resolveBreadcrumbs(): Observable<any> {
    return of([
      { label: 'breadcrumb label', link: '/bread/crumb' },
    ] as BreadcrumbMeta[]);
  }
  resolveImage(): Observable<string> {
    return of('/my/image.jpg');
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([
      PageRobotsMeta.FOLLOW,
      PageRobotsMeta.INDEX,
    ] as PageRobotsMeta[]);
  }
}

describe('PageMetaService', () => {
  let service: PageMetaService;
  let cmsService: CmsService;

  describe('browser', () => {
    let resolver: PageWithAllResolvers;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          PageMetaService,
          ContentPageResolver,
          { provide: CmsService, useClass: MockCmsService },
          {
            provide: PageMetaResolver,
            useExisting: PageWithAllResolvers,
            multi: true,
          },
          { provide: PLATFORM_ID, useValue: 'browser' },
          {
            provide: PageMetaConfig,
            useValue: PageMetaResolvers,
          },
        ],
      });

      service = TestBed.inject(PageMetaService);
      cmsService = TestBed.inject(CmsService);

      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockProductPage));
      resolver = TestBed.inject(PageWithAllResolvers);
      spyOn(resolver, 'resolveTitle').and.callThrough();
      spyOn(resolver, 'resolveDescription').and.callThrough();
      spyOn(resolver, 'resolveRobots').and.callThrough();
      spyOn(resolver, 'resolveImage').and.callThrough();
    });

    it('should not resolve disabled resolvers', () => {
      spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
      service.getMeta().subscribe().unsubscribe();
      expect(resolver.resolveTitle).toHaveBeenCalled();
      expect(resolver.resolveDescription).not.toHaveBeenCalled();
      expect(resolver.resolveRobots).not.toHaveBeenCalled();
      expect(resolver.resolveImage).not.toHaveBeenCalled();
    });

    it('should resolve disabled resolvers in devMode', () => {
      spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => true);
      service.getMeta().subscribe().unsubscribe();
      expect(resolver.resolveTitle).toHaveBeenCalled();
      expect(resolver.resolveDescription).toHaveBeenCalled();
      expect(resolver.resolveRobots).toHaveBeenCalled();
      expect(resolver.resolveImage).toHaveBeenCalled();
    });
  });

  describe('server', () => {
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
            useExisting: PageWithHeadingResolver,
            multi: true,
          },
          {
            provide: PageMetaResolver,
            useExisting: PageWithAllResolvers,
            multi: true,
          },
          { provide: PageMetaConfig, useValue: PageMetaResolvers },
        ],
      });

      service = TestBed.inject(PageMetaService);
      cmsService = TestBed.inject(CmsService);
    });

    it('PageMetaService should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should resolve page title using resolveTitle()', () => {
      const resolver: ContentPageResolver = TestBed.inject(ContentPageResolver);
      spyOn(resolver, 'resolveTitle').and.callThrough();
      service.getMeta().subscribe().unsubscribe();
      expect(resolver.resolveTitle).toHaveBeenCalled();
    });

    it('should resolve page heading', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(
        of(mockContentPageWithTemplate)
      );
      let result: PageMeta | null;
      service
        .getMeta()
        .subscribe((value) => {
          result = value;
        })
        .unsubscribe();

      expect(result?.heading).toEqual('page heading');
    });

    it('should resolve meta data for product page', () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockProductPage));
      let result: PageMeta;
      service
        .getMeta()
        .subscribe((value) => {
          result = value;
        })
        .unsubscribe();

      expect(result.title).toEqual('page title');
      expect(result.heading).toEqual('page heading');
      expect(result.description).toEqual('page description');
      expect(result.breadcrumbs[0].label).toEqual('breadcrumb label');
      expect(result.breadcrumbs[0].link).toEqual('/bread/crumb');
      expect(result.image).toEqual('/my/image.jpg');
      expect(result.robots).toContain(PageRobotsMeta.INDEX);
      expect(result.robots).toContain(PageRobotsMeta.FOLLOW);
    });
  });
});

const KEYWORDS = 'keywords, are, no longer, used, for, SEO';

@Injectable({
  providedIn: 'root',
})
class PageWithKeywordsResolver extends PageMetaResolver {
  constructor() {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolveKeywords(): Observable<string> {
    return of(KEYWORDS);
  }
}
const mockKeywordPage: Page = {
  type: PageType.CONTENT_PAGE,
  slots: {},
};

export interface CustomPageMeta extends PageMeta {
  keywords?: string;
}

describe('Custom PageTitleService', () => {
  let service: PageMetaService;
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageMetaResolver,
          useExisting: PageWithKeywordsResolver,
          multi: true,
        },
        {
          provide: PageMetaConfig,
          useValue: {
            pageMeta: {
              resolvers: [
                {
                  property: 'keywords',
                  method: 'resolveKeywords',
                },
              ],
            },
          },
        },
      ],
    });

    service = TestBed.inject(PageMetaService);
    cmsService = TestBed.inject(CmsService);
  });

  it('should resolve keywords for custom page meta service', () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockKeywordPage));
    let result: CustomPageMeta;
    service
      .getMeta()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result.keywords).toEqual(KEYWORDS);
  });
});
