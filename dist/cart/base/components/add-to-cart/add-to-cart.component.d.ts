import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActiveCartFacade, CartItemComponentOptions, CartOutlets, CartUiEventAddToCart } from '@spartacus/cart/base/root';
import { CmsAddToCartComponent, EventService, Product } from '@spartacus/core';
import { CmsComponentData, CurrentProductService, ICON_TYPE, ProductListItemContext } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AddToCartComponent implements OnInit, OnDestroy {
    protected currentProductService: CurrentProductService;
    protected cd: ChangeDetectorRef;
    protected activeCartService: ActiveCartFacade;
    protected component: CmsComponentData<CmsAddToCartComponent>;
    protected eventService: EventService;
    protected productListItemContext?: ProductListItemContext | undefined;
    productCode: string;
    showQuantity: boolean;
    options: CartItemComponentOptions;
    pickupStore: string | undefined;
    /**
     * As long as we do not support #5026, we require product input, as we need
     *  a reference to the product model to fetch the stock data.
     */
    product: Product;
    maxQuantity: number;
    hasStock: boolean;
    inventoryThreshold: boolean;
    showInventory$: Observable<boolean | undefined> | undefined;
    quantity: number;
    subscription: Subscription;
    addToCartForm: UntypedFormGroup;
    readonly CartOutlets: typeof CartOutlets;
    pickupOptionCompRef: any;
    iconTypes: typeof ICON_TYPE;
    constructor(currentProductService: CurrentProductService, cd: ChangeDetectorRef, activeCartService: ActiveCartFacade, component: CmsComponentData<CmsAddToCartComponent>, eventService: EventService, productListItemContext?: ProductListItemContext | undefined);
    ngOnInit(): void;
    protected setStockInfo(product: Product): void;
    /**
     * In specific scenarios, we need to omit displaying the stock level or append a plus to the value.
     * When backoffice forces a product to be in stock, omit showing the stock level.
     * When product stock level is limited by a threshold value, append '+' at the end.
     * When out of stock, display no numerical value.
     */
    getInventory(): string;
    updateCount(value: number): void;
    addToCart(): void;
    protected createCartUiEventAddToCart(productCode: string, quantity: number, numberOfEntriesBeforeAdd: number, storeName?: string): CartUiEventAddToCart;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddToCartComponent, [null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddToCartComponent, "cx-add-to-cart", never, { "productCode": "productCode"; "showQuantity": "showQuantity"; "options": "options"; "pickupStore": "pickupStore"; "product": "product"; }, {}, never, never, false, never>;
}
