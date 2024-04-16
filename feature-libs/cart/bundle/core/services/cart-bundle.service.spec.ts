import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart, EntryGroup, MultiCartFacade } from '@spartacus/cart/base/root';
import { Product, ProductService, User, UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { BundleService } from '../facade';
import { BundleStarter, BundleTemplate, BundleTypes } from '../model';
import { CartBundleService } from './cart-bundle.service';

// Mock Data
const mockUser: User = {
  uid: 'testUserId',
};

const mockBundleTemplate: BundleTemplate = {
  id: 'test',
};

const mockProduct: Product = {
  code: 'test',
  bundleTemplates: [mockBundleTemplate],
};

const mockCart: Cart = {
  guid: 'test',
};

const mockBundleStarter: BundleStarter = {
  productCode: mockProduct.code as string,
  quantity: 1,
  templateId: 'test',
};

const mockEntryGroup: EntryGroup = {
  type: BundleTypes.CONFIGURABLE,
  entries: [],
};

class MockMultiCartService {
  getEntryGroups = jasmine.createSpy().and.returnValue(of([mockEntryGroup]));
}

class MockUserIdService {
  getUserId = jasmine.createSpy().and.returnValue(of(mockUser.uid));
}

class MockBundleService {
  startBundle = jasmine.createSpy();
  isBundle = jasmine.createSpy().and.returnValue(true);
}

class MockProductService {
  get = jasmine.createSpy().and.returnValue(of(mockProduct));
}

class MockActiveCartFacade {
  requireLoadedCart = jasmine.createSpy().and.returnValue(of(mockCart));
}

describe('CartBundleService', () => {
  let service: CartBundleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartBundleService,
        { provide: MultiCartFacade, useClass: MockMultiCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: BundleService, useClass: MockBundleService },
        { provide: ProductService, useClass: MockProductService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    });

    service = TestBed.inject(CartBundleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get bundle templates', () => {
    service
      .getBundleTemplates(mockProduct.code as string)
      .subscribe((result) => {
        expect(result).toEqual([mockBundleTemplate]);
      });
  });

  it('should start bundle', () => {
    const bundleService = TestBed.inject(BundleService);
    service.startBundle(mockBundleStarter);
    expect(bundleService.startBundle).toHaveBeenCalledWith(
      mockCart.guid,
      mockUser.uid,
      mockBundleStarter
    );
  });

  it('should get bundle', () => {
    service.getBundle(mockCart.guid as string).subscribe((result) => {
      expect(result).toEqual(mockEntryGroup);
    });
  });
});
