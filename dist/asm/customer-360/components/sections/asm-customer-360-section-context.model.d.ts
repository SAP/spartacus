import { AsmCustomer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { Cart } from '@spartacus/cart/base/root';
import { UrlCommand, User } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { Observable, Observer } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class AsmCustomer360SectionContext<Data> {
    readonly customer$: Observable<User>;
    readonly config$: Observable<AsmCustomer360SectionConfig>;
    readonly navigate$: Observer<UrlCommand>;
    readonly data$: Observable<Data>;
    readonly savedCarts$: Observable<Array<Cart>>;
    readonly activeCart$: Observable<Cart>;
    readonly orderHistory$: Observable<OrderHistoryList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360SectionContext<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomer360SectionContext<any>>;
}
