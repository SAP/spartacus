import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromStore from '../store/index';
import { ProductInterestService } from './product-interest-service.service';
import * as fromProcessStore from '../../process/store/process-state';
import { PRODUCT_INTERESTS_FEATURE } from '../store/index';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
describe('ProductInterestServiceService', () => {
  let store: Store<
    | fromStore.StateWithProductInterests
    | fromProcessStore.StateWithProcess<void>
  >;
  let service: ProductInterestService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_INTERESTS_FEATURE,
          fromStore.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [ProductInterestService],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(ProductInterestService);
  });

  it('should be able to load product interests', () => {
    service.loadProductInterests('userId', 5, 1, 'name:asc');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadProductInterests({
        userId: 'userId',
        pageSize: 5,
        currentPage: 1,
        sort: 'name:asc',
      })
    );
  });
  it('should be able to get product interests', () => {
    store.dispatch(
      new fromStore.LoadProductInterestsSuccess({
        results: [],
        sorts: [],
        pagination: {},
      })
    );

    service
      .getProdutInterests('', 1)
      .subscribe(data =>
        expect(data).toEqual({
          results: [],
          pagination: {},
          sorts: [],
        })
      )
      .unsubscribe();
  });
  it('should be able to get product interests loaded flag', () => {
    store.dispatch(new fromStore.LoadProductInterestsSuccess({}));
    service
      .getProdutInterestsLoaded()
      .subscribe(data => expect(data).toEqual(true))
      .unsubscribe();
  });
  it('should be able to delete product interests', () => {
    service.deleteProdutInterest('userId', {});
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.DeleteProductInterests({
        userId: 'userId',
        item: {},
      })
    );
  });
  it('should be able to clear product interests', () => {
    service.clearProductInterests();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearProductInterests()
    );
  });
});
