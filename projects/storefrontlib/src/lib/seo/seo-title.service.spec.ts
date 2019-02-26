import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { PageTitleService } from '@spartacus/core';
import { SeoTitleService } from './seo-title.service';

class MockPageTitleService {
  getTitle(): Observable<string> {
    return of('test title');
  }
}

describe('SeoTitleService', () => {
  let seoTitleService: SeoTitleService;

  let ngTitleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoTitleService,
        Title,
        { provide: PageTitleService, useClass: MockPageTitleService }
      ]
    });

    seoTitleService = TestBed.get(SeoTitleService);

    ngTitleService = TestBed.get(Title);
  });

  it('should inject service', () => {
    expect(seoTitleService).toBeTruthy();
  });

  describe('Should update title', () => {
    it('should render default slots', () => {
      seoTitleService.initPageTitle();

      expect(ngTitleService.getTitle()).toBe('test title');
    });
  });
});
