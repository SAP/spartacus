import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProductSearchConnector } from './product-search.connector';

describe('ProductSearchConnector', () => {
  let service: ProductSearchConnector;
  let adapter: {
    search: ReturnType<typeof vi.fn>;
    loadSuggestions: ReturnType<typeof vi.fn>;
    searchByCodes: ReturnType<typeof vi.fn>;
    searchByCategory: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      search: vi.fn().mockImplementation((query) => of('search:' + query)),
      loadSuggestions: vi.fn().mockImplementation((term) => of('term:' + term)),
      searchByCodes: vi.fn().mockImplementation((codes, scope) =>
        of({ products: codes.map((code: string) => ({ code, scope })) })
      ),
      searchByCategory: vi.fn().mockImplementation((_category, scope) =>
        of({ products: [{ code: 'product1', scope }] })
      ),
    };
    service = new ProductSearchConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search should call adapter', () => {
    let result: any;
    service.search('test query').subscribe((res) => (result = res));
    expect(result).toBe('search:test query');
    expect(adapter.search).toHaveBeenCalledWith(
      'test query',
      undefined,
      undefined
    );
  });

  it('searchByCodes should call adapter', () => {
    let result: any;
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
    let result: any;
    service.getSuggestions('test term').subscribe((res) => (result = res));
    expect(result).toBe('term:test term');
    expect(adapter.loadSuggestions).toHaveBeenCalledWith(
      'test term',
      undefined
    );
  });

  it('searchByCategory should call adapter', () => {
    let result: any;
    service.searchByCategory('testCategory', 'testScope').subscribe((res) => {
      result = res;
    });
    expect(result).toEqual({
      products: [{ code: 'product1', scope: 'testScope' }],
    });
    expect(adapter.searchByCategory).toHaveBeenCalledWith(
      'testCategory',
      'testScope'
    );
  });
});
