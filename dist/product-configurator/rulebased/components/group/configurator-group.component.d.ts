import { LanguageService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfigFormUpdateEvent } from '../form/configurator-form.event';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorGroupComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected languageService: LanguageService;
    protected configUtils: ConfiguratorStorefrontUtilsService;
    protected configExpertModeService: ConfiguratorExpertModeService;
    protected readonly typePrefix = "AttributeType_";
    group: Configurator.Group;
    owner: CommonConfigurator.Owner;
    isNavigationToGroupEnabled: boolean;
    activeLanguage$: Observable<string>;
    uiType: typeof Configurator.UiType;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, languageService: LanguageService, configUtils: ConfiguratorStorefrontUtilsService, configExpertModeService: ConfiguratorExpertModeService);
    /**
     * Updates a configuration, specified by the configuration form update event.
     *
     * @param {ConfigFormUpdateEvent} event - Configuration form update event
     */
    updateConfiguration(event: ConfigFormUpdateEvent): void;
    /**
     * Verifies whether the current group type is conflict one.
     *
     * @param {Configurator.GroupType | undefined} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType: Configurator.GroupType | undefined): boolean;
    /**
     * Display group description box only for conflict groups with a given group name (i.e. a conflict description)
     *
     * @param {Configurator.Group} group - Group
     * @returns {boolean} - 'True' if conflict description box should be displayed, otherwise 'false'.
     */
    displayConflictDescription(group: Configurator.Group): boolean;
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId?: string): string | undefined;
    /**
     * Retrieves information whether the expert mode is active.
     *
     * @returns {Observable<boolean> | undefined } - 'True' if the expert mode is active, otherwise 'false'.
     */
    get expMode(): Observable<boolean>;
    getComponentKey(attribute: Configurator.Attribute): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorGroupComponent, "cx-configurator-group", never, { "group": "group"; "owner": "owner"; "isNavigationToGroupEnabled": "isNavigationToGroupEnabled"; }, {}, never, never, false, never>;
}
