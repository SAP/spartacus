import { Actions } from '@ngrx/effects';
import { GlobalMessageService, LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartVoucherConnector } from '../../connectors/voucher/cart-voucher.connector';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class CartVoucherEffects {
    private actions$;
    private cartVoucherConnector;
    private messageService;
    protected logger: LoggerService;
    constructor(actions$: Actions, cartVoucherConnector: CartVoucherConnector, messageService: GlobalMessageService);
    addCartVoucher$: Observable<CartActions.CartVoucherAction | CartActions.LoadCart | CartActions.CartProcessesDecrement>;
    removeCartVoucher$: Observable<CartActions.CartVoucherAction | CartActions.LoadCart>;
    private showGlobalMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartVoucherEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartVoucherEffects>;
}
