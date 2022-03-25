import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { CustomerCouponSearchResult } from '../../model/customer-coupon.model';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  CLAIM_CUSTOMER_COUPON_PROCESS_ID,
  StateWithUser,
  SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
  UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
} from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class CustomerCouponService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Retrieves customer's coupons
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadCustomerCoupons(
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.LoadCustomerCoupons({
          userId,
          pageSize: pageSize,
          currentPage: currentPage,
          sort: sort,
        })
      );
    });
  }

  /**
   * Returns customer coupon search result
   * @param pageSize page size
   */
  getCustomerCoupons(pageSize: number): Observable<CustomerCouponSearchResult> {
    return combineLatest([
      this.store.pipe(select(UsersSelectors.getCustomerCouponsState)),
      this.getClaimCustomerCouponResultLoading(),
    ]).pipe(
      filter(([, loading]) => !loading),
      tap(([customerCouponsState]) => {
        const attemptedLoad =
          customerCouponsState.loading ||
          customerCouponsState.success ||
          customerCouponsState.error;
        if (!attemptedLoad) {
          this.loadCustomerCoupons(pageSize);
        }
      }),
      map(([customerCouponsState]) => customerCouponsState.value)
    );
  }

  /**
   * Returns a loaded flag for customer coupons
   */
  getCustomerCouponsLoaded(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getCustomerCouponsLoaded));
  }

  /**
   * Returns a loading flag for customer coupons
   */
  getCustomerCouponsLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getCustomerCouponsLoading));
  }

  /**
   * Subscribe a CustomerCoupon Notification
   * @param couponCode a customer coupon code
   */
  subscribeCustomerCoupon(couponCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.SubscribeCustomerCoupon({
          userId,
          couponCode: couponCode,
        })
      );
    });
  }

  /**
   * Returns the subscribe customer coupon notification process loading flag
   */
  getSubscribeCustomerCouponResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID))
    );
  }

  /**
   * Returns the subscribe customer coupon notification process success flag
   */
  getSubscribeCustomerCouponResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID))
    );
  }

  /**
   * Returns the subscribe customer coupon notification process error flag
   */
  getSubscribeCustomerCouponResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID))
    );
  }

  /**
   * Unsubscribe a CustomerCoupon Notification
   * @param couponCode a customer coupon code
   */
  unsubscribeCustomerCoupon(couponCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.UnsubscribeCustomerCoupon({
          userId,
          couponCode: couponCode,
        })
      );
    });
  }

  /**
   * Returns the unsubscribe customer coupon notification process loading flag
   */
  getUnsubscribeCustomerCouponResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID))
    );
  }

  /**
   * Returns the unsubscribe customer coupon notification process success flag
   */
  getUnsubscribeCustomerCouponResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID))
    );
  }

  /**
   * Returns the unsubscribe customer coupon notification process error flag
   */
  getUnsubscribeCustomerCouponResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID))
    );
  }

  /**
   * Claim a CustomerCoupon
   * @param couponCode a customer coupon code
   */
  claimCustomerCoupon(couponCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.ClaimCustomerCoupon({
          userId,
          couponCode,
        })
      );
    });
  }

  /**
   * Returns the claim customer coupon notification process success flag
   */
  getClaimCustomerCouponResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(CLAIM_CUSTOMER_COUPON_PROCESS_ID))
    );
  }

  /**
   * Returns the claim customer coupon notification process loading flag
   */
  getClaimCustomerCouponResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(CLAIM_CUSTOMER_COUPON_PROCESS_ID))
    );
  }
}
