import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  BasePageMetaResolver,
  CmsService,
  Page,
  PageRobotsMeta,
} from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { CartPageMetaResolver } from './cart-page-meta.resolver';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'CartPageTemplate',
  title: 'Shopping Cart',
  slots: {},
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

class MockBasePageMetaResolver {
  resolveRobots() {}
  resolveTitle() {
    return of('Shopping Cart');
  }
}

describe('CartPageMetaResolver', () => {
  let service: CartPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    service = TestBed.inject(CartPageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it(`should resolve title`, () => {
    let result: string;

    service
      .resolveTitle()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Shopping Cart');
  });

  it(`should resolve robots`, () => {
    let result: string[];

    service
      .resolveRobots()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result.length).toEqual(2);
    expect(result).toContain(PageRobotsMeta.NOFOLLOW);
    expect(result).toContain(PageRobotsMeta.NOINDEX);
  });
});
