import { Params } from '@angular/router';
import { OrderEntry } from '@spartacus/cart/base/root';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import * as i0 from "@angular/core";
export declare class ConfigureCartEntryComponent {
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    cartEntry: OrderEntry;
    readOnly: boolean;
    msgBanner: boolean;
    disabled: boolean;
    /**
     * Verifies whether the entry has any issues.
     *
     * @returns - whether there are any issues
     */
    hasIssues(): boolean;
    /**
     * Verifies whether the cart entry has an order code and returns a corresponding owner type.
     *
     * @returns - an owner type
     */
    getOwnerType(): CommonConfigurator.OwnerType;
    /**
     * Verifies whether the cart entry has an order code, retrieves a composed owner ID
     * and concatenates a corresponding entry number.
     *
     * @returns - an entry key
     */
    getEntityKey(): string;
    /**
     * Retrieves a corresponding route depending whether the configuration is read only or not.
     *
     * @returns - a route
     */
    getRoute(): string;
    /**
     * Retrieves the state of the configuration.
     *
     *  @returns - 'true' if the configuration is read only, otherwise 'false'
     */
    getDisplayOnly(): boolean;
    /**
     * Verifies whether the link to the configuration is disabled.
     *
     *  @returns - 'true' if the the configuration is not read only, otherwise 'false'
     */
    isDisabled(): boolean;
    /**
     * Retrieves the additional resolve issues accessibility description.
     *
     * @returns - If there is a 'resolve issues' link, the ID to the element with additional description will be returned.
     */
    getResolveIssuesA11yDescription(): string | undefined;
    /**
     * Compiles query parameters for the router link. 'resolveIssues' is only set if the component is
     * rendered in the context of the message banner, and if issues exist at all
     * @returns Query parameters
     */
    getQueryParams(): Params;
    constructor(commonConfigUtilsService: CommonConfiguratorUtilsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigureCartEntryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfigureCartEntryComponent, "cx-configure-cart-entry", never, { "cartEntry": "cartEntry"; "readOnly": "readOnly"; "msgBanner": "msgBanner"; "disabled": "disabled"; }, {}, never, never, false, never>;
}
