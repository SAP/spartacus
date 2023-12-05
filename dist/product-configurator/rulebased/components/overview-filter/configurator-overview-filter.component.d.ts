import { OnChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewFilterComponent implements OnChanges {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    constructor(configuratorCommonsService: ConfiguratorCommonsService);
    showFilterBar: boolean;
    config: Configurator.ConfigurationWithOverview;
    priceFilter: UntypedFormControl;
    mySelectionsFilter: UntypedFormControl;
    groupFilters: UntypedFormControl[];
    ngOnChanges(): void;
    /**
     * Updates the overview based on the filters currently selected in the UI
     *
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onFilter(config: Configurator.ConfigurationWithOverview): void;
    protected extractGroupFilterState(configuration: Configurator.ConfigurationWithOverview): void;
    protected extractAttrFilterState(configuration: Configurator.ConfigurationWithOverview): void;
    protected collectGroupFilters(overview: Configurator.Overview): string[];
    protected collectAttrFilters(): Configurator.OverviewFilter[];
    protected createInputConfig(config: Configurator.ConfigurationWithOverview, attrFilters: Configurator.OverviewFilter[], groupFilers: string[]): Configurator.ConfigurationWithOverview;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewFilterComponent, "cx-configurator-overview-filter", never, { "showFilterBar": "showFilterBar"; "config": "config"; }, {}, never, never, false, never>;
}
