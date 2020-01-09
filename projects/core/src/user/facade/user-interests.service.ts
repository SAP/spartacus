import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  StateWithUser,
  REMOVE_PRODUCT_INTERESTS_PROCESS_ID,
  ADD_PRODUCT_INTEREST_PROCESS_ID,
} from '../store/user-state';
import {
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
  NotificationType,
} from '../../model/product-interest.model';
import { tap, map } from 'rxjs/operators';
import {
  getProcessLoadingFactory,
  getProcessSuccessFactory,
  getProcessErrorFactory,
} from '../../process/store/selectors/process.selectors';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';

@Injectable({
  providedIn: 'root',
})
export class UserInterestsService {
  constructor(protected store: Store<StateWithUser | StateWithProcess<void>>) {}

  /**
   * Retrieves an product interest list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadProductInterests(
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    productCode?: string,
    notificationType?: NotificationType
  ): void {
    this.store.dispatch(
      new UserActions.LoadProductInterests({
        userId: OCC_USER_ID_CURRENT,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sort,
        productCode: productCode,
        notificationType: notificationType,
      })
    );
  }

  /**
   * Returns product interests
   */
  getProductInterests(): Observable<ProductInterestSearchResult> {
    return this.store.pipe(select(UsersSelectors.getInterests));
  }

  /**
   * Returns product interests
   * @param pageSize the page size
   */
  getAndLoadProductInterests(
    pageSize?: number
  ): Observable<ProductInterestSearchResult> {
    return this.store.pipe(
      select(UsersSelectors.getInterestsState),
      tap(interestListState => {
        const attemptedLoad =
          interestListState.loading ||
          interestListState.success ||
          interestListState.error;
        if (!attemptedLoad) {
          this.loadProductInterests(pageSize);
        }
      }),
      map(interestListState => interestListState.value)
    );
  }

  /**
   * Returns a loading flag for product interests
   */
  getProdutInterestsLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getInterestsLoading));
  }

  /**
   * Removes a ProductInterestRelation
   * @param item product interest relation item
   * @param singleDelete flag to delete only one interest
   */
  removeProdutInterest(
    item: ProductInterestEntryRelation,
    singleDelete?: boolean
  ): void {
    this.store.dispatch(
      new UserActions.RemoveProductInterest({
        userId: OCC_USER_ID_CURRENT,
        item: item,
        singleDelete: singleDelete,
      })
    );
  }

  /**
   * Returns a loading flag for removing product interests.
   */
  getRemoveProdutInterestLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(REMOVE_PRODUCT_INTERESTS_PROCESS_ID))
    );
  }

  /**
   * Returns a success flag for removing a product interests.
   */
  getRemoveProdutInterestSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(REMOVE_PRODUCT_INTERESTS_PROCESS_ID))
    );
  }

  /**
   * Add a new product interest.
   *
   * @param productCode the product code
   * @param notificationType the notification type
   */
  addProductInterest(
    productCode: string,
    notificationType: NotificationType
  ): void {
    this.store.dispatch(
      new UserActions.AddProductInterest({
        userId: OCC_USER_ID_CURRENT,
        productCode: productCode,
        notificationType: notificationType,
      })
    );
  }

  /**
   * Returns a success flag for adding a product interest.
   */
  getAddProductInterestSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(ADD_PRODUCT_INTEREST_PROCESS_ID))
    );
  }

  /**
   * Returns a error flag for adding a product interest.
   */
  getAddProductInterestError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(ADD_PRODUCT_INTEREST_PROCESS_ID))
    );
  }

  /**
   * Reset product interest adding state.
   */
  resetAddInterestState(): void {
    this.store.dispatch(new UserActions.ResetAddInterestState());
  }

  /**
   * Reset product interest removing state.
   */
  resetRemoveInterestState(): void {
    this.store.dispatch(new UserActions.ResetRemoveInterestState());
  }

  /**
   * Clears product interests
   */
  clearProductInterests(): void {
    this.store.dispatch(new UserActions.ClearProductInterests());
  }
}
