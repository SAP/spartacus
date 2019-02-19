import { TestBed, inject } from '@angular/core/testing';

import * as ngrxStore from '@ngrx/store';

import { of } from 'rxjs';

import { PageTitleService } from './page-title.service';

fdescribe('PageTitleService', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PageTitleService]
    });

    service = TestBed.get(PageTitleService);
  });

  it('should ProductService is injected', inject(
    [PageTitleService],
    (pageTitleService: PageTitleService) => {
      expect(pageTitleService).toBeTruthy();
    }
  ));

  fdescribe('get(productCode)', () => {
    it('should be able to get product by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({
          value: mockProduct
        })
      );
      let result: Product;
      service
        .get('testId')
        .subscribe(product => {
          result = product;
        })
        .unsubscribe();
      expect(result).toBe(mockProduct);
    });
  });
});
