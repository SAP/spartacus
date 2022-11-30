import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BundleStarter } from '../model/bundle.model';
import { BundleAdapter } from './bundle.adapter';
import { BundleConnector } from './bundle.connector';
import createSpy = jasmine.createSpy;

const mockCartId = 'test-cart';
const mockUserId = 'test-user';
const mockBundleStarter: BundleStarter = {
  productCode: '123',
  quantity: 1,
  templateId: 'MockBundle',
};

class MockBundleAdapter implements Partial<BundleAdapter> {
  bundleStart = createSpy().and.returnValue(of({}));
  bundleAllowedProductsSearch = createSpy().and.returnValue(of([]));
}

describe('BundleConnector', () => {
  let adapter: BundleAdapter;
  let connector: BundleConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BundleConnector,
        { provide: BundleAdapter, useClass: MockBundleAdapter },
      ],
    });

    connector = TestBed.inject(BundleConnector);
    adapter = TestBed.inject(BundleAdapter);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should start bundle', () => {
    connector.bundleStart(mockUserId, mockCartId, mockBundleStarter);
    expect(adapter.bundleStart).toHaveBeenCalledWith(
      mockUserId,
      mockCartId,
      mockBundleStarter
    );
  });

  it('should load bundle allowed products', () => {
    connector.bundleAllowedProductsSearch(mockUserId, mockCartId, 1, {});
    expect(adapter.bundleAllowedProductsSearch).toHaveBeenCalledWith(
      mockUserId,
      mockCartId,
      1,
      {}
    );
  });
});
