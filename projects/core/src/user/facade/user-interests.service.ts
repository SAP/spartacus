import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  StateWithUser,
  REMOVE_PRODUCT_INTERESTS_PROCESS_ID,
} from '../store/user-state';
import {
  ProductInterestList,
  ProductInterestRelation,
} from '../../model/product-interest.model';
import { tap, map } from 'rxjs/operators';
import { getProcessLoadingFactory } from '../../process/store/selectors/process.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserInterestsService {
  constructor(protected store: Store<StateWithUser | StateWithProcess<void>>) {}

  /**
   * Retrieves an product interest list
   * @param userId a user ID
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadProductInterests(
    userId: string,
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): void {
    this.store.dispatch(
      new UserActions.LoadProductInterests({
        userId: userId,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sort,
      })
    );
  }

  /**
   * Returns product interests list
   * @param userId a user ID
   * @param pageSize page size
   */
  getProdutInterests(
    userId: string,
    pageSize: number
  ): Observable<ProductInterestList> {
    return this.store.pipe(
      select(UsersSelectors.getInterestsState),
      tap(interestListState => {
        const attemptedLoad =
          interestListState.loading ||
          interestListState.success ||
          interestListState.error;
        if (!attemptedLoad && !!userId) {
          this.loadProductInterests(userId, pageSize);
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
   * @param userId a user ID
   * @param item product interest relation item
   */
  removeProdutInterest(userId: string, item: ProductInterestRelation): void {
    this.store.dispatch(
      new UserActions.RemoveProductInterests({
        userId: userId,
        item: item,
      })
    );
  }

  /**
   * Returns a loading flag for removing product interests.
   */
  getRemoveProdutInterestLoading(): Observable<boolean> {
    return this.store.select(
      getProcessLoadingFactory(REMOVE_PRODUCT_INTERESTS_PROCESS_ID)
    );
  }

  /**
   * Clears product interests
   */
  clearProductInterests(): void {
    this.store.dispatch(new UserActions.ClearProductInterests());
  }
}
