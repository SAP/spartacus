import * as AngularCore from '@angular/core';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, Observable, of, Subject } from 'rxjs';
import { PageType } from '../../model/cms.model';
import { LanguageService } from '../../site-context/facade/language.service';
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

const mockPageMetaConfig: PageMetaConfig = {
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
      },
      {
        property: 'image',
        method: 'resolveImage',
      },
      {
        property: 'breadcrumbs',
        method: 'resolveBreadcrumbs',
      },
      {
        property: 'robots',
        method: 'resolveRobots',
      },
    ],
  },
};

class MockLanguageService {
  private active$ = new Subject<string>();
  getActive() {
    return this.active$.asObservable();
  }
  emitLanguage(lang: string) {
    this.active$.next(lang);
  }
}

class MockCmsService {
  refreshLatestPage = jasmine.createSpy('refreshLatestPage');
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

@Injectable()
class ContentPageResolver
  extends PageMetaResolver
  implements PageTitleResolver
{
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
  implements PageHeadingResolver
{
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
    PageBreadcrumbResolver
{
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
        providers: [
          PageMetaService,
          ContentPageResolver,
          { provide: LanguageService, useClass: MockLanguageService },
          { provide: CmsService, useClass: MockCmsService },
          {
            provide: PageMetaResolver,
            useExisting: PageWithAllResolvers,
            multi: true,
          },
          { provide: PLATFORM_ID, useValue: 'browser' },
          {
            provide: PageMetaConfig,
            useValue: mockPageMetaConfig,
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

    describe('when in dev mode', () => {
      beforeEach(() => {
        spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => true);
      });

      it('should call all resolvers', async () => {
        await firstValueFrom(service.getMeta());
        expect(resolver.resolveTitle).toHaveBeenCalled();
        expect(resolver.resolveDescription).toHaveBeenCalled();
        expect(resolver.resolveRobots).toHaveBeenCalled();
        expect(resolver.resolveImage).toHaveBeenCalled();
      });
    });

    describe('when in production mode', () => {
      beforeEach(() => {
        spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
      });

      it('should call all resolvers', async () => {
        await firstValueFrom(service.getMeta());
        expect(resolver.resolveTitle).toHaveBeenCalled();
        expect(resolver.resolveDescription).toHaveBeenCalled();
        expect(resolver.resolveRobots).toHaveBeenCalled();
        expect(resolver.resolveImage).toHaveBeenCalled();
      });
    });
  });

  describe('server', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: LanguageService, useClass: MockLanguageService },
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
          { provide: PageMetaConfig, useValue: mockPageMetaConfig },
        ],
      });

      service = TestBed.inject(PageMetaService);
      cmsService = TestBed.inject(CmsService);
    });

    it('PageMetaService should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should skip the first getActive() emission and call refreshLatestPage on subsequent emissions', () => {
      const languageService = TestBed.inject(
        LanguageService
      ) as unknown as MockLanguageService;
      // Emit first language (should be skipped)
      languageService.emitLanguage('en');
      expect(cmsService.refreshLatestPage).not.toHaveBeenCalled();

      // Emit second and third languages (should trigger refreshLatestPage twice)
      languageService.emitLanguage('de');
      languageService.emitLanguage('fr');
      expect(cmsService.refreshLatestPage).toHaveBeenCalledTimes(2);
    });

    it('should resolve page title using resolveTitle()', async () => {
      const resolver: ContentPageResolver = TestBed.inject(ContentPageResolver);
      spyOn(resolver, 'resolveTitle').and.callThrough();
      await firstValueFrom(service.getMeta());
      expect(resolver.resolveTitle).toHaveBeenCalled();
    });

    it('should resolve page heading', async () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(
        of(mockContentPageWithTemplate)
      );

      const result = await firstValueFrom(service.getMeta());

      expect(result?.heading).toEqual('page heading');
    });

    it('should resolve meta data for product page', async () => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockProductPage));
      const result = await firstValueFrom(service.getMeta());

      expect(result?.title).toEqual('page title');
      expect(result?.heading).toEqual('page heading');
      expect(result?.description).toEqual('page description');
      expect(result?.breadcrumbs?.[0].label).toEqual('breadcrumb label');
      expect(result?.breadcrumbs?.[0].link).toEqual('/bread/crumb');
      expect(result?.image).toEqual('/my/image.jpg');
      expect(result?.robots).toContain(PageRobotsMeta.INDEX);
      expect(result?.robots).toContain(PageRobotsMeta.FOLLOW);
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
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
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
          } satisfies PageMetaConfig,
        },
      ],
    });

    service = TestBed.inject(PageMetaService);
    cmsService = TestBed.inject(CmsService);
  });

  it('should resolve keywords for custom page meta service', async () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockKeywordPage));

    const result: CustomPageMeta | null = await firstValueFrom(
      service.getMeta()
    );

    expect(result?.keywords).toEqual(KEYWORDS);
  });
});
