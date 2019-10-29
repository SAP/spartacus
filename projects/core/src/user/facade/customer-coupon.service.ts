import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  StateWithUser,
  SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
  UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
  CLAIM_CUSTOMER_COUPON_PROCESS_ID,
} from '../store/user-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { CustomerCouponSearchResult } from '../../model/customer-coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerCouponService {
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    // tslint:disable-next-line:unified-signatures
    authService: AuthService
  );

  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService?: AuthService
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
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.LoadCustomerCoupons({
            userId: occUserId,
            pageSize: pageSize,
            currentPage: currentPage,
            sort: sort,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Returns customer coupon search result
   * @param pageSize page size
   */
  getCustomerCoupons(pageSize: number): Observable<CustomerCouponSearchResult> {
    return this.store.pipe(
      select(UsersSelectors.getCustomerCouponsState),
      tap(customerCouponsState => {
        const attemptedLoad =
          customerCouponsState.loading ||
          customerCouponsState.success ||
          customerCouponsState.error;
        if (!attemptedLoad) {
          this.loadCustomerCoupons(pageSize);
        }
      }),
      map(customerCouponsState => customerCouponsState.value)
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
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.SubscribeCustomerCoupon({
            userId: occUserId,
            couponCode: couponCode,
          })
        )
      )
      .unsubscribe();
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
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.UnsubscribeCustomerCoupon({
            userId: occUserId,
            couponCode: couponCode,
          })
        )
      )
      .unsubscribe();
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
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.ClaimCustomerCoupon({
            userId: occUserId,
            couponCode: couponCode,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Returns the claim customer coupon notification process success flag
   */
  getClaimCustomerCouponResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(CLAIM_CUSTOMER_COUPON_PROCESS_ID))
    );
  }
}
