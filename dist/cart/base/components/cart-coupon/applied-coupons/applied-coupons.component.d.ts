import { CartVoucherFacade, Voucher } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class AppliedCouponsComponent {
    protected cartVoucherService: CartVoucherFacade;
    vouchers: Voucher[];
    cartIsLoading: boolean;
    isReadOnly: boolean;
    iconTypes: typeof ICON_TYPE;
    constructor(cartVoucherService: CartVoucherFacade);
    get sortedVouchers(): Voucher[];
    removeVoucher(voucherId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppliedCouponsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AppliedCouponsComponent, "cx-applied-coupons", never, { "vouchers": "vouchers"; "cartIsLoading": "cartIsLoading"; "isReadOnly": "isReadOnly"; }, {}, never, never, false, never>;
}
