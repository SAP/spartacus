import { Product, ProductService, RoutingService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorRestartDialogComponent {
    protected launchDialogService: LaunchDialogService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected routingService: RoutingService;
    protected productService: ProductService;
    constructor(launchDialogService: LaunchDialogService, configuratorCommonsService: ConfiguratorCommonsService, routingService: RoutingService, productService: ProductService);
    dialogData$: Observable<{
        owner: CommonConfigurator.Owner;
    }>;
    product$: Observable<Product | undefined>;
    iconTypes: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    /**
     * Closes the dialog
     */
    close(): void;
    /**
     * Resume with current configuration
     * @param product owning this configuration
     */
    resume(product: Product): void;
    /**
     * Discards current configuration and requests a new default configuration
     * @param owner owner of the current configuration that will be reused for next configuration
     */
    restart(owner: CommonConfigurator.Owner): void;
    /**
     * Navigates back to product detail page without making a decision
     * @param product owning this configuration
     */
    backToPDP(product: Product): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorRestartDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorRestartDialogComponent, "cx-configurator-restart-dialog", never, {}, {}, never, never, false, never>;
}
