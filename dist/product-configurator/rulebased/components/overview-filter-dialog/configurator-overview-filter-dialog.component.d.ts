import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewFilterDialogComponent {
    protected launchDialogService: LaunchDialogService;
    constructor(launchDialogService: LaunchDialogService);
    config$: import("rxjs").Observable<any>;
    iconTypes: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    /**
     * closes the filter modal
     */
    closeFilterModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewFilterDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewFilterDialogComponent, "cx-configurator-overview-filter-dialog", never, {}, {}, never, never, false, never>;
}
