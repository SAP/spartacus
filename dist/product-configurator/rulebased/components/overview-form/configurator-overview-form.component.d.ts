import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewFormComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
    ghostStyle: boolean;
    attributeOverviewType: typeof Configurator.AttributeOverviewType;
    configuration$: Observable<Configurator.Configuration>;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService, configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService);
    /**
     * Does the configuration contain any selected attribute values?
     * @param {Configurator.Configuration} configuration - Current configuration
     * @returns {boolean} - Any attributes available
     */
    hasAttributes(configuration: Configurator.Configuration): boolean;
    protected hasGroupWithAttributes(groups?: Configurator.GroupOverview[]): boolean;
    /**
     * Verifies whether the next or the previous attributes are same.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {boolean} - 'True' if it is the same attribute, otherwise 'false'
     */
    isSameAttribute(attributes: Configurator.AttributeOverview[], index: number): boolean;
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {string} - corresponding style class
     */
    getStyleClasses(attributes: Configurator.AttributeOverview[], index: number): string;
    /**
     * Retrieves the styling for the group levels.
     *
     * @param {number} level - Group level. 1 is top level.
     * @param {Configurator.GroupOverview[]} subGroups - subgroups array
     * @return {string} - corresponding style classes
     */
    getGroupLevelStyleClasses(level: number, subGroups: Configurator.GroupOverview[] | undefined): string;
    /**
     * Retrieves a unique prefix ID.
     *
     * @param {string | undefined} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - prefix ID
     */
    getPrefixId(idPrefix: string | undefined, groupId: string): string;
    /**
     * Retrieves the ids for the overview group headers
     *
     * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} groupId - local group id
     * @return {string} - unique group id
     */
    getGroupId(idPrefix: string, groupId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewFormComponent, "cx-configurator-overview-form", never, {}, {}, never, never, false, never>;
}
