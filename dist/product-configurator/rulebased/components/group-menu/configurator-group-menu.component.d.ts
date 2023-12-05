import { ElementRef, QueryList } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { DirectionService, HamburgerMenuService, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorGroupMenuService } from './configurator-group-menu.component.service';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorGroupMenuComponent {
    protected configCommonsService: ConfiguratorCommonsService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected hamburgerMenuService: HamburgerMenuService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configUtils: ConfiguratorStorefrontUtilsService;
    protected configGroupMenuService: ConfiguratorGroupMenuService;
    protected directionService: DirectionService;
    protected translation: TranslationService;
    protected configExpertModeService: ConfiguratorExpertModeService;
    groups: QueryList<ElementRef<HTMLElement>>;
    routerData$: Observable<ConfiguratorRouter.Data>;
    configuration$: Observable<Configurator.Configuration>;
    currentGroup$: Observable<Configurator.Group>;
    /**
     * Current parent group. Undefined for top level groups
     */
    displayedParentGroup$: Observable<Configurator.Group | undefined>;
    displayedGroups$: Observable<Configurator.Group[]>;
    iconTypes: typeof ICON_TYPE;
    ERROR: string;
    COMPLETE: string;
    WARNING: string;
    ICON: string;
    constructor(configCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, hamburgerMenuService: HamburgerMenuService, configRouterExtractorService: ConfiguratorRouterExtractorService, configUtils: ConfiguratorStorefrontUtilsService, configGroupMenuService: ConfiguratorGroupMenuService, directionService: DirectionService, translation: TranslationService, configExpertModeService: ConfiguratorExpertModeService);
    click(group: Configurator.Group): void;
    navigateUp(): void;
    /**
     * Retrieves the number of conflicts for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {string} - number of conflicts
     */
    getConflictNumber(group: Configurator.Group): string;
    /**
     * Verifies whether the current group has subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - Returns 'true' if the current group has a subgroups, otherwise 'false'.
     */
    hasSubGroups(group: Configurator.Group): boolean;
    /**
     * Retrieves observable of parent group for a group
     * @param group
     * @returns Parent group, undefined in case input group is already on root level
     */
    protected getParentGroup(group: Configurator.Group): Observable<Configurator.Group | undefined>;
    getCondensedParentGroup(parentGroup: Configurator.Group): Observable<Configurator.Group | undefined>;
    condenseGroups(groups: Configurator.Group[]): Configurator.Group[];
    /**
     * Returns true if group has been visited and if the group is not a conflict group.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    isGroupVisited(group: Configurator.Group, configuration: Configurator.Configuration): Observable<boolean>;
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType: Configurator.GroupType): boolean;
    /**
     * Verifies whether the current group is conflict one but allows for undefined input
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupTypeAllowingUndefined(groupType: Configurator.GroupType | undefined): boolean;
    /**
     * Returns true if group is conflict header group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict header group, otherwise 'false'.
     */
    isConflictHeader(group: Configurator.Group): boolean;
    /**
     * Returns true if group is conflict group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict group, otherwise 'false'.
     */
    isConflictGroup(group: Configurator.Group): boolean;
    /**
     * Returns group-status style classes dependent on completeness, conflicts, visited status and configurator type.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    getGroupStatusStyles(group: Configurator.Group, configuration: Configurator.Configuration): Observable<string>;
    protected isLTRDirection(): boolean;
    protected isRTLDirection(): boolean;
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    protected isForwardsNavigation(event: KeyboardEvent): boolean;
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    protected isBackNavigation(event: KeyboardEvent): boolean;
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @param {string} groupIndex - Group index
     * @param {Configurator.Group} targetGroup - Target group
     * @param {Configurator.Group} currentGroup - Current group
     */
    switchGroupOnArrowPress(event: KeyboardEvent, groupIndex: number, targetGroup: Configurator.Group, currentGroup: Configurator.Group): void;
    /**
     * Persists the keyboard focus state for the given key
     * from the main group menu by back navigation.
     *
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForMainMenu(currentGroupId?: string): void;
    /**
     * Persists the keyboard focus state for the given key
     * from the subgroup menu by forwards navigation.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForSubGroup(group: Configurator.Group, currentGroupId?: string): void;
    /**
     * Verifies whether the parent group contains a selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the parent group contains a selected group, otherwise 'false'
     */
    containsSelectedGroup(group: Configurator.Group, currentGroupId?: string): boolean;
    /**
     * Retrieves the tab index depending on if the the current group is selected
     * or the parent group contains the selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {number} - tab index
     */
    getTabIndex(group: Configurator.Group, currentGroupId: string): number;
    /**
     * Verifies whether the current group is selected.
     *
     * @param {string} groupId - group ID
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the current group is selected, otherwise 'false'
     */
    isGroupSelected(groupId?: string, currentGroupId?: string): boolean;
    /**
     * Generates a group ID for aria-controls.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createAriaControls(groupId?: string): string | undefined;
    /**
     * Generates aria-label for group menu item
     *
     * @param {Configurator.Group} group - group
     * @returns {string | undefined} - generated group ID
     */
    getAriaLabel(group: Configurator.Group): string;
    /**
     * Generates an id for icons.
     *
     * @param {ICON_TYPE} type - icon type
     * @param {string} groupId - group id
     * @returns {string | undefined} - generated icon id
     */
    createIconId(type: ICON_TYPE, groupId?: string): string | undefined;
    /**
     * Generates aria-describedby
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<string>} - aria-describedby
     */
    getAriaDescribedby(group: Configurator.Group, configuration: Configurator.Configuration): Observable<string>;
    getGroupMenuTitle(group: Configurator.Group): string | undefined;
    displayMenuItem(group: Configurator.Group): Observable<boolean>;
    /**
     * Checks if conflict solver dialog is active
     * @param configuration
     * @returns Conflict solver dialog active?
     */
    isDialogActive(configuration: Configurator.Configuration): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorGroupMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorGroupMenuComponent, "cx-configurator-group-menu", never, {}, {}, never, never, false, never>;
}
