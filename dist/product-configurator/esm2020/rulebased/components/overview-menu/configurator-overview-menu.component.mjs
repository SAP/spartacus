/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
import * as i1 from "../service/configurator-storefront-utils.service";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/core";
export class ConfiguratorOverviewMenuComponent {
    constructor(configuratorStorefrontUtilsService) {
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.height = this.getHeight();
        this.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT = 'cx-page-slot.VariantConfigOverviewNavigation';
        this.CX_CONFIGURATOR_OVERVIEW_MENU = 'cx-configurator-overview-menu';
        this.CX_MENU_ITEM_BUTTONS = 'button.cx-menu-item';
        this.CX_GROUPS = 'div.cx-group';
        this.CX_MENU_GROUP = 'cx-menu-group';
        this.OV_MENU_ITEM = '-ovMenuItem';
        this.OV_GROUP = '-ovGroup';
        this.ACTIVE_CLASS = 'active';
        /**
         * Height of a CSS box model of a menu item
         * See _configurator-overview-menu.scss
         */
        this.MENU_ITEM_HEIGHT = 39.5;
        this.iconTypes = ICON_TYPE;
        this.styles = [
            ['margin-block-end', '268px'],
            ['position', '-webkit-sticky'],
            ['position', 'sticky'],
            ['top', '0'],
        ];
    }
    ngAfterViewInit() {
        this.amount = this.getAmount(this.config);
        this.menuItemsHeight = this.getMenuItemsHeight();
        this.adjustStyling();
        this.onScroll();
    }
    onScroll() {
        this.menuItem = this.getMenuItemToHighlight();
        this.highlight(this.menuItem);
        this.height = this.getHeight();
        this.ensureElementVisible(this.menuItem);
    }
    onResize() {
        this.height = this.getHeight();
        this.ensureElementVisible(this.menuItem);
    }
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
    getAmount(configuration) {
        if (configuration.overview?.groups) {
            return this.getAmountOfGroups(0, configuration.overview.groups);
        }
        return 0;
    }
    getAmountOfGroups(amount, groups) {
        if (groups) {
            amount = amount + groups.length;
            groups.forEach((group) => {
                if (group.subGroups) {
                    amount = this.getAmountOfGroups(amount, group.subGroups);
                }
            });
        }
        return amount;
    }
    /**
     * Calculates the total height of existing menu items.
     *
     * @returns {number} - total height of existing menu items
     * @protected
     */
    getMenuItemsHeight() {
        return this.amount * this.MENU_ITEM_HEIGHT;
    }
    /**
     * Adjust the styling of VariantConfigOverviewNavigation slot.
     *
     * If the amount is larger than 1 then the styling will be applied.
     * Otherwise the styling will be removed.
     *
     * @protected
     */
    adjustStyling() {
        if (this.amount >= 1) {
            this.changeStyling();
        }
        else {
            this.removeStyling();
        }
    }
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
    getHeight() {
        const spareViewportHeight = this.configuratorStorefrontUtilsService.getSpareViewportHeight();
        if (this.menuItemsHeight > spareViewportHeight) {
            return spareViewportHeight + 'px';
        }
        return '';
    }
    /**
     * Applies the styling of element according to the passed list of CSS styles.
     *
     * @protected
     */
    changeStyling() {
        this.styles.forEach((style) => {
            this.configuratorStorefrontUtilsService.changeStyling(this.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT, style[0], style[1]);
        });
    }
    /**
     * Removes the styling of element according to the passed list of CSS styles.
     *
     * @protected
     */
    removeStyling() {
        this.styles.forEach((style) => {
            this.configuratorStorefrontUtilsService.removeStyling(this.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT, style[0]);
        });
    }
    getMenuItemToHighlight() {
        let menuItem;
        const groups = this.configuratorStorefrontUtilsService.getElements(this.CX_GROUPS);
        const verticallyScrolledPixels = this.configuratorStorefrontUtilsService.getVerticallyScrolledPixels();
        groups?.forEach((group) => {
            if (verticallyScrolledPixels &&
                verticallyScrolledPixels >= group.offsetTop) {
                const id = group.id.replace(this.OV_GROUP, this.OV_MENU_ITEM);
                if (id) {
                    const querySelector = '#' + id;
                    menuItem =
                        this.configuratorStorefrontUtilsService.getElement(querySelector);
                }
            }
        });
        return menuItem;
    }
    highlight(elementToHighlight) {
        if (elementToHighlight) {
            const menuItems = this.configuratorStorefrontUtilsService.getElements(this.CX_MENU_ITEM_BUTTONS);
            menuItems?.forEach((menuItem) => {
                menuItem.classList.remove(this.ACTIVE_CLASS);
                if (menuItem.id === elementToHighlight.id) {
                    elementToHighlight.classList.add(this.ACTIVE_CLASS);
                }
            });
        }
    }
    ensureElementVisible(element) {
        if (element &&
            this.configuratorStorefrontUtilsService.hasScrollbar(this.CX_CONFIGURATOR_OVERVIEW_MENU)) {
            this.configuratorStorefrontUtilsService.ensureElementVisible(this.CX_CONFIGURATOR_OVERVIEW_MENU, element);
        }
    }
    /**
     * Retrieves the styling for the group levels.
     *
     * @param {number} level - Group level. 1 is top level.
     * @return {string} - corresponding style classes
     */
    getGroupLevelStyleClasses(level) {
        return this.CX_MENU_GROUP + ' groupLevel' + level;
    }
    /**
     * Navigates to group in OV form
     *
     * @param {string} prefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} id - Group id
     */
    navigateToGroup(prefix, id) {
        const ovGroupId = this.configuratorStorefrontUtilsService.createOvGroupId(prefix, id);
        this.configuratorStorefrontUtilsService.scrollToConfigurationElement('#' + ovGroupId + ' h2');
    }
    /**
     * Retrieves a unique prefix ID.
     *
     * @param {string | undefined} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - prefix ID
     */
    getPrefixId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.getPrefixId(idPrefix, groupId);
    }
    /**
     * Retrieves the ids for the overview group headers
     *
     * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} groupId - local group id
     * @return {string} - unique group id
     */
    getGroupId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.createOvGroupId(idPrefix, groupId);
    }
    /**
     * Retrieves the ids for the overview menu group items
     *
     * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} groupId - local group id
     * @return {string} - unique group id
     */
    getMenuItemId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.createOvMenuItemId(idPrefix, groupId);
    }
}
ConfiguratorOverviewMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuComponent, deps: [{ token: i1.ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewMenuComponent, selector: "cx-configurator-overview-menu", inputs: { config: "config" }, host: { listeners: { "window:scroll": "onScroll($event)", "window:resize": "onResize($event)" }, properties: { "style.height": "this.height" } }, ngImport: i0, template: "<ng-container *ngIf=\"config\">\n  <ng-container\n    *ngTemplateOutlet=\"\n      groups;\n      context: {\n        overviewGroups: config.overview.groups,\n        level: 1,\n        idPrefix: ''\n      }\n    \"\n  ></ng-container>\n</ng-container>\n\n<ng-template\n  #groups\n  let-overviewGroups=\"overviewGroups\"\n  let-level=\"level\"\n  let-idPrefix=\"idPrefix\"\n>\n  <ul>\n    <ng-container *ngFor=\"let group of overviewGroups\">\n      <li [ngClass]=\"getGroupLevelStyleClasses(level)\">\n        <button\n          id=\"{{ getMenuItemId(idPrefix, group.id) }}\"\n          class=\"cx-menu-item\"\n          [attr.aria-label]=\"\n            'configurator.a11y.groupName'\n              | cxTranslate: { group: group.groupDescription }\n          \"\n          (click)=\"navigateToGroup(idPrefix, group.id)\"\n        >\n          <span aria-hidden=\"true\"> {{ group.groupDescription }}</span>\n          <cx-icon [type]=\"iconTypes.ARROW_LEFT\" aria-hidden=\"true\"></cx-icon>\n        </button>\n        <ng-container *ngIf=\"group.subGroups?.length > 0\">\n          <ng-container\n            *ngTemplateOutlet=\"\n              groups;\n              context: {\n                overviewGroups: group.subGroups,\n                level: level + 1,\n                idPrefix: getPrefixId(idPrefix, group.id)\n              }\n            \"\n          ></ng-container>\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"config\">\n  <ng-container\n    *ngTemplateOutlet=\"\n      groups;\n      context: {\n        overviewGroups: config.overview.groups,\n        level: 1,\n        idPrefix: ''\n      }\n    \"\n  ></ng-container>\n</ng-container>\n\n<ng-template\n  #groups\n  let-overviewGroups=\"overviewGroups\"\n  let-level=\"level\"\n  let-idPrefix=\"idPrefix\"\n>\n  <ul>\n    <ng-container *ngFor=\"let group of overviewGroups\">\n      <li [ngClass]=\"getGroupLevelStyleClasses(level)\">\n        <button\n          id=\"{{ getMenuItemId(idPrefix, group.id) }}\"\n          class=\"cx-menu-item\"\n          [attr.aria-label]=\"\n            'configurator.a11y.groupName'\n              | cxTranslate: { group: group.groupDescription }\n          \"\n          (click)=\"navigateToGroup(idPrefix, group.id)\"\n        >\n          <span aria-hidden=\"true\"> {{ group.groupDescription }}</span>\n          <cx-icon [type]=\"iconTypes.ARROW_LEFT\" aria-hidden=\"true\"></cx-icon>\n        </button>\n        <ng-container *ngIf=\"group.subGroups?.length > 0\">\n          <ng-container\n            *ngTemplateOutlet=\"\n              groups;\n              context: {\n                overviewGroups: group.subGroups,\n                level: level + 1,\n                idPrefix: getPrefixId(idPrefix, group.id)\n              }\n            \"\n          ></ng-container>\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorStorefrontUtilsService }]; }, propDecorators: { height: [{
                type: HostBinding,
                args: ['style.height']
            }], config: [{
                type: Input
            }], onScroll: [{
                type: HostListener,
                args: ['window:scroll', ['$event']]
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LW1lbnUvY29uZmlndXJhdG9yLW92ZXJ2aWV3LW1lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LW1lbnUvY29uZmlndXJhdG9yLW92ZXJ2aWV3LW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBU2xELE1BQU0sT0FBTyxpQ0FBaUM7SUFnQzVDLFlBQ1ksa0NBQXNFO1FBQXRFLHVDQUFrQyxHQUFsQyxrQ0FBa0MsQ0FBb0M7UUFoQ3JELFdBQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFJcEMsNENBQXVDLEdBQ3hELDhDQUE4QyxDQUFDO1FBQzlCLGtDQUE2QixHQUM5QywrQkFBK0IsQ0FBQztRQUNmLHlCQUFvQixHQUFHLHFCQUFxQixDQUFDO1FBQzdDLGNBQVMsR0FBRyxjQUFjLENBQUM7UUFDM0Isa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsaUJBQVksR0FBRyxhQUFhLENBQUM7UUFDN0IsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixpQkFBWSxHQUFHLFFBQVEsQ0FBQztRQUMzQzs7O1dBR0c7UUFDZ0IscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FB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Ozs7Ozs7T0FNRztJQUNILFdBQVcsQ0FBQyxRQUE0QixFQUFFLE9BQWU7UUFDdkQsT0FBTyxJQUFJLENBQUMsa0NBQWtDLENBQUMsV0FBVyxDQUN4RCxRQUFRLEVBQ1IsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsVUFBVSxDQUFDLFFBQWdCLEVBQUUsT0FBZTtRQUMxQyxPQUFPLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxlQUFlLENBQzVELFFBQVEsRUFDUixPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxhQUFhLENBQUMsUUFBZ0IsRUFBRSxPQUFlO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGtDQUFrQyxDQUFDLGtCQUFrQixDQUMvRCxRQUFRLEVBQ1IsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDOzs4SEEzUlUsaUNBQWlDO2tIQUFqQyxpQ0FBaUMscVBDdkI5QyxpOENBa0RBOzJGRDNCYSxpQ0FBaUM7a0JBTDdDLFNBQVM7K0JBQ0UsK0JBQStCLG1CQUV4Qix1QkFBdUIsQ0FBQyxNQUFNO3lIQUdsQixNQUFNO3NCQUFsQyxXQUFXO3VCQUFDLGNBQWM7Z0JBRWxCLE1BQU07c0JBQWQsS0FBSztnQkF5Q04sUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFTekMsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9jb25maWd1cmF0b3Itc3RvcmVmcm9udC11dGlscy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uZmlndXJhdG9yLW92ZXJ2aWV3LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlndXJhdG9yLW92ZXJ2aWV3LW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yT3ZlcnZpZXdNZW51Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcblxuICBASW5wdXQoKSBjb25maWc6IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uV2l0aE92ZXJ2aWV3O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBWQVJJQU5UX0NPTkZJR19PVkVSVklFV19OQVZJR0FUSU9OX1NMT1QgPVxuICAgICdjeC1wYWdlLXNsb3QuVmFyaWFudENvbmZpZ092ZXJ2aWV3TmF2aWdhdGlvbic7XG4gIHByb3RlY3RlZCByZWFkb25seSBDWF9DT05GSUdVUkFUT1JfT1ZFUlZJRVdfTUVOVSA9XG4gICAgJ2N4LWNvbmZpZ3VyYXRvci1vdmVydmlldy1tZW51JztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENYX01FTlVfSVRFTV9CVVRUT05TID0gJ2J1dHRvbi5jeC1tZW51LWl0ZW0nO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgQ1hfR1JPVVBTID0gJ2Rpdi5jeC1ncm91cCc7XG4gIHByb3RlY3RlZCByZWFkb25seSBDWF9NRU5VX0dST1VQID0gJ2N4LW1lbnUtZ3JvdXAnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgT1ZfTUVOVV9JVEVNID0gJy1vdk1lbnVJdGVtJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IE9WX0dST1VQID0gJy1vdkdyb3VwJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IEFDVElWRV9DTEFTUyA9ICdhY3RpdmUnO1xuICAvKipcbiAgICogSGVpZ2h0IG9mIGEgQ1NTIGJveCBtb2RlbCBvZiBhIG1lbnUgaXRlbVxuICAgKiBTZWUgX2NvbmZpZ3VyYXRvci1vdmVydmlldy1tZW51LnNjc3NcbiAgICovXG4gIHByb3RlY3RlZCByZWFkb25seSBNRU5VX0lURU1fSEVJR0hUID0gMzkuNTtcblxuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG4gIG1lbnVJdGVtOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgYW1vdW50OiBudW1iZXI7XG4gIG1lbnVJdGVtc0hlaWdodDogbnVtYmVyO1xuICBzdHlsZXM6IHJlYWRvbmx5IFtwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nXVtdID0gW1xuICAgIFsnbWFyZ2luLWJsb2NrLWVuZCcsICcyNjhweCddLFxuICAgIFsncG9zaXRpb24nLCAnLXdlYmtpdC1zdGlja3knXSxcbiAgICBbJ3Bvc2l0aW9uJywgJ3N0aWNreSddLFxuICAgIFsndG9wJywgJzAnXSxcbiAgXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZTogQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZVxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYW1vdW50ID0gdGhpcy5nZXRBbW91bnQodGhpcy5jb25maWcpO1xuICAgIHRoaXMubWVudUl0ZW1zSGVpZ2h0ID0gdGhpcy5nZXRNZW51SXRlbXNIZWlnaHQoKTtcbiAgICB0aGlzLmFkanVzdFN0eWxpbmcoKTtcbiAgICB0aGlzLm9uU2Nyb2xsKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgWyckZXZlbnQnXSlcbiAgb25TY3JvbGwoKTogdm9pZCB7XG4gICAgdGhpcy5tZW51SXRlbSA9IHRoaXMuZ2V0TWVudUl0ZW1Ub0hpZ2hsaWdodCgpO1xuICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMubWVudUl0ZW0pO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcbiAgICB0aGlzLmVuc3VyZUVsZW1lbnRWaXNpYmxlKHRoaXMubWVudUl0ZW0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcbiAgICB0aGlzLmVuc3VyZUVsZW1lbnRWaXNpYmxlKHRoaXMubWVudUl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqICBSZXRyaWV2ZXMgYW1vdW50IG9mIGdyb3VwcyBhbmQgYWxsIGl0cyBzdWJncm91cHMgaW4gdGhlIG92ZXJ2aWV3LlxuICAgKlxuICAgKiAgSWYgdGhlcmUgYXJlIG5vIGdyb3VwcyBpbiB0aGUgb3ZlcnZpZXcgdGhlbiB6ZXJvIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqICBPdGhlcndpc2UgdGhlIGFtb3VudCBvZiBncm91cHMgYW5kIGFsbCBpdHMgc3ViZ3JvdXBzIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gQW1vdW50IG9mIGdyb3VwcyBhbmQgYWxsIGl0cyBzdWJncm91cHNcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEFtb3VudChjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbik6IG51bWJlciB7XG4gICAgaWYgKGNvbmZpZ3VyYXRpb24ub3ZlcnZpZXc/Lmdyb3Vwcykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QW1vdW50T2ZHcm91cHMoMCwgY29uZmlndXJhdGlvbi5vdmVydmlldy5ncm91cHMpO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRBbW91bnRPZkdyb3VwcyhcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cE92ZXJ2aWV3W11cbiAgKTogbnVtYmVyIHtcbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBhbW91bnQgPSBhbW91bnQgKyBncm91cHMubGVuZ3RoO1xuICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgIGlmIChncm91cC5zdWJHcm91cHMpIHtcbiAgICAgICAgICBhbW91bnQgPSB0aGlzLmdldEFtb3VudE9mR3JvdXBzKGFtb3VudCwgZ3JvdXAuc3ViR3JvdXBzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhbW91bnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgaGVpZ2h0IG9mIGV4aXN0aW5nIG1lbnUgaXRlbXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdG90YWwgaGVpZ2h0IG9mIGV4aXN0aW5nIG1lbnUgaXRlbXNcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE1lbnVJdGVtc0hlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmFtb3VudCAqIHRoaXMuTUVOVV9JVEVNX0hFSUdIVDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGp1c3QgdGhlIHN0eWxpbmcgb2YgVmFyaWFudENvbmZpZ092ZXJ2aWV3TmF2aWdhdGlvbiBzbG90LlxuICAgKlxuICAgKiBJZiB0aGUgYW1vdW50IGlzIGxhcmdlciB0aGFuIDEgdGhlbiB0aGUgc3R5bGluZyB3aWxsIGJlIGFwcGxpZWQuXG4gICAqIE90aGVyd2lzZSB0aGUgc3R5bGluZyB3aWxsIGJlIHJlbW92ZWQuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBhZGp1c3RTdHlsaW5nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFtb3VudCA+PSAxKSB7XG4gICAgICB0aGlzLmNoYW5nZVN0eWxpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVTdHlsaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgaGVpZ2h0IG9mIHRoZSBtZW51IGluIHBpeGVscy5cbiAgICpcbiAgICogSWYgdGhlIG1lbnUgaXRlbXMgYXJlIHJlbmRlcmVkLCBpdCB3aWxsIGJlIGNoZWNrZWQgd2hldGhlclxuICAgKiB0aGUgaGVpZ2h0IG9mIGFsbCBtZW51IGl0ZW1zIGVxdWFscyB6ZXJvIG9yIGlzIGxhcmdlciB0aGFuIHRoZSBhY3R1YWwgaGVpZ2h0IG9mIHRoZSBzcGFyZSB2aWV3cG9ydC5cbiAgICogSWYgaXQgaXMgYSBjYXNlIHRoZW4gdGhlIGFjdHVhbCBoZWlnaHQgb2YgdGhlIHNwYXJlIHZpZXdwb3J0IHdpbGwgYmUgcmV0dXJuZWQsIG90aGVyd2lzZSBubyBoZWlnaHQgd2lsbCBiZSByZXR1cm5lZC5cbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gLSBNZW51IGhlaWdodCBpbiBwaXhlbHNcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEhlaWdodCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNwYXJlVmlld3BvcnRIZWlnaHQgPVxuICAgICAgdGhpcy5jb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLmdldFNwYXJlVmlld3BvcnRIZWlnaHQoKTtcblxuICAgIGlmICh0aGlzLm1lbnVJdGVtc0hlaWdodCA+IHNwYXJlVmlld3BvcnRIZWlnaHQpIHtcbiAgICAgIHJldHVybiBzcGFyZVZpZXdwb3J0SGVpZ2h0ICsgJ3B4JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIHN0eWxpbmcgb2YgZWxlbWVudCBhY2NvcmRpbmcgdG8gdGhlIHBhc3NlZCBsaXN0IG9mIENTUyBzdHlsZXMuXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBjaGFuZ2VTdHlsaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuc3R5bGVzLmZvckVhY2goKHN0eWxlKSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UuY2hhbmdlU3R5bGluZyhcbiAgICAgICAgdGhpcy5WQVJJQU5UX0NPTkZJR19PVkVSVklFV19OQVZJR0FUSU9OX1NMT1QsXG4gICAgICAgIHN0eWxlWzBdLFxuICAgICAgICBzdHlsZVsxXVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBzdHlsaW5nIG9mIGVsZW1lbnQgYWNjb3JkaW5nIHRvIHRoZSBwYXNzZWQgbGlzdCBvZiBDU1Mgc3R5bGVzLlxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVtb3ZlU3R5bGluZygpOiB2b2lkIHtcbiAgICB0aGlzLnN0eWxlcy5mb3JFYWNoKChzdHlsZSkgPT4ge1xuICAgICAgdGhpcy5jb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLnJlbW92ZVN0eWxpbmcoXG4gICAgICAgIHRoaXMuVkFSSUFOVF9DT05GSUdfT1ZFUlZJRVdfTkFWSUdBVElPTl9TTE9ULFxuICAgICAgICBzdHlsZVswXVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRNZW51SXRlbVRvSGlnaGxpZ2h0KCk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgbWVudUl0ZW06IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuY29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZS5nZXRFbGVtZW50cyhcbiAgICAgIHRoaXMuQ1hfR1JPVVBTXG4gICAgKTtcbiAgICBjb25zdCB2ZXJ0aWNhbGx5U2Nyb2xsZWRQaXhlbHMgPVxuICAgICAgdGhpcy5jb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLmdldFZlcnRpY2FsbHlTY3JvbGxlZFBpeGVscygpO1xuXG4gICAgZ3JvdXBzPy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB2ZXJ0aWNhbGx5U2Nyb2xsZWRQaXhlbHMgJiZcbiAgICAgICAgdmVydGljYWxseVNjcm9sbGVkUGl4ZWxzID49IGdyb3VwLm9mZnNldFRvcFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGlkID0gZ3JvdXAuaWQucmVwbGFjZSh0aGlzLk9WX0dST1VQLCB0aGlzLk9WX01FTlVfSVRFTSk7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSAnIycgKyBpZDtcbiAgICAgICAgICBtZW51SXRlbSA9XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UuZ2V0RWxlbWVudChxdWVyeVNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtZW51SXRlbTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoaWdobGlnaHQoZWxlbWVudFRvSGlnaGxpZ2h0OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmIChlbGVtZW50VG9IaWdobGlnaHQpIHtcbiAgICAgIGNvbnN0IG1lbnVJdGVtcyA9IHRoaXMuY29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZS5nZXRFbGVtZW50cyhcbiAgICAgICAgdGhpcy5DWF9NRU5VX0lURU1fQlVUVE9OU1xuICAgICAgKTtcbiAgICAgIG1lbnVJdGVtcz8uZm9yRWFjaCgobWVudUl0ZW0pID0+IHtcbiAgICAgICAgbWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkFDVElWRV9DTEFTUyk7XG4gICAgICAgIGlmIChtZW51SXRlbS5pZCA9PT0gZWxlbWVudFRvSGlnaGxpZ2h0LmlkKSB7XG4gICAgICAgICAgZWxlbWVudFRvSGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQodGhpcy5BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZW5zdXJlRWxlbWVudFZpc2libGUoZWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBlbGVtZW50ICYmXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UuaGFzU2Nyb2xsYmFyKFxuICAgICAgICB0aGlzLkNYX0NPTkZJR1VSQVRPUl9PVkVSVklFV19NRU5VXG4gICAgICApXG4gICAgKSB7XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UuZW5zdXJlRWxlbWVudFZpc2libGUoXG4gICAgICAgIHRoaXMuQ1hfQ09ORklHVVJBVE9SX09WRVJWSUVXX01FTlUsXG4gICAgICAgIGVsZW1lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgc3R5bGluZyBmb3IgdGhlIGdyb3VwIGxldmVscy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxldmVsIC0gR3JvdXAgbGV2ZWwuIDEgaXMgdG9wIGxldmVsLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gY29ycmVzcG9uZGluZyBzdHlsZSBjbGFzc2VzXG4gICAqL1xuICBnZXRHcm91cExldmVsU3R5bGVDbGFzc2VzKGxldmVsOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLkNYX01FTlVfR1JPVVAgKyAnIGdyb3VwTGV2ZWwnICsgbGV2ZWw7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIGdyb3VwIGluIE9WIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIFByZWZpeCAocmVmbGVjdHMgdGhlIHBhcmVudCBncm91cHMgaW4gdGhlIGhpZXJhcmNoeSlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gR3JvdXAgaWRcbiAgICovXG4gIG5hdmlnYXRlVG9Hcm91cChwcmVmaXg6IHN0cmluZywgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG92R3JvdXBJZCA9IHRoaXMuY29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZS5jcmVhdGVPdkdyb3VwSWQoXG4gICAgICBwcmVmaXgsXG4gICAgICBpZFxuICAgICk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2Uuc2Nyb2xsVG9Db25maWd1cmF0aW9uRWxlbWVudChcbiAgICAgICcjJyArIG92R3JvdXBJZCArICcgaDInXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSB1bmlxdWUgcHJlZml4IElELlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gcHJlZml4IC0gcHJlZml4IHRoYXQgd2UgbmVlZCB0byBtYWtlIHRoZSBJRCB1bmlxdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBncm91cCBJRFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHByZWZpeCBJRFxuICAgKi9cbiAgZ2V0UHJlZml4SWQoaWRQcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZCwgZ3JvdXBJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLmdldFByZWZpeElkKFxuICAgICAgaWRQcmVmaXgsXG4gICAgICBncm91cElkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGlkcyBmb3IgdGhlIG92ZXJ2aWV3IGdyb3VwIGhlYWRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkUHJlZml4IC0gUHJlZml4IChyZWZsZWN0cyB0aGUgcGFyZW50IGdyb3VwcyBpbiB0aGUgaGllcmFyY2h5KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIGxvY2FsIGdyb3VwIGlkXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSB1bmlxdWUgZ3JvdXAgaWRcbiAgICovXG4gIGdldEdyb3VwSWQoaWRQcmVmaXg6IHN0cmluZywgZ3JvdXBJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLmNyZWF0ZU92R3JvdXBJZChcbiAgICAgIGlkUHJlZml4LFxuICAgICAgZ3JvdXBJZFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBpZHMgZm9yIHRoZSBvdmVydmlldyBtZW51IGdyb3VwIGl0ZW1zXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFByZWZpeCAtIFByZWZpeCAocmVmbGVjdHMgdGhlIHBhcmVudCBncm91cHMgaW4gdGhlIGhpZXJhcmNoeSlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBsb2NhbCBncm91cCBpZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdW5pcXVlIGdyb3VwIGlkXG4gICAqL1xuICBnZXRNZW51SXRlbUlkKGlkUHJlZml4OiBzdHJpbmcsIGdyb3VwSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZS5jcmVhdGVPdk1lbnVJdGVtSWQoXG4gICAgICBpZFByZWZpeCxcbiAgICAgIGdyb3VwSWRcbiAgICApO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29uZmlnXCI+XG4gIDxuZy1jb250YWluZXJcbiAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgZ3JvdXBzO1xuICAgICAgY29udGV4dDoge1xuICAgICAgICBvdmVydmlld0dyb3VwczogY29uZmlnLm92ZXJ2aWV3Lmdyb3VwcyxcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIGlkUHJlZml4OiAnJ1xuICAgICAgfVxuICAgIFwiXG4gID48L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGVcbiAgI2dyb3Vwc1xuICBsZXQtb3ZlcnZpZXdHcm91cHM9XCJvdmVydmlld0dyb3Vwc1wiXG4gIGxldC1sZXZlbD1cImxldmVsXCJcbiAgbGV0LWlkUHJlZml4PVwiaWRQcmVmaXhcIlxuPlxuICA8dWw+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2Ygb3ZlcnZpZXdHcm91cHNcIj5cbiAgICAgIDxsaSBbbmdDbGFzc109XCJnZXRHcm91cExldmVsU3R5bGVDbGFzc2VzKGxldmVsKVwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgaWQ9XCJ7eyBnZXRNZW51SXRlbUlkKGlkUHJlZml4LCBncm91cC5pZCkgfX1cIlxuICAgICAgICAgIGNsYXNzPVwiY3gtbWVudS1pdGVtXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5Lmdyb3VwTmFtZSdcbiAgICAgICAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBncm91cDogZ3JvdXAuZ3JvdXBEZXNjcmlwdGlvbiB9XG4gICAgICAgICAgXCJcbiAgICAgICAgICAoY2xpY2spPVwibmF2aWdhdGVUb0dyb3VwKGlkUHJlZml4LCBncm91cC5pZClcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+IHt7IGdyb3VwLmdyb3VwRGVzY3JpcHRpb24gfX08L3NwYW4+XG4gICAgICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLkFSUk9XX0xFRlRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2N4LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXAuc3ViR3JvdXBzPy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgICAgICAgICAgZ3JvdXBzO1xuICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgb3ZlcnZpZXdHcm91cHM6IGdyb3VwLnN1Ykdyb3VwcyxcbiAgICAgICAgICAgICAgICBsZXZlbDogbGV2ZWwgKyAxLFxuICAgICAgICAgICAgICAgIGlkUHJlZml4OiBnZXRQcmVmaXhJZChpZFByZWZpeCwgZ3JvdXAuaWQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbGk+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvdWw+XG48L25nLXRlbXBsYXRlPlxuIl19