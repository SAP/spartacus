import { ActionsSubject } from '@ngrx/store';
import { ProductImportInfo } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartActions } from '../store/actions';
import * as i0 from "@angular/core";
export declare class ProductImportInfoService {
    protected actionsSubject: ActionsSubject;
    protected logger: LoggerService;
    protected constructor(actionsSubject: ActionsSubject);
    /**
     * Get emission of add entry results from actions subject
     *
     * @param {string} cartId
     * @returns {Observable<ProductImportInfo>}
     */
    getResults(cartId: string): Observable<ProductImportInfo>;
    /**
     * Map actions to summary messages
     *
     * @param {CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail} action
     * @returns ProductImportInfo
     */
    protected mapMessages(action: CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail): ProductImportInfo;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImportInfoService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductImportInfoService>;
}
