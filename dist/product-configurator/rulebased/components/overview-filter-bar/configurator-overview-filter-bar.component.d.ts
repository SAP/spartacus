import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewFilterBarComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    constructor(configuratorCommonsService: ConfiguratorCommonsService);
    config: Configurator.ConfigurationWithOverview;
    iconTypes: typeof ICON_TYPE;
    attributeFilterTypes: typeof Configurator.OverviewFilter;
    /**
     * gets the description for the given group id
     *
     * @param {string} groupId groupId
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    getGroupFilterDescription(overview: Configurator.Overview, groupId: string): string;
    /**
     * removes the given attribute filter and updates the configuration overview accordingly
     *
     * @param {Configurator.OverviewFilter} attrToRemove attribute filter to remove
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onAttrFilterRemove(config: Configurator.ConfigurationWithOverview, attrToRemove: Configurator.OverviewFilter): void;
    /**
     * removes the given group filter and updates the configuration overview accordingly
     *
     * @param {string} groupIdToRemove id of the group to be removed from filtering
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onGroupFilterRemove(config: Configurator.ConfigurationWithOverview, groupIdToRemove: string): void;
    /**
     * check whether the button to remove all filters should be shown
     *
     * @param {Configurator.Overview} overview - current configuration overview data
     * @returns {boolean} - 'true' only if the button to remove all filters should be shown
     */
    isShowRemoveAll(overview: Configurator.Overview): boolean;
    /**
     * removes all filters and updates the configuration overview accordingly
     *
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onRemoveAll(config: Configurator.ConfigurationWithOverview): void;
    protected getInputFilters(overview: Configurator.Overview): [Configurator.OverviewFilter[], string[]];
    protected createInputConfig(config: Configurator.ConfigurationWithOverview, attrFilters: Configurator.OverviewFilter[], groupFilers: string[]): Configurator.ConfigurationWithOverview;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewFilterBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewFilterBarComponent, "cx-configurator-overview-filter-bar", never, { "config": "config"; }, {}, never, never, false, never>;
}
