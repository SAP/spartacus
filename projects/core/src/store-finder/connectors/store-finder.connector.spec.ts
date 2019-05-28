import { StoreFinderConnector } from './store-finder.connector';
import { StoreFinderAdapter } from './store-finder.adapter';
import { TestBed } from '@angular/core/testing';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import { StoreFinderSearchConfig } from '../model';
import { GeoPoint } from '../../model';

class MockStoreFinderAdapter implements StoreFinderAdapter {
  search = createSpy('adapter.search').and.returnValue(
    of(`adapter.search result`)
  );

  load = createSpy('adapter.load').and.returnValue(of(`adapter.load result`));

  loadCounts = createSpy('adapter.loadCounts').and.returnValue(
    of(`adapter.loadCounts result`)
  );
}

describe('StoreFinderConnector', () => {
  let service: StoreFinderConnector;
  let adapter: StoreFinderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: StoreFinderAdapter, useClass: MockStoreFinderAdapter },
      ],
    });

    service = TestBed.get(StoreFinderConnector);
    adapter = TestBed.get(StoreFinderAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search should call adapter', () => {
    const geoPoint: GeoPoint = { latitude: 1, longitude: 2 };
    const searchConfig: StoreFinderSearchConfig = {
      sort: 'ASC',
    };

    let result;
    service
      .search('query', searchConfig, geoPoint)
      .subscribe(res => (result = res));
    expect(result).toBe('adapter.search result');
    expect(adapter.search).toHaveBeenCalledWith(
      'query',
      searchConfig,
      geoPoint
    );
  });

  it('get should call adapter', () => {
    let result;
    service.get('storeId').subscribe(res => (result = res));
    expect(result).toBe('adapter.load result');
    expect(adapter.load).toHaveBeenCalledWith('storeId');
  });

  it('getCounts should call adapter', () => {
    let result;
    service.getCounts().subscribe(res => (result = res));
    expect(result).toBe('adapter.loadCounts result');
    expect(adapter.loadCounts).toHaveBeenCalled();
  });
});
