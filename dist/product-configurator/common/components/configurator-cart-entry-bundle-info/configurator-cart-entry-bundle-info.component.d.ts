import { UntypedFormControl } from '@angular/forms';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import { ConfiguratorCartEntryBundleInfoService } from './configurator-cart-entry-bundle-info.service';
import * as i0 from "@angular/core";
/**
 * Requires default change detection strategy, as the disabled state of the quantity from control may change,
 * which would not be proper detected with onPush strategy.
 */
export declare class ConfiguratorCartEntryBundleInfoComponent {
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    protected configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService;
    protected breakpointService: BreakpointService;
    protected translation: TranslationService;
    protected cartItemContext?: CartItemContext | undefined;
    constructor(commonConfigUtilsService: CommonConfiguratorUtilsService, configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService, breakpointService: BreakpointService, translation: TranslationService, cartItemContext?: CartItemContext | undefined);
    readonly orderEntry$: Observable<OrderEntry>;
    readonly quantityControl$: Observable<UntypedFormControl>;
    readonly readonly$: Observable<boolean>;
    hideItems: boolean;
    lineItems$: Observable<LineItem[]>;
    numberOfLineItems$: Observable<number>;
    /**
     * Toggles the state of the items list.
     */
    toggleItems(): void;
    /**
     * Verifies whether the configurator type is a bundle based one.
     *
     * @param {OrderEntry} entry - Order entry
     * @returns {boolean} - 'true' if the expected configurator type, otherwise 'false'
     */
    isBundleBasedConfigurator(entry: OrderEntry): boolean;
    readonly shouldShowButton$: Observable<boolean>;
    getButtonText(translatedText?: string): string;
    getItemsMsg(items: number): string;
    getHiddenItemInfo(item: LineItem): string;
    getHiddenItemInfoId(index: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorCartEntryBundleInfoComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorCartEntryBundleInfoComponent, "cx-configurator-cart-entry-bundle-info", never, {}, {}, never, never, false, never>;
}
