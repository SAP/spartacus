import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { PageMeta, PageMetaService, PageRobotsMeta } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SeoMetaService } from './seo-meta.service';

class MockPageMetaService {
  getMeta(): Observable<PageMeta> {
    return of(<PageMeta>{
      title: 'Test title',
      description: 'Test description',
      robots: [PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW],
    });
  }
}

describe('SeoTitleService', () => {
  let seoMetaService: SeoMetaService;
  let pageMetaService: PageMetaService;

  let ngTitleService: Title;
  let ngMetaService: Meta;

  let incrementSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoMetaService,
        Title,
        Meta,
        { provide: PageMetaService, useClass: MockPageMetaService },
      ],
    });

    seoMetaService = TestBed.inject(SeoMetaService);
    pageMetaService = TestBed.inject(PageMetaService);

    ngTitleService = TestBed.inject(Title);
    ngMetaService = TestBed.inject(Meta);

    incrementSpy = spyOn(ngMetaService, 'updateTag');
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
    expect(incrementSpy).toHaveBeenCalledWith({
      name: 'description',
      content: 'Test description',
    });
  });

  describe('robots', () => {
    it('Should add `INDEX FOLLOW` in robots meta tag', () => {
      seoMetaService.init();
      expect(incrementSpy).toHaveBeenCalledWith({
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
      expect(incrementSpy).toHaveBeenCalledWith({
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
      expect(incrementSpy).not.toHaveBeenCalledWith({
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
      expect(incrementSpy).toHaveBeenCalledWith({
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
      expect(incrementSpy).toHaveBeenCalledWith({
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
      expect(incrementSpy).toHaveBeenCalledWith({
        name: 'robots',
        content: 'INDEX, FOLLOW',
      });
    });
  });
});
