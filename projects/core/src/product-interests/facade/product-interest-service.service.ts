import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as fromStore from '../store/index';
import * as fromProcessStore from '../../process/store/process-state';
import {
  ProductInterestList,
  ProductInterestRelation,
} from '../model/product-interest.model';
import {
  DELETE_BACK_IN_STOCK_PROCESS_ID,
  CREATE_BACK_IN_STOCK_PROCESS_ID,
} from '../store/index';
import {
  getProcessSuccessFactory,
  getProcessLoadingFactory,
} from '../../process';

@Injectable()
export class ProductInterestService {
  constructor(
    private store: Store<
      | fromStore.StateWithProductInterests
      | fromProcessStore.StateWithProcess<void>
    >
  ) {}

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
      new fromStore.LoadProductInterests({
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
      select(fromStore.getInterestsState),
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
   * Returns a loaded flag for product interests
   */
  getProdutInterestsLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getInterestsLoaded));
  }

  /**
   * Deletes a ProductInterestRelation
   * @param userId a user ID
   * @param item product interest relation item
   */
  deleteProdutInterest(userId: string, item: ProductInterestRelation): void {
    this.store.dispatch(
      new fromStore.DeleteProductInterests({
        userId: userId,
        item: item,
      })
    );
  }

  /**
   * Clears product interests
   */
  clearProductInterests(): void {
    this.store.dispatch(new fromStore.ClearProductInterests());
  }

  getBackInStockSubscribed(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getBackInStockState));
  }

  loadBackInStockSubscribed(
    userId: string,
    productCode: string,
    notificationType: string
  ): void {
    this.store.dispatch(
      new fromStore.LoadBackInStock({
        userId: userId,
        productCode: productCode,
        notificationType: notificationType,
      })
    );
  }

  deleteBackInStock(
    userId: string,
    productCode: string,
    notificationType: string
  ): void {
    this.store.dispatch(
      new fromStore.DeleteBackInStock({
        userId: userId,
        productCode: productCode,
        notificationType: notificationType,
      })
    );
  }

  createBackInStock(
    userId: string,
    productCode: string,
    notificationType: string
  ): void {
    this.store.dispatch(
      new fromStore.CreateBackInStock({
        userId: userId,
        productCode: productCode,
        notificationType: notificationType,
      })
    );
  }

  resetBackInStock(): void {
    this.store.dispatch(new fromStore.ResetBackInStock());
  }

  getDeleteBackInStockSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(DELETE_BACK_IN_STOCK_PROCESS_ID))
    );
  }

  getDeleteBackInStockLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(DELETE_BACK_IN_STOCK_PROCESS_ID))
    );
  }

  getCreateBackInStockSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(CREATE_BACK_IN_STOCK_PROCESS_ID))
    );
  }

  resetDeleteState(): void {
    this.store.dispatch(new fromStore.ResetDeleteAction());
  }

  resetCreateState(): void {
    this.store.dispatch(new fromStore.ResetCreateAction());
  }
}
