import { inject, TestBed } from '@angular/core/testing';
import { ProductSearchByCodeService } from './product-search-by-code.service';
import { ProductActions } from '../store/actions';
// import { ProductSelectors } from '../store/selectors';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import { Store, StoreModule } from '@ngrx/store';
import * as fromStoreReducers from '../store/reducers';
import { lastValueFrom, of } from 'rxjs';
import { Product } from '@spartacus/core';
import * as ngrxStore from '@ngrx/store';


fdescribe('ProductSearchByCodeService', () => {
  let service: ProductSearchByCodeService;
  let store: Store<StateWithProduct>;

  // const code = 'testId';
  // const mockProduct: Product = { code };

  // const mockSelect = (
  //   selector: MemoizedSelector<StateWithProduct, EntityScopedLoaderState<Product>>
  // ) => {
  //   switch (selector) {
  //     case ProductSelectors.getProductSearchByCodeState:
  //       return () => of('mockProduct');
  //     default:
  //       return () => EMPTY;
  //   }
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [
        ProductSearchByCodeService,
      ],
    });

    service = TestBed.inject(ProductSearchByCodeService);
    store = TestBed.inject(Store);
  });

  it('should ProductSearchByCodeService is injected', inject(
    [ProductSearchByCodeService],
    (productSearchByCodeService: ProductSearchByCodeService) => {
      expect(productSearchByCodeService).toBeTruthy();
    }
  ));

  it('should dispatch ProductSearchLoadByCode action on load', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const code = 'testCode';
    const scope = 'testScope';

    service.load({ code, scope });
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ProductActions.ProductSearchLoadByCode({ code, scope })
    );

    service.load({ code });
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ProductActions.ProductSearchLoadByCode({ code, scope: '' })
    );
  });

  xit('should return product from store on get method', async () => {
    //TODO: Need help to fix the test
    const code = 'testCode';
    const scope = 'testScope';
    const mockProduct: Product = { code };

    spyOnProperty(ngrxStore, 'select').and.returnValue(
      () => () => of(mockProduct)
    );

    const result: Product = await lastValueFrom(service.get({code, scope}));
    expect(result).toEqual(mockProduct);

  });

  xit('should call load if state is not loading, success, or error', () => {
    //TODO: Need help to fix the test
    const code = 'testCode';
    const scope = 'testScope';
    const mockState = { loading: false, success: false, error: false, value: undefined };

    spyOn(service, 'load');
    spyOn(store, 'pipe').and.returnValue(of(mockState));

    const state$ = service.get({ code, scope });
    state$.subscribe();

    // expect(service.load).toHaveBeenCalledWith({ code, scope });
    expect(store.pipe).toHaveBeenCalled();
  });

});
