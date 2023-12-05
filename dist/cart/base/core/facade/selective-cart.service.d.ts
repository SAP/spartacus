import { Cart, MultiCartFacade, OrderEntry, SelectiveCartFacade } from '@spartacus/cart/base/root';
import { BaseSiteService, UserIdService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SelectiveCartService implements SelectiveCartFacade {
    protected userProfileFacade: UserProfileFacade;
    protected multiCartFacade: MultiCartFacade;
    protected baseSiteService: BaseSiteService;
    protected userIdService: UserIdService;
    protected selectiveCart$: Observable<Cart>;
    constructor(userProfileFacade: UserProfileFacade, multiCartFacade: MultiCartFacade, baseSiteService: BaseSiteService, userIdService: UserIdService);
    /**
     * Initialize the stream when first call this function
     */
    getCart(): Observable<Cart>;
    getEntries(): Observable<OrderEntry[]>;
    isStable(): Observable<boolean>;
    addEntry(productCode: string, quantity: number): void;
    removeEntry(entry: OrderEntry): void;
    updateEntry(entryNumber: number, quantity: number): void;
    getEntry(productCode: string): Observable<OrderEntry | undefined>;
    protected getSelectiveCartId(): Observable<string>;
    private getSelectiveIdWithUserId;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectiveCartService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SelectiveCartService>;
}
