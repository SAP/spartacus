import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActiveCartFacade, CartItemComponentOptions, MultiCartFacade, OrderEntry, PromotionLocation, SelectiveCartFacade, CartOutlets } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
interface ItemListContext {
    readonly?: boolean;
    hasHeader?: boolean;
    options?: CartItemComponentOptions;
    cartId?: string;
    items?: OrderEntry[];
    promotionLocation?: PromotionLocation;
    cartIsLoading?: boolean;
}
export declare class CartItemListComponent implements OnInit, OnDestroy {
    protected activeCartService: ActiveCartFacade;
    protected selectiveCartService: SelectiveCartFacade;
    protected userIdService: UserIdService;
    protected multiCartService: MultiCartFacade;
    protected cd: ChangeDetectorRef;
    protected outlet?: OutletContextData<ItemListContext> | undefined;
    protected subscription: Subscription;
    protected userId: string;
    readonly: boolean;
    hasHeader: boolean;
    options: CartItemComponentOptions;
    cartId: string;
    protected _items: OrderEntry[];
    form: UntypedFormGroup;
    set items(items: OrderEntry[]);
    get items(): OrderEntry[];
    promotionLocation: PromotionLocation;
    set setLoading(value: boolean);
    readonly CartOutlets: typeof CartOutlets;
    constructor(activeCartService: ActiveCartFacade, selectiveCartService: SelectiveCartFacade, userIdService: UserIdService, multiCartService: MultiCartFacade, cd: ChangeDetectorRef, outlet?: OutletContextData<ItemListContext> | undefined);
    ngOnInit(): void;
    protected getInputsFromContext(): Subscription | undefined;
    /**
     * Resolves items passed to component input and updates 'items' field
     */
    protected resolveItems(items: OrderEntry[]): void;
    protected normalizeConsignmentEntries(items: OrderEntry[]): void;
    /**
     * We'd like to avoid the unnecessary re-renders of unchanged cart items after the data reload.
     * OCC cart entries don't have any unique identifier that we could use in Angular `trackBy`.
     * So we update each array element to the new object only when it's any different to the previous one.
     */
    protected rerenderChangedItems(items: OrderEntry[]): void;
    /**
     * Creates form models for list items
     */
    protected createForm(): void;
    protected getControlName(item: OrderEntry): string;
    removeEntry(item: OrderEntry): void;
    getControl(item: OrderEntry): Observable<UntypedFormGroup> | undefined;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartItemListComponent, [null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartItemListComponent, "cx-cart-item-list", never, { "readonly": "readonly"; "hasHeader": "hasHeader"; "options": "options"; "cartId": "cartId"; "items": "items"; "promotionLocation": "promotionLocation"; "setLoading": "cartIsLoading"; }, {}, never, never, false, never>;
}
export {};
