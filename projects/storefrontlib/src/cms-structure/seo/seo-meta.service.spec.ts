import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { SeoMetaService } from './seo-meta.service';
import { PageMeta, PageMetaService } from '@spartacus/core';

class MockPageMetaService {
  getMeta(): Observable<PageMeta> {
    return of({
      title: 'test title'
    });
  }
}

describe('SeoTitleService', () => {
  let seoMetaService: SeoMetaService;

  let ngTitleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoMetaService,
        Title,
        { provide: PageMetaService, useClass: MockPageMetaService }
      ]
    });

    seoMetaService = TestBed.get(SeoMetaService);

    ngTitleService = TestBed.get(Title);
  });

  it('should inject service', () => {
    expect(seoMetaService).toBeTruthy();
  });

  describe('Should update title', () => {
    it('should render default slots', () => {
      seoMetaService.init();

      expect(ngTitleService.getTitle()).toBe('test title');
    });
  });
});
