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

    ngTitleService = TestBed.inject(Title);
    ngMetaService = TestBed.inject(Meta);
  });

  it('should inject service', () => {
    expect(seoMetaService).toBeTruthy();
  });

  it('Should update title', () => {
    seoMetaService.init();
    expect(ngTitleService.getTitle()).toBe('Test title');
  });

  it('Should add description meta tag', () => {
    incrementSpy = spyOn(ngMetaService, 'updateTag');
    seoMetaService.init();
    expect(incrementSpy).toHaveBeenCalledWith({
      name: 'description',
      content: 'Test description',
    });
  });

  it('Should add `INDEX FOLLOW` in robots meta tag', () => {
    incrementSpy = spyOn(ngMetaService, 'updateTag');
    seoMetaService.init();
    expect(incrementSpy).toHaveBeenCalledWith({
      name: 'robots',
      content: 'INDEX, FOLLOW',
    });
  });
});
