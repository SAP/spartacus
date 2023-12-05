import { Observable } from 'rxjs';
import { CustomerCoupon2Customer, CustomerCouponNotification, CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { CustomerCouponAdapter } from './customer-coupon.adapter';
import * as i0 from "@angular/core";
export declare class CustomerCouponConnector {
    protected adapter: CustomerCouponAdapter;
    constructor(adapter: CustomerCouponAdapter);
    getCustomerCoupons(userId: string, pageSize: number, currentPage?: number, sort?: string): Observable<CustomerCouponSearchResult>;
    turnOnNotification(userId: string, couponCode: string): Observable<CustomerCouponNotification>;
    turnOffNotification(userId: string, couponCode: string): Observable<{}>;
    claimCustomerCoupon(userId: string, couponCode: string): Observable<CustomerCoupon2Customer>;
    disclaimCustomerCoupon(userId: string, couponCode: string): Observable<CustomerCoupon2Customer>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerCouponConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerCouponConnector>;
}
