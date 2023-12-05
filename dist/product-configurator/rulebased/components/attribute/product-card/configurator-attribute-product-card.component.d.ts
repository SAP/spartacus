import { EventEmitter, OnInit } from '@angular/core';
import { Product, ProductService, TranslationService } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, KeyboardFocusService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configurator } from '../../../core/model/configurator.model';
import { QuantityUpdateEvent } from '../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export interface ConfiguratorAttributeProductCardComponentOptions {
    /** If set to `true`, all action buttons will be disabled.  */
    disableAllButtons?: boolean;
    /** If set to `true`, the remove/deselect button won't be available. Useful for required attributes,
     *  where a deselect/remove of last value shall not be possible.  */
    hideRemoveButton?: boolean;
    fallbackFocusId?: string;
    multiSelect?: boolean;
    productBoundValue: Configurator.Value;
    singleDropdown?: boolean;
    withQuantity?: boolean;
    /**
     * Used to indicate loading state, for example in case a request triggered by parent component to CPQ is currently in progress.
     * Component will react on it and disable all controls that could cause a request.
     * This prevents the user from triggering concurrent requests with potential conflicting content that might cause unexpected behaviour.
     */
    loading$?: Observable<boolean>;
    attributeId: number;
    attributeLabel?: string;
    attributeName?: string;
    itemCount: number;
    itemIndex: number;
}
export declare class ConfiguratorAttributeProductCardComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected productService: ProductService;
    protected keyBoardFocus: KeyboardFocusService;
    protected translation: TranslationService;
    product$: Observable<Product>;
    loading$: BehaviorSubject<boolean>;
    showDeselectionNotPossible: boolean;
    productCardOptions: ConfiguratorAttributeProductCardComponentOptions;
    handleDeselect: EventEmitter<string>;
    handleQuantity: EventEmitter<QuantityUpdateEvent>;
    handleSelect: EventEmitter<string>;
    constructor(productService: ProductService, keyBoardFocus: KeyboardFocusService, translation: TranslationService);
    iconType: typeof ICON_TYPE;
    ngOnInit(): void;
    get showQuantity(): boolean;
    get attributeName(): string;
    get focusConfig(): FocusConfig;
    onHandleSelect(): void;
    onHandleDeselect(): void;
    onChangeQuantity(eventObject: any): void;
    /**
     * Verifies whether the product card refers to a selected value
     * @return {boolean} - Selected?
     */
    isProductCardSelected(): boolean;
    /**
     * Checks if price needs to be displayed. This is the
     * case if either value price, quantity or value price total
     * are present
     * @return {boolean} - Price display?
     */
    hasPriceDisplay(): boolean;
    /**
     * Extract corresponding price formula parameters
     *
     *  @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions;
    /**
     *  Extract corresponding quantity parameters
     *
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions;
    /**
     * Verifies whether the value code is defined.
     *
     * @param {string} valueCode - Value code
     * @return {boolean} - 'true' if the value code is defined, otherwise 'false'
     */
    isValueCodeDefined(valueCode: string | null | undefined): boolean;
    protected transformToProductType(value: Configurator.Value | undefined): Product;
    protected onHandleQuantity(quantity: number): void;
    showDeselectionNotPossibleMessage(): void;
    getAriaLabelSingleUnselected(product: Product): string;
    getAriaLabelSingleSelected(product: Product): string;
    getAriaLabelSingleSelectedNoButton(product: Product): string;
    getAriaLabelMultiSelected(product: Product): string;
    getAriaLabelMultiUnselected(product: Product): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeProductCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeProductCardComponent, "cx-configurator-attribute-product-card", never, { "productCardOptions": "productCardOptions"; }, { "handleDeselect": "handleDeselect"; "handleQuantity": "handleQuantity"; "handleSelect": "handleSelect"; }, never, never, false, never>;
}
