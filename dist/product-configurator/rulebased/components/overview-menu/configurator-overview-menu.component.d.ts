import { AfterViewInit } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewMenuComponent implements AfterViewInit {
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
    height: string;
    config: Configurator.ConfigurationWithOverview;
    protected readonly VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT = "cx-page-slot.VariantConfigOverviewNavigation";
    protected readonly CX_CONFIGURATOR_OVERVIEW_MENU = "cx-configurator-overview-menu";
    protected readonly CX_MENU_ITEM_BUTTONS = "button.cx-menu-item";
    protected readonly CX_GROUPS = "div.cx-group";
    protected readonly CX_MENU_GROUP = "cx-menu-group";
    protected readonly OV_MENU_ITEM = "-ovMenuItem";
    protected readonly OV_GROUP = "-ovGroup";
    protected readonly ACTIVE_CLASS = "active";
    /**
     * Height of a CSS box model of a menu item
     * See _configurator-overview-menu.scss
     */
    protected readonly MENU_ITEM_HEIGHT = 39.5;
    iconTypes: typeof ICON_TYPE;
    menuItem: HTMLElement | undefined;
    amount: number;
    menuItemsHeight: number;
    styles: readonly [property: string, value: string][];
    constructor(configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService);
    ngAfterViewInit(): void;
    onScroll(): void;
    onResize(): void;
    /**
     *  Retrieves amount of groups and all its subgroups in the overview.
     *
     *  If there are no groups in the overview then zero will be returned.
     *  Otherwise the amount of groups and all its subgroups will be returned.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {number} - Amount of groups and all its subgroups
     * @protected
     */
    protected getAmount(configuration: Configurator.Configuration): number;
    protected getAmountOfGroups(amount: number, groups: Configurator.GroupOverview[]): number;
    /**
     * Calculates the total height of existing menu items.
     *
     * @returns {number} - total height of existing menu items
     * @protected
     */
    protected getMenuItemsHeight(): number;
    /**
     * Adjust the styling of VariantConfigOverviewNavigation slot.
     *
     * If the amount is larger than 1 then the styling will be applied.
     * Otherwise the styling will be removed.
     *
     * @protected
     */
    protected adjustStyling(): void;
    /**
     * Retrieves the height of the menu in pixels.
     *
     * If the menu items are rendered, it will be checked whether
     * the height of all menu items equals zero or is larger than the actual height of the spare viewport.
     * If it is a case then the actual height of the spare viewport will be returned, otherwise no height will be returned.
     *
     * @returns {string} - Menu height in pixels
     * @protected
     */
    protected getHeight(): string;
    /**
     * Applies the styling of element according to the passed list of CSS styles.
     *
     * @protected
     */
    protected changeStyling(): void;
    /**
     * Removes the styling of element according to the passed list of CSS styles.
     *
     * @protected
     */
    protected removeStyling(): void;
    protected getMenuItemToHighlight(): HTMLElement | undefined;
    protected highlight(elementToHighlight: HTMLElement | undefined): void;
    protected ensureElementVisible(element: HTMLElement | undefined): void;
    /**
     * Retrieves the styling for the group levels.
     *
     * @param {number} level - Group level. 1 is top level.
     * @return {string} - corresponding style classes
     */
    getGroupLevelStyleClasses(level: number): string;
    /**
     * Navigates to group in OV form
     *
     * @param {string} prefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} id - Group id
     */
    navigateToGroup(prefix: string, id: string): void;
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
    /**
     * Retrieves the ids for the overview menu group items
     *
     * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} groupId - local group id
     * @return {string} - unique group id
     */
    getMenuItemId(idPrefix: string, groupId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewMenuComponent, "cx-configurator-overview-menu", never, { "config": "config"; }, {}, never, never, false, never>;
}
