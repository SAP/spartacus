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
      image: 'http://assets.com/image.jpg',
      robots: [PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW],
      canonicalUrl: 'https://www.canonicalUrl.com',
    });
  }
}

class MockPageMetaLinkService implements Partial<PageMetaLinkService> {
  setCanonicalLink(): void {}
}

describe('SeoMetaService', () => {
  let seoMetaService: SeoMetaService;
  let pageMetaService: PageMetaService;

  let ngTitleService: Title;
  let ngMetaService: Meta;

  let updateMetaTagSpy: vi.Mock;
  let removeMetaTagSpy: vi.Mock;
  let addCanonicalLinkSpy: vi.Mock;

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

    updateMetaTagSpy = vi.spyOn(ngMetaService, 'updateTag');
    removeMetaTagSpy = vi.spyOn(ngMetaService, 'removeTag');
    addCanonicalLinkSpy = vi.spyOn(
      TestBed.inject(PageMetaLinkService),
      'setCanonicalLink'
    );
  });

  it('should inject service', () => {
    expect(seoMetaService).toBeTruthy();
  });

  it('should not any default tags', () => {
    vi.spyOn(pageMetaService, 'getMeta').mockReturnValue(of({}));
    seoMetaService.init();
    expect(updateMetaTagSpy).not.toHaveBeenCalled();
  });

  it('Should update title', () => {
    seoMetaService.init();
    expect(ngTitleService.getTitle()).toBe('Test title');
  });

  describe('description', () => {
    it('Should add description meta tag', () => {
      seoMetaService.init();
      expect(updateMetaTagSpy).toHaveBeenCalledWith({
        name: 'description',
        content: 'Test description',
      });
    });

    it('Should remove description meta tag', () => {
      vi.spyOn(pageMetaService, 'getMeta').mockReturnValue(of({}));
      seoMetaService.init();
      expect(removeMetaTagSpy).toHaveBeenCalledWith('name="description"');
    });
  });

  describe('image', () => {
    it('Should add og:image meta tag', () => {
      seoMetaService.init();
      expect(updateMetaTagSpy).toHaveBeenCalledWith({
        name: 'og:image',
        content: 'http://assets.com/image.jpg',
      });
    });

    it('Should remove og:image meta tag', () => {
      vi.spyOn(pageMetaService, 'getMeta').mockReturnValue(of({}));
      seoMetaService.init();
      expect(removeMetaTagSpy).toHaveBeenCalledWith('name="og:image"');
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
