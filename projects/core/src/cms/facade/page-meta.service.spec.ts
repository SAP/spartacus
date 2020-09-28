import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
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
  PageMetaResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from '../page';
import { CmsService } from './cms.service';
import { PageMetaService } from './page-meta.service';
import { take } from 'rxjs/operators';

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

// can be removed/replaced in future by the built-in RxJS 7 alternative
function firstValueFrom<T>(observable: Observable<T>): Promise<T> {
  return observable.pipe(take(1)).toPromise();
}

describe('PageMetaService', () => {
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
          useExisting: PageWithHeadingResolver,
          multi: true,
        },
        {
          provide: PageMetaResolver,
          useExisting: PageWithAllResolvers,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(PageMetaService);
    cmsService = TestBed.inject(CmsService);
  });

  it('PageMetaService should be created', () => {
    expect(service).toBeTruthy();
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

    const result: PageMeta = await firstValueFrom(service.getMeta());

    expect(result.heading).toEqual('page heading');
  });

  it('should resolve meta data for product page', async () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockProductPage));
    const result: PageMeta = await firstValueFrom(service.getMeta());

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

// Test Custom PageMetaService to bring in custon resolvers (for all pages)
@Injectable({ providedIn: 'root' })
export class CustomPageMetaService extends PageMetaService {
  protected resolverMethods = {
    keywords: 'resolveKeywords',
  };
}

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
        CustomPageMetaService,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageMetaResolver,
          useExisting: PageWithKeywordsResolver,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(CustomPageMetaService);
    cmsService = TestBed.inject(CmsService);
  });

  it('PageTitleService should be created', inject(
    [CustomPageMetaService],
    (customPageTitleService: CustomPageMetaService) => {
      expect(customPageTitleService).toBeTruthy();
    }
  ));

  it('should resolve keywords for custom page meta service', async () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockKeywordPage));
    const result: CustomPageMeta = await firstValueFrom(service.getMeta());

    expect(result.keywords).toEqual(KEYWORDS);
  });
});
