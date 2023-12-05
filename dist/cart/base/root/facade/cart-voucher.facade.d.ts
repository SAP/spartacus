import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class CartVoucherFacade {
    abstract addVoucher(voucherId: string, cartId?: string): void;
    abstract removeVoucher(voucherId: string, cartId?: string): void;
    /**
     * Get add voucher process error flag
     */
    abstract getAddVoucherResultError(): Observable<boolean>;
    /**
     * Get add voucher process success flag
     */
    abstract getAddVoucherResultSuccess(): Observable<boolean>;
    /**
     * Get add voucher process loading flag
     */
    abstract getAddVoucherResultLoading(): Observable<boolean>;
    /**
     * Reset add voucher process
     */
    abstract resetAddVoucherProcessingState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartVoucherFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartVoucherFacade>;
}
