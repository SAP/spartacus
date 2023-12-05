import { Store } from '@ngrx/store';
import { ActiveCartFacade, CartVoucherFacade } from '@spartacus/cart/base/root';
import { StateWithProcess, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartVoucherService implements CartVoucherFacade {
    protected store: Store<StateWithProcess<void>>;
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithProcess<void>>, activeCartFacade: ActiveCartFacade, userIdService: UserIdService);
    addVoucher(voucherId: string, cartId?: string): void;
    removeVoucher(voucherId: string, cartId?: string): void;
    /**
     * Get add voucher process error flag
     */
    getAddVoucherResultError(): Observable<boolean>;
    /**
     * Get add voucher process success flag
     */
    getAddVoucherResultSuccess(): Observable<boolean>;
    /**
     * Get add voucher process loading flag
     */
    getAddVoucherResultLoading(): Observable<boolean>;
    /**
     * Reset add voucher process
     */
    resetAddVoucherProcessingState(): void;
    private combineUserAndCartId;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartVoucherService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartVoucherService>;
}
