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
    expect(adapter.search).toHaveBeenCalledWith('test query', undefined);
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
