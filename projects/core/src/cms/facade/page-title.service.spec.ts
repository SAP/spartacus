import { TestBed, inject } from '@angular/core/testing';

import { PageTitleService } from './page-title.service';
import { PageTitleResolver } from '../page';
import { Injectable } from '@angular/core';
import { PageType } from '../../occ/occ-models/occ.models';
import { Observable, of } from 'rxjs';
import { Page } from '../model/page.model';
import { CmsService } from './cms.service';

const mockPage: Page = {
  type: PageType.CONTENT_PAGE,
  slots: {}
};

const anotherMockPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'template',
  slots: {}
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockPage);
  }
}

@Injectable()
class ContentPageResolver extends PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  resolve(): Observable<string> {
    return of('content page title');
  }
}

@Injectable({
  providedIn: 'root'
})
class AnotherPageResolver extends PageTitleResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'template';
  }

  resolve(): Observable<string> {
    return of('special page title');
  }
}

describe('PageTitleService', () => {
  let service: PageTitleService;
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PageTitleService,
        ContentPageResolver,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageTitleResolver,
          useExisting: ContentPageResolver,
          multi: true
        },
        {
          provide: PageTitleResolver,
          useExisting: AnotherPageResolver,
          multi: true
        }
      ]
    });

    service = TestBed.get(PageTitleService);
    cmsService = TestBed.get(CmsService);
  });

  describe('ContentPage', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(mockPage));
    });

    it('PageTitleService should be created', inject(
      [PageTitleService],
      (pageTitleService: PageTitleService) => {
        expect(pageTitleService).toBeTruthy();
      }
    ));

    it('should resolve content page title', () => {
      let result: string;
      service
        .getTitle()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual('content page title');
    });
  });

  describe('Special ContentPage', () => {
    beforeEach(() => {
      spyOn(cmsService, 'getCurrentPage').and.returnValue(of(anotherMockPage));
    });

    it('should resolve special page title', () => {
      let result: string;
      service
        .getTitle()
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual('special page title');
    });
  });
});
