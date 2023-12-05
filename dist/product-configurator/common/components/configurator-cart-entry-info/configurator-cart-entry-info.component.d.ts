import { UntypedFormControl } from '@angular/forms';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorCartEntryInfoComponent {
    protected cartItemContext: CartItemContext;
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    constructor(cartItemContext: CartItemContext, commonConfigUtilsService: CommonConfiguratorUtilsService);
    readonly orderEntry$: Observable<OrderEntry>;
    readonly quantityControl$: Observable<UntypedFormControl>;
    readonly readonly$: Observable<boolean>;
    readonly shouldShowButton$: Observable<boolean>;
    /**
     * Verifies whether the configuration infos have any entries and the first entry has a status.
     * Only in this case we want to display the configuration summary
     *
     * @param {OrderEntry} item - Cart item
     * @returns {boolean} - whether the status of configuration infos entry has status
     */
    hasStatus(item: OrderEntry): boolean;
    /**
     * Verifies whether the configurator type is attribute based one.
     *
     * @param {OrderEntry} item - Order entry item
     * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
     */
    isAttributeBasedConfigurator(item: OrderEntry): boolean;
    getHiddenConfigurationInfoId(index: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorCartEntryInfoComponent, [{ optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorCartEntryInfoComponent, "cx-configurator-cart-entry-info", never, {}, {}, never, never, false, never>;
}
