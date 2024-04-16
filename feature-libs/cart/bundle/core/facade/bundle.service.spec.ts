import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ActiveCartFacade, EntryGroup } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { BundleTypes } from '../model';
import { BUNDLE_FEATURE, BundleActions, StateWithBundle } from '../store';
import * as fromStoreReducers from '../store/reducers/index';
import { BundleService } from './bundle.service';

const testData = {
  activeCartId: 'testCartId',
  currentUserId: 'testUserId',
  product: {
    code: 'testProductCode',
  },
};

class MockUserIdService {
  getUserId = jasmine.createSpy().and.returnValue(of(testData.currentUserId));
}

describe('BundleService', () => {
  let store: Store<StateWithBundle>;
  let service: BundleService;
  const MockActiveCartService = jasmine.createSpyObj('ActiveCartFacade', [
    'getActiveCartId',
  ]);
  MockActiveCartService.getActiveCartId.and.returnValue(of(testData.activeCartId));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(BUNDLE_FEATURE, fromStoreReducers.getReducers()),
      ],
      providers: [
        BundleService,
        { provide: ActiveCartFacade, useValue: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(BundleService);
    spyOn(store, 'dispatch').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch action to start bundle', () => {
    const bundleStarter = {
      productCode: testData.product.code,
      quantity: 1,
      templateId: 'MockBundle',
    };
    service.startBundle(
      testData.activeCartId,
      testData.currentUserId,
      bundleStarter
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new BundleActions.StartBundle({
        cartId: testData.activeCartId,
        userId: testData.currentUserId,
        bundleStarter,
      })
    );
  });

  it('should get active cart id and current user id before get bundle allowed products', () => {
    service.getAllowedProducts(1);
    const activeCartFacade = TestBed.inject(ActiveCartFacade);
    const userIdService = TestBed.inject(UserIdService);

    expect(activeCartFacade.getActiveCartId).toHaveBeenCalled();
    expect(userIdService.getUserId).toHaveBeenCalled();
  });

  it('should dispatch action to get allowed products', () => {
    service.getAllowedProducts(1, '', {});
    expect(store.dispatch).toHaveBeenCalledWith(
      new BundleActions.GetBundleAllowedProducts({
        userId: testData.currentUserId,
        cartId: testData.activeCartId,
        entryGroupNumber: 1,
        query: '',
        searchConfig: {},
      })
    );
  });

  describe('isBundle', () => {
    it('check isbundle should return ture', () => {
      const mockEntryGroup: EntryGroup = {
        type: BundleTypes.CONFIGURABLE,
        entryGroupNumber: 2,
      };
      expect(service.isBundle(mockEntryGroup)).toBeTruthy();
    });

    it('check isbundle should return false', () => {
      const mockEntryGroup: EntryGroup = {
        type: 'testType',
        entryGroupNumber: 2,
      };
      expect(service.isBundle(mockEntryGroup)).toBeFalsy();
    });
  });
});
