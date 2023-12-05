import { UntypedFormControl } from '@angular/forms';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorIssuesNotificationComponent {
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    protected cartItemContext: CartItemContext;
    iconTypes: typeof ICON_TYPE;
    constructor(commonConfigUtilsService: CommonConfiguratorUtilsService, cartItemContext: CartItemContext);
    readonly orderEntry$: Observable<OrderEntry>;
    readonly quantityControl$: Observable<UntypedFormControl>;
    readonly readonly$: Observable<boolean>;
    readonly shouldShowButton$: Observable<boolean>;
    /**
     * Verifies whether the item has any issues.
     *
     * @param item - Cart item
     * @returns - whether there are any issues
     */
    hasIssues(item: OrderEntry): boolean;
    /**
     * Retrieves the number of issues at the cart item.
     *
     * @param item - Cart item
     * @returns - the number of issues at the cart item
     */
    getNumberOfIssues(item: OrderEntry): number;
    /**
     * Retrieves the unique id for the error message.
     *
     * @param item - Cart item
     * @returns - Unique id for error message
     */
    getErrorMessageId(item: OrderEntry): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorIssuesNotificationComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorIssuesNotificationComponent, "cx-configurator-issues-notification", never, {}, {}, never, never, false, never>;
}
