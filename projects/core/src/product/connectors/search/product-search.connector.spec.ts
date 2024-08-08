import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductSearchAdapter } from './product-search.adapter';
import { ProductSearchConnector } from './product-search.connector';
import createSpy = jasmine.createSpy;

class MockProductSearchAdapter implements ProductSearchAdapter {
  search = createSpy('ProductSearchAdapter.loadSearch').and.callFake((query) =>
    of('search:' + query)
  );

  loadSuggestions = createSpy(
    'ProductSearchAdapter.loadSuggestions'
  ).and.callFake((term) => of('term:' + term));

  searchByCodes = createSpy('ProductSearchAdapter.searchByCodes').and.callFake(
    (codes, scope) => of({ products: codes.map((code) => ({ code, scope })) })
  );
}

describe('ProductSearchConnector', () => {
  let service: ProductSearchConnector;
  let adapter: ProductSearchAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductSearchAdapter, useClass: MockProductSearchAdapter },
      ],
    });
    service = TestBed.inject(ProductSearchConnector);
    adapter = TestBed.inject(ProductSearchAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search should call adapter', () => {
    let result;
    service.search('test query').subscribe((res) => (result = res));
    expect(result).toBe('search:test query');
    expect(adapter.search).toHaveBeenCalledWith(
      'test query',
      undefined,
      undefined
    );
  });

  it('searchByCodes should call adapter', () => {
    let result;
    service
      .searchByCodes(['code1', 'code2'])
      .subscribe((res) => (result = res));
    expect(result).toEqual({
      products: [
        { code: 'code1', scope: undefined },
        { code: 'code2', scope: undefined },
      ],
    });
    expect(adapter.searchByCodes).toHaveBeenCalledWith(
      ['code1', 'code2'],
      undefined
    );
  });

  it('getSuggestions should call adapter', () => {
    let result;
    service.getSuggestions('test term').subscribe((res) => (result = res));
    expect(result).toBe('term:test term');
    expect(adapter.loadSuggestions).toHaveBeenCalledWith(
      'test term',
      undefined
    );
  });
});
