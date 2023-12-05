import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { CustomerCouponConnector } from '../../connectors/customer-coupon/customer-coupon.connector';
import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';
import * as i0 from "@angular/core";
export declare class CustomerCouponEffects {
    private actions$;
    private customerCouponConnector;
    protected logger: LoggerService;
    loadCustomerCoupons$: Observable<fromCustomerCouponsAction.CustomerCouponAction>;
    subscribeCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction>;
    unsubscribeCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction>;
    claimCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction>;
    disclaimCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction>;
    constructor(actions$: Actions, customerCouponConnector: CustomerCouponConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerCouponEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerCouponEffects>;
}
