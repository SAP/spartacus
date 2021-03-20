import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { PageMeta, PageMetaService, PageRobotsMeta } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PageMetaLinkService } from './page-meta-link.service';
import { SeoMetaService } from './seo-meta.service';

class MockPageMetaService {
  getMeta(): Observable<PageMeta> {
    return of(<PageMeta>{
      title: 'Test title',
      description: 'Test description',
      robots: [PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW],
      canonicalUrl: 'https://www.canonicalUrl.com',
    });
  }
}

class MockPageMetaLinkService implements Partial<PageMetaLinkService> {
  setCanonicalLink(): void {}
}

describe('SeoTitleService', () => {
  let seoMetaService: SeoMetaService;
  let pageMetaService: PageMetaService;

  let ngTitleService: Title;
  let ngMetaService: Meta;

  let updateMetaTagSpy: jasmine.Spy;
  let addCanonicalLinkSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoMetaService,
        Title,
        Meta,
        { provide: PageMetaService, useClass: MockPageMetaService },
        { provide: PageMetaLinkService, useClass: MockPageMetaLinkService },
      ],
    });

    seoMetaService = TestBed.inject(SeoMetaService);
    pageMetaService = TestBed.inject(PageMetaService);

    ngTitleService = TestBed.inject(Title);
    ngMetaService = TestBed.inject(Meta);

    updateMetaTagSpy = spyOn(ngMetaService, 'updateTag');
    addCanonicalLinkSpy = spyOn(
      TestBed.inject(PageMetaLinkService),
      'setCanonicalLink'
    );
  });

  it('should inject service', () => {
    expect(seoMetaService).toBeTruthy();
  });

  it('Should update title', () => {
    seoMetaService.init();
    expect(ngTitleService.getTitle()).toBe('Test title');
  });

  it('Should add description meta tag', () => {
    seoMetaService.init();
    expect(updateMetaTagSpy).toHaveBeenCalledWith({
      name: 'description',
      content: 'Test description',
    });
  });

  describe('robots', () => {
    it('Should add `INDEX FOLLOW` in robots meta tag', () => {
      seoMetaService.init();
      expect(updateMetaTagSpy).toHaveBeenCalledWith({
        name: 'robots',
        content: 'INDEX, FOLLOW',
      });
    });

    it('Should add `NOINDEX FOLLOW` in robots meta tag', () => {
      spyOn(pageMetaService, 'getMeta').and.returnValue(
        of({
          title: 'Test title',
          description: 'Test description',
          robots: [PageRobotsMeta.NOINDEX, PageRobotsMeta.FOLLOW],
        })
      );
      seoMetaService.init();
      expect(updateMetaTagSpy).toHaveBeenCalledWith({
        name: 'robots',
        content: 'NOINDEX, FOLLOW',
      });
    });

    it('should not add robot meta tags if robots are empty ([])', () => {
      spyOn(pageMetaService, 'getMeta').and.returnValue(
        of({
          title: 'Test title',
          description: 'Test description',
          robots: [],
        })
      );
      seoMetaService.init();
      expect(updateMetaTagSpy).not.toHaveBeenCalledWith({
        name: 'robots',
        content: 'INDEX, FOLLOW',
      });
    });

    it('should add robot meta tags if robots are not provided', () => {
      spyOn(pageMetaService, 'getMeta').and.returnValue(
        of({
          title: 'Test title',
          description: 'Test description',
        })
      );
      seoMetaService.init();
      expect(updateMetaTagSpy).toHaveBeenCalledWith({
        name: 'robots',
        content: 'INDEX, FOLLOW',
      });
    });

    it('should add robot meta tags if robots are null', () => {
      spyOn(pageMetaService, 'getMeta').and.returnValue(
        of({
          title: 'Test title',
          description: 'Test description',
          robots: null,
        })
      );
      seoMetaService.init();
      expect(updateMetaTagSpy).toHaveBeenCalledWith({
        name: 'robots',
        content: 'INDEX, FOLLOW',
      });
    });

    it('should add robot meta tags if robots are undefined', () => {
      spyOn(pageMetaService, 'getMeta').and.returnValue(
        of({
          title: 'Test title',
          description: 'Test description',
          robots: undefined,
        })
      );
      seoMetaService.init();
      expect(updateMetaTagSpy).toHaveBeenCalledWith({
        name: 'robots',
        content: 'INDEX, FOLLOW',
      });
    });
  });

  describe('canonical url', () => {
    it('Should build the canonical url with the link builder', () => {
      seoMetaService.init();
      expect(addCanonicalLinkSpy).toHaveBeenCalledWith(
        'https://www.canonicalUrl.com'
      );
    });
  });
});
