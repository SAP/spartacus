import { AsmCustomer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { Cart } from '@spartacus/cart/base/root';
import { UrlCommand, User } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { ReplaySubject, Subject } from 'rxjs';
import { AsmCustomer360SectionContext } from './asm-customer-360-section-context.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360SectionContextSource<Data> extends AsmCustomer360SectionContext<Data> {
    readonly customer$: ReplaySubject<User>;
    readonly config$: ReplaySubject<AsmCustomer360SectionConfig>;
    readonly navigate$: Subject<UrlCommand>;
    readonly data$: ReplaySubject<Data>;
    readonly savedCarts$: ReplaySubject<Cart[]>;
    readonly activeCart$: ReplaySubject<Cart>;
    readonly orderHistory$: ReplaySubject<OrderHistoryList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360SectionContextSource<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomer360SectionContextSource<any>>;
}
