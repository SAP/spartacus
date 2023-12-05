/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChildren, } from '@angular/core';
import { DirectionMode, ICON_TYPE, } from '@spartacus/storefront';
import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "../../core/facade/configurator-commons.service";
import * as i2 from "../../core/facade/configurator-groups.service";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/product-configurator/common";
import * as i5 from "../service/configurator-storefront-utils.service";
import * as i6 from "./configurator-group-menu.component.service";
import * as i7 from "@spartacus/core";
import * as i8 from "../../core/services/configurator-expert-mode.service";
import * as i9 from "@angular/common";
export class ConfiguratorGroupMenuComponent {
    constructor(configCommonsService, configuratorGroupsService, hamburgerMenuService, configRouterExtractorService, configUtils, configGroupMenuService, directionService, translation, configExpertModeService) {
        this.configCommonsService = configCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.hamburgerMenuService = hamburgerMenuService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configUtils = configUtils;
        this.configGroupMenuService = configGroupMenuService;
        this.directionService = directionService;
        this.translation = translation;
        this.configExpertModeService = configExpertModeService;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(switchMap((routerData) => this.configCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })), 
        //We need to ensure that the navigation to conflict groups or
        //groups with mandatory attributes already has taken place, as this happens
        //in an onInit of another component.
        //otherwise we risk that this component is completely initialized too early,
        //in dev mode resulting in ExpressionChangedAfterItHasBeenCheckedError
        filter((cont) => (cont.configuration.complete &&
            cont.configuration.consistent) ||
            cont.configuration.interactionState.issueNavigationDone ||
            !cont.routerData.resolveIssues))
            .pipe(map((cont) => cont.configuration))));
        this.currentGroup$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner)));
        /**
         * Current parent group. Undefined for top level groups
         */
        this.displayedParentGroup$ = this.configuration$.pipe(switchMap((configuration) => this.configuratorGroupsService.getMenuParentGroup(configuration.owner)), switchMap((parentGroup) => {
            return parentGroup
                ? this.getCondensedParentGroup(parentGroup)
                : of(parentGroup);
        }));
        this.displayedGroups$ = this.displayedParentGroup$.pipe(switchMap((parentGroup) => {
            return this.configuration$.pipe(map((configuration) => {
                if (parentGroup) {
                    return this.condenseGroups(parentGroup.subGroups);
                }
                else {
                    return this.condenseGroups(configuration.groups);
                }
            }));
        }));
        this.iconTypes = ICON_TYPE;
        this.ERROR = ' ERROR';
        this.COMPLETE = ' COMPLETE';
        this.WARNING = ' WARNING';
        this.ICON = 'ICON';
    }
    click(group) {
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            if (configuration.interactionState.currentGroup === group.id) {
                return;
            }
            if (!this.configuratorGroupsService.hasSubGroups(group)) {
                this.configuratorGroupsService.navigateToGroup(configuration, group.id);
                this.hamburgerMenuService.toggle(true);
                this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
            }
            else {
                this.configuratorGroupsService.setMenuParentGroup(configuration.owner, group.id);
            }
        });
    }
    navigateUp() {
        this.displayedParentGroup$
            .pipe(take(1))
            .subscribe((displayedParentGroup) => {
            //we only navigate up if we are not on a sub level group
            if (displayedParentGroup) {
                const grandParentGroup$ = this.getParentGroup(displayedParentGroup);
                this.configuration$.pipe(take(1)).subscribe((configuration) => {
                    grandParentGroup$.pipe(take(1)).subscribe((grandParentGroup) => {
                        this.configuratorGroupsService.setMenuParentGroup(configuration.owner, grandParentGroup ? grandParentGroup.id : undefined);
                    });
                });
            }
        });
    }
    /**
     * Retrieves the number of conflicts for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {string} - number of conflicts
     */
    getConflictNumber(group) {
        if (group &&
            group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return '(' + group.subGroups.length + ')';
        }
        return '';
    }
    /**
     * Verifies whether the current group has subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - Returns 'true' if the current group has a subgroups, otherwise 'false'.
     */
    hasSubGroups(group) {
        return this.configuratorGroupsService.hasSubGroups(group);
    }
    /**
     * Retrieves observable of parent group for a group
     * @param group
     * @returns Parent group, undefined in case input group is already on root level
     */
    getParentGroup(group) {
        return this.configuration$.pipe(map((configuration) => this.configuratorGroupsService.getParentGroup(configuration.groups, group)));
    }
    getCondensedParentGroup(parentGroup) {
        if (parentGroup &&
            parentGroup.subGroups &&
            parentGroup.subGroups.length === 1 &&
            parentGroup.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return this.getParentGroup(parentGroup).pipe(switchMap((group) => {
                return group ? this.getCondensedParentGroup(group) : of(group);
            }));
        }
        else {
            return of(parentGroup);
        }
    }
    condenseGroups(groups) {
        return groups.flatMap((group) => {
            if (group.subGroups.length === 1 &&
                group.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
                return this.condenseGroups(group.subGroups);
            }
            else {
                return group;
            }
        });
    }
    /**
     * Returns true if group has been visited and if the group is not a conflict group.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    isGroupVisited(group, configuration) {
        return this.configuratorGroupsService
            .isGroupVisited(configuration.owner, group.id)
            .pipe(map((isVisited) => isVisited &&
            !this.isConflictGroupType(group.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP)), take(1));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return this.configuratorGroupsService.isConflictGroupType(groupType);
    }
    //TODO(CXSPA-3392) get rid of this method in next major. Change signature of
    //isConflictGroupType to allow undefined, and use this method instead
    /**
     * Verifies whether the current group is conflict one but allows for undefined input
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupTypeAllowingUndefined(groupType) {
        return groupType
            ? this.configuratorGroupsService.isConflictGroupType(groupType)
            : false;
    }
    /**
     * Returns true if group is conflict header group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict header group, otherwise 'false'.
     */
    isConflictHeader(group) {
        return (group && group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP);
    }
    /**
     * Returns true if group is conflict group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict group, otherwise 'false'.
     */
    isConflictGroup(group) {
        return group && group.groupType === Configurator.GroupType.CONFLICT_GROUP;
    }
    /**
     * Returns group-status style classes dependent on completeness, conflicts, visited status and configurator type.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    getGroupStatusStyles(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let groupStatusStyle = 'cx-menu-item';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent) {
                groupStatusStyle = groupStatusStyle + this.WARNING;
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                groupStatusStyle = groupStatusStyle + this.COMPLETE;
            }
            if (!group.complete && isVisited) {
                groupStatusStyle = groupStatusStyle + this.ERROR;
            }
            return groupStatusStyle;
        }));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @param {string} groupIndex - Group index
     * @param {Configurator.Group} targetGroup - Target group
     * @param {Configurator.Group} currentGroup - Current group
     */
    switchGroupOnArrowPress(event, groupIndex, targetGroup, currentGroup) {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            this.configGroupMenuService.switchGroupOnArrowPress(event, groupIndex, this.groups);
        }
        else if (this.isForwardsNavigation(event)) {
            if (targetGroup && this.hasSubGroups(targetGroup)) {
                this.click(targetGroup);
                this.setFocusForSubGroup(targetGroup, currentGroup.id);
            }
        }
        else if (this.isBackNavigation(event)) {
            if (this.configGroupMenuService.isBackBtnFocused(this.groups)) {
                this.navigateUp();
                this.setFocusForMainMenu(currentGroup.id);
            }
        }
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the main group menu by back navigation.
     *
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForMainMenu(currentGroupId) {
        let key = currentGroupId;
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            configuration.groups?.forEach((group) => {
                if (group.subGroups?.length !== 1 &&
                    (this.isGroupSelected(group.id, currentGroupId) ||
                        this.containsSelectedGroup(group, currentGroupId))) {
                    key = group.id;
                }
            });
        });
        this.configUtils.setFocus(key);
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the subgroup menu by forwards navigation.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForSubGroup(group, currentGroupId) {
        let key = 'cx-menu-back';
        if (this.containsSelectedGroup(group, currentGroupId)) {
            key = currentGroupId;
        }
        this.configUtils.setFocus(key);
    }
    /**
     * Verifies whether the parent group contains a selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the parent group contains a selected group, otherwise 'false'
     */
    containsSelectedGroup(group, currentGroupId) {
        let isCurrentGroupFound = false;
        group.subGroups?.forEach((subGroup) => {
            if (this.isGroupSelected(subGroup.id, currentGroupId)) {
                isCurrentGroupFound = true;
            }
        });
        return isCurrentGroupFound;
    }
    /**
     * Retrieves the tab index depending on if the the current group is selected
     * or the parent group contains the selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {number} - tab index
     */
    getTabIndex(group, currentGroupId) {
        if (!this.isGroupSelected(group.id, currentGroupId) &&
            !this.containsSelectedGroup(group, currentGroupId)) {
            return -1;
        }
        else {
            return 0;
        }
    }
    /**
     * Verifies whether the current group is selected.
     *
     * @param {string} groupId - group ID
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the current group is selected, otherwise 'false'
     */
    isGroupSelected(groupId, currentGroupId) {
        return groupId === currentGroupId;
    }
    /**
     * Generates a group ID for aria-controls.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createAriaControls(groupId) {
        return this.configUtils.createGroupId(groupId);
    }
    /**
     * Generates aria-label for group menu item
     *
     * @param {Configurator.Group} group - group
     * @returns {string | undefined} - generated group ID
     */
    getAriaLabel(group) {
        let translatedText = '';
        if (group && group.groupType && this.isConflictGroupType(group.groupType)) {
            if (this.isConflictHeader(group)) {
                this.translation
                    .translate('configurator.a11y.conflictsInConfiguration', {
                    numberOfConflicts: this.getConflictNumber(group),
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                translatedText = group.description ? group.description : '';
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.groupName', {
                group: group.description,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    /**
     * Generates an id for icons.
     *
     * @param {ICON_TYPE} type - icon type
     * @param {string} groupId - group id
     * @returns {string | undefined} - generated icon id
     */
    createIconId(type, groupId) {
        return this.ICON + type + groupId;
    }
    /**
     * Generates aria-describedby
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<string>} - aria-describedby
     */
    getAriaDescribedby(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let ariaDescribedby = '';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent &&
                group.groupType &&
                !this.isConflictGroupType(group.groupType)) {
                ariaDescribedby =
                    ariaDescribedby + this.createIconId(ICON_TYPE.WARNING, group.id);
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.SUCCESS, group.id);
            }
            if (!group.complete && isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.ERROR, group.id);
            }
            if (this.hasSubGroups(group)) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.CARET_RIGHT, group.id);
            }
            ariaDescribedby = ariaDescribedby + ' inListOfGroups';
            return ariaDescribedby;
        }));
    }
    getGroupMenuTitle(group) {
        let title = group.description;
        if (!this.isConflictHeader(group) && !this.isConflictGroup(group)) {
            this.configExpertModeService
                .getExpModeActive()
                .pipe(take(1))
                .subscribe((expMode) => {
                if (expMode) {
                    title += ` / [${group.name}]`;
                }
            });
        }
        return title;
    }
    displayMenuItem(group) {
        return this.configuration$.pipe(map((configuration) => {
            let displayMenuItem = true;
            if (configuration.immediateConflictResolution &&
                group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
                displayMenuItem = false;
            }
            return displayMenuItem;
        }));
    }
    /**
     * Checks if conflict solver dialog is active
     * @param configuration
     * @returns Conflict solver dialog active?
     */
    isDialogActive(configuration) {
        return configuration.interactionState.showConflictSolverDialog ?? false;
    }
}
ConfiguratorGroupMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuComponent, deps: [{ token: i1.ConfiguratorCommonsService }, { token: i2.ConfiguratorGroupsService }, { token: i3.HamburgerMenuService }, { token: i4.ConfiguratorRouterExtractorService }, { token: i5.ConfiguratorStorefrontUtilsService }, { token: i6.ConfiguratorGroupMenuService }, { token: i3.DirectionService }, { token: i7.TranslationService }, { token: i8.ConfiguratorExpertModeService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorGroupMenuComponent, selector: "cx-configurator-group-menu", viewQueries: [{ propertyName: "groups", predicate: ["groupItem"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <ng-container *ngIf=\"!isDialogActive(configuration); else ghostGroups\">\n    <div class=\"cx-group-menu\" role=\"tablist\">\n      <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n        {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n      </span>\n      <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n        {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n      </span>\n      <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n        <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n          <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n            <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n              <button\n                *ngIf=\"parentGroup !== null && groupIndex === 0\"\n                #groupItem\n                class=\"cx-menu-back\"\n                role=\"tab\"\n                [attr.aria-selected]=\"false\"\n                [attr.aria-label]=\"\n                  isConflictGroupTypeAllowingUndefined(parentGroup.groupType)\n                    ? ('configurator.a11y.conflictBack' | cxTranslate)\n                    : ('configurator.a11y.groupBack' | cxTranslate)\n                \"\n                aria-describedby=\"listOfGroups\"\n                [cxFocus]=\"{ key: 'cx-menu-back' }\"\n                (click)=\"navigateUp()\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n                {{ 'configurator.button.back' | cxTranslate }}\n              </button>\n            </ng-container>\n            <ng-container *ngIf=\"displayMenuItem(group) | async\">\n              <button\n                #groupItem\n                id=\"{{ group.id }}\"\n                ngClass=\"{{\n                  getGroupStatusStyles(group, configuration) | async\n                }}\"\n                role=\"tab\"\n                [class.DISABLED]=\"!group.configurable\"\n                [class.cx-menu-conflict]=\"\n                  isConflictGroupTypeAllowingUndefined(group.groupType)\n                \"\n                [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n                [class.disable]=\"!group.configurable\"\n                [attr.aria-describedby]=\"\n                  getAriaDescribedby(group, configuration) | async\n                \"\n                [attr.aria-selected]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                \"\n                [attr.aria-controls]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                    ? createAriaControls(group.id)\n                    : null\n                \"\n                [attr.aria-label]=\"getAriaLabel(group)\"\n                [cxFocus]=\"{\n                  key: group.id\n                }\"\n                (click)=\"click(group)\"\n                [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <span title=\"{{ group.description }}\">{{\n                  getGroupMenuTitle(group)\n                }}</span>\n                <div class=\"groupIndicators\">\n                  <div class=\"conflictNumberIndicator\">\n                    {{ getConflictNumber(group) }}\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"WARNING\"\n                      [type]=\"iconTypes.WARNING\"\n                      id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconConflict' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupConflict' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"ERROR\"\n                      [type]=\"iconTypes.ERROR\"\n                      id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconIncomplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupIncomplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                    <cx-icon\n                      class=\"COMPLETE\"\n                      [type]=\"iconTypes.SUCCESS\"\n                      id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconComplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupComplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"subGroupIndicator\">\n                    <cx-icon\n                      *ngIf=\"hasSubGroups(group)\"\n                      [type]=\"iconTypes.CARET_RIGHT\"\n                      id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconSubGroup' | cxTranslate\n                      \"\n                      title=\"{{ 'configurator.icon.subgroup' | cxTranslate }}\"\n                    ></cx-icon>\n                  </div>\n                </div>\n              </button>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n    </div> </ng-container\n></ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i9.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i9.AsyncPipe, name: "async" }, { kind: "pipe", type: i7.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <ng-container *ngIf=\"!isDialogActive(configuration); else ghostGroups\">\n    <div class=\"cx-group-menu\" role=\"tablist\">\n      <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n        {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n      </span>\n      <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n        {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n      </span>\n      <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n        <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n          <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n            <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n              <button\n                *ngIf=\"parentGroup !== null && groupIndex === 0\"\n                #groupItem\n                class=\"cx-menu-back\"\n                role=\"tab\"\n                [attr.aria-selected]=\"false\"\n                [attr.aria-label]=\"\n                  isConflictGroupTypeAllowingUndefined(parentGroup.groupType)\n                    ? ('configurator.a11y.conflictBack' | cxTranslate)\n                    : ('configurator.a11y.groupBack' | cxTranslate)\n                \"\n                aria-describedby=\"listOfGroups\"\n                [cxFocus]=\"{ key: 'cx-menu-back' }\"\n                (click)=\"navigateUp()\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n                {{ 'configurator.button.back' | cxTranslate }}\n              </button>\n            </ng-container>\n            <ng-container *ngIf=\"displayMenuItem(group) | async\">\n              <button\n                #groupItem\n                id=\"{{ group.id }}\"\n                ngClass=\"{{\n                  getGroupStatusStyles(group, configuration) | async\n                }}\"\n                role=\"tab\"\n                [class.DISABLED]=\"!group.configurable\"\n                [class.cx-menu-conflict]=\"\n                  isConflictGroupTypeAllowingUndefined(group.groupType)\n                \"\n                [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n                [class.disable]=\"!group.configurable\"\n                [attr.aria-describedby]=\"\n                  getAriaDescribedby(group, configuration) | async\n                \"\n                [attr.aria-selected]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                \"\n                [attr.aria-controls]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                    ? createAriaControls(group.id)\n                    : null\n                \"\n                [attr.aria-label]=\"getAriaLabel(group)\"\n                [cxFocus]=\"{\n                  key: group.id\n                }\"\n                (click)=\"click(group)\"\n                [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <span title=\"{{ group.description }}\">{{\n                  getGroupMenuTitle(group)\n                }}</span>\n                <div class=\"groupIndicators\">\n                  <div class=\"conflictNumberIndicator\">\n                    {{ getConflictNumber(group) }}\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"WARNING\"\n                      [type]=\"iconTypes.WARNING\"\n                      id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconConflict' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupConflict' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"ERROR\"\n                      [type]=\"iconTypes.ERROR\"\n                      id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconIncomplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupIncomplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                    <cx-icon\n                      class=\"COMPLETE\"\n                      [type]=\"iconTypes.SUCCESS\"\n                      id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconComplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupComplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"subGroupIndicator\">\n                    <cx-icon\n                      *ngIf=\"hasSubGroups(group)\"\n                      [type]=\"iconTypes.CARET_RIGHT\"\n                      id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconSubGroup' | cxTranslate\n                      \"\n                      title=\"{{ 'configurator.icon.subgroup' | cxTranslate }}\"\n                    ></cx-icon>\n                  </div>\n                </div>\n              </button>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n    </div> </ng-container\n></ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorCommonsService }, { type: i2.ConfiguratorGroupsService }, { type: i3.HamburgerMenuService }, { type: i4.ConfiguratorRouterExtractorService }, { type: i5.ConfiguratorStorefrontUtilsService }, { type: i6.ConfiguratorGroupMenuService }, { type: i3.DirectionService }, { type: i7.TranslationService }, { type: i8.ConfiguratorExpertModeService }]; }, propDecorators: { groups: [{
                type: ViewChildren,
                args: ['groupItem']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2dyb3VwLW1lbnUvY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2dyb3VwLW1lbnUvY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUdULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQ0wsYUFBYSxFQUdiLFNBQVMsR0FDVixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7Ozs7QUFVbkUsTUFBTSxPQUFPLDhCQUE4QjtJQXdFekMsWUFDWSxvQkFBZ0QsRUFDaEQseUJBQW9ELEVBQ3BELG9CQUEwQyxFQUMxQyw0QkFBZ0UsRUFDaEUsV0FBK0MsRUFDL0Msc0JBQW9ELEVBQ3BELGdCQUFrQyxFQUNsQyxXQUErQixFQUMvQix1QkFBc0Q7UUFSdEQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE0QjtRQUNoRCw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFvQztRQUNoRSxnQkFBVyxHQUFYLFdBQVcsQ0FBb0M7UUFDL0MsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUE4QjtRQUNwRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQStCO1FBOUVsRSxnQkFBVyxHQUNULElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXhELG1CQUFjLEdBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25CLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQ3ZCLElBQUksQ0FBQyxvQkFBb0I7YUFDdEIsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzthQUNsQyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDdkQsNkRBQTZEO1FBQzdELDJFQUEyRTtRQUMzRSxvQ0FBb0M7UUFDcEMsNEVBQTRFO1FBQzVFLHNFQUFzRTtRQUN0RSxNQUFNLENBQ0osQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRO1lBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CO1lBQ3ZELENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQ2pDLENBQ0Y7YUFFQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FDM0MsQ0FDRixDQUFDO1FBRUosa0JBQWEsR0FBbUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25FLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQ3ZCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUNqRSxDQUNGLENBQUM7UUFDRjs7V0FFRztRQUNILDBCQUFxQixHQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FDMUIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDdkUsRUFDRCxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN4QixPQUFPLFdBQVc7Z0JBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFSixxQkFBZ0IsR0FDZCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUM3QixTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QixHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDcEIsSUFBSSxXQUFXLEVBQUU7b0JBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDbkQ7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbEQ7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVKLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsVUFBSyxHQUFHLFFBQVEsQ0FBQztRQUNqQixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLFlBQU8sR0FBRyxVQUFVLENBQUM7UUFDckIsU0FBSSxHQUFHLE1BQU0sQ0FBQztJQVlYLENBQUM7SUFFSixLQUFLLENBQUMsS0FBeUI7UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQzVELE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN2RCxJQUFJLENBQUMseUJBQXlCLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXZDLElBQUksQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQzNDLDBEQUEwRCxDQUMzRCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixDQUMvQyxhQUFhLENBQUMsS0FBSyxFQUNuQixLQUFLLENBQUMsRUFBRSxDQUNULENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMscUJBQXFCO2FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFO1lBQ2xDLHdEQUF3RDtZQUN4RCxJQUFJLG9CQUFvQixFQUFFO2dCQUN4QixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7b0JBQzVELGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO3dCQUM3RCxJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLENBQy9DLGFBQWEsQ0FBQyxLQUFLLEVBQ25CLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDbkQsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxpQkFBaUIsQ0FBQyxLQUF5QjtRQUN6QyxJQUNFLEtBQUs7WUFDTCxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQ2hFO1lBQ0EsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQzNDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZLENBQUMsS0FBeUI7UUFDcEMsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7OztPQUlHO0lBQ08sY0FBYyxDQUN0QixLQUF5QjtRQUV6QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QixHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUNwQixJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUMzQyxhQUFhLENBQUMsTUFBTSxFQUNwQixLQUFLLENBQ04sQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsdUJBQXVCLENBQ3JCLFdBQStCO1FBRS9CLElBQ0UsV0FBVztZQUNYLFdBQVcsQ0FBQyxTQUFTO1lBQ3JCLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDbEMsV0FBVyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUN0RTtZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQzFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNsQixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsTUFBNEI7UUFDekMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUIsSUFDRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUM1QixLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQ2hFO2dCQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0M7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGNBQWMsQ0FDWixLQUF5QixFQUN6QixhQUF5QztRQUV6QyxPQUFPLElBQUksQ0FBQyx5QkFBeUI7YUFDbEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUM3QyxJQUFJLENBQ0gsR0FBRyxDQUNELENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDWixTQUFTO1lBQ1QsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQ3ZCLEtBQUssQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQzFELENBQ0osRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG1CQUFtQixDQUFDLFNBQWlDO1FBQ25ELE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUscUVBQXFFO0lBQ3JFOzs7OztPQUtHO0lBQ0gsb0NBQW9DLENBQ2xDLFNBQTZDO1FBRTdDLE9BQU8sU0FBUztZQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDWixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxnQkFBZ0IsQ0FBQyxLQUF5QjtRQUN4QyxPQUFPLENBQ0wsS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FDMUUsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGVBQWUsQ0FBQyxLQUF5QjtRQUN2QyxPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQzVFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxvQkFBb0IsQ0FDbEIsS0FBeUIsRUFDekIsYUFBeUM7UUFFekMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQ25ELEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sMEJBQTBCLEdBQUcsc0JBQXNCLENBQUM7WUFDMUQsSUFBSSxnQkFBZ0IsR0FBVyxjQUFjLENBQUM7WUFDOUMsSUFDRSxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLDBCQUEwQjtnQkFDbkUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUNqQjtnQkFDQSxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3BEO1lBQ0QsSUFDRSxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLDBCQUEwQjtnQkFDbkUsS0FBSyxDQUFDLFFBQVE7Z0JBQ2QsS0FBSyxDQUFDLFVBQVU7Z0JBQ2hCLFNBQVMsRUFDVDtnQkFDQSxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUNoQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLGNBQWM7UUFDdEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEtBQUssYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUNwRSxDQUFDO0lBRVMsY0FBYztRQUN0QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxvQkFBb0IsQ0FBQyxLQUFvQjtRQUNqRCxPQUFPLENBQ0wsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEQsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FDdEQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxnQkFBZ0IsQ0FBQyxLQUFvQjtRQUM3QyxPQUFPLENBQ0wsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDckQsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FDdkQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsdUJBQXVCLENBQ3JCLEtBQW9CLEVBQ3BCLFVBQWtCLEVBQ2xCLFdBQStCLEVBQy9CLFlBQWdDO1FBRWhDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDMUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHVCQUF1QixDQUNqRCxLQUFLLEVBQ0wsVUFBVSxFQUNWLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEQ7U0FDRjthQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxtQkFBbUIsQ0FBQyxjQUF1QjtRQUN6QyxJQUFJLEdBQUcsR0FBdUIsY0FBYyxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQzVELGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RDLElBQ0UsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztvQkFDN0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDO3dCQUM3QyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEVBQ3BEO29CQUNBLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsbUJBQW1CLENBQ2pCLEtBQXlCLEVBQ3pCLGNBQXVCO1FBRXZCLElBQUksR0FBRyxHQUF1QixjQUFjLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxFQUFFO1lBQ3JELEdBQUcsR0FBRyxjQUFjLENBQUM7U0FDdEI7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gscUJBQXFCLENBQ25CLEtBQXlCLEVBQ3pCLGNBQXVCO1FBRXZCLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLEVBQUU7Z0JBQ3JELG1CQUFtQixHQUFHLElBQUksQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFdBQVcsQ0FBQyxLQUF5QixFQUFFLGNBQXNCO1FBQzNELElBQ0UsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDO1lBQy9DLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsRUFDbEQ7WUFDQSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ1g7YUFBTTtZQUNMLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsZUFBZSxDQUFDLE9BQWdCLEVBQUUsY0FBdUI7UUFDdkQsT0FBTyxPQUFPLEtBQUssY0FBYyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUFrQixDQUFDLE9BQWdCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsWUFBWSxDQUFDLEtBQXlCO1FBQ3BDLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxXQUFXO3FCQUNiLFNBQVMsQ0FBQyw0Q0FBNEMsRUFBRTtvQkFDdkQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztpQkFDakQsQ0FBQztxQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNiLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxjQUFjLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzdEO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXO2lCQUNiLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRTtnQkFDeEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXO2FBQ3pCLENBQUM7aUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsWUFBWSxDQUFDLElBQWUsRUFBRSxPQUFnQjtRQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsa0JBQWtCLENBQ2hCLEtBQXlCLEVBQ3pCLGFBQXlDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoQixNQUFNLDBCQUEwQixHQUFHLHNCQUFzQixDQUFDO1lBQzFELElBQUksZUFBZSxHQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUNFLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEtBQUssMEJBQTBCO2dCQUNuRSxDQUFDLEtBQUssQ0FBQyxVQUFVO2dCQUNqQixLQUFLLENBQUMsU0FBUztnQkFDZixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQzFDO2dCQUNBLGVBQWU7b0JBQ2IsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDcEU7WUFDRCxJQUNFLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEtBQUssMEJBQTBCO2dCQUNuRSxLQUFLLENBQUMsUUFBUTtnQkFDZCxLQUFLLENBQUMsVUFBVTtnQkFDaEIsU0FBUyxFQUNUO2dCQUNBLGVBQWU7b0JBQ2IsZUFBZTt3QkFDZixHQUFHO3dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7Z0JBQ2hDLGVBQWU7b0JBQ2IsZUFBZTt3QkFDZixHQUFHO3dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDaEQ7WUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLGVBQWU7b0JBQ2IsZUFBZTt3QkFDZixHQUFHO3dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEQ7WUFDRCxlQUFlLEdBQUcsZUFBZSxHQUFHLGlCQUFpQixDQUFDO1lBQ3RELE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBeUI7UUFDekMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRSxJQUFJLENBQUMsdUJBQXVCO2lCQUN6QixnQkFBZ0IsRUFBRTtpQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsS0FBSyxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDO2lCQUMvQjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBeUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDN0IsR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQ0UsYUFBYSxDQUFDLDJCQUEyQjtnQkFDekMsS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUNoRTtnQkFDQSxlQUFlLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxlQUFlLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYyxDQUFDLGFBQXlDO1FBQ3RELE9BQU8sYUFBYSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixJQUFJLEtBQUssQ0FBQztJQUMxRSxDQUFDOzsySEFsbUJVLDhCQUE4QjsrR0FBOUIsOEJBQThCLDBKQ3RDM0MsdzdNQXlKQTsyRkRuSGEsOEJBQThCO2tCQUwxQyxTQUFTOytCQUNFLDRCQUE0QixtQkFFckIsdUJBQXVCLENBQUMsTUFBTTtxYkFHcEIsTUFBTTtzQkFBaEMsWUFBWTt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENvbmZpZ3VyYXRvclJvdXRlcixcbiAgQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRGlyZWN0aW9uTW9kZSxcbiAgRGlyZWN0aW9uU2VydmljZSxcbiAgSGFtYnVyZ2VyTWVudVNlcnZpY2UsXG4gIElDT05fVFlQRSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItY29tbW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItZ3JvdXBzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvY29uZmlndXJhdG9yLXN0b3JlZnJvbnQtdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0b3ItZ3JvdXAtbWVudS5jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JFeHBlcnRNb2RlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvY29uZmlndXJhdG9yLWV4cGVydC1tb2RlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItZ3JvdXAtbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItZ3JvdXAtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JHcm91cE1lbnVDb21wb25lbnQge1xuICBAVmlld0NoaWxkcmVuKCdncm91cEl0ZW0nKSBncm91cHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj47XG5cbiAgcm91dGVyRGF0YSQ6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yUm91dGVyLkRhdGE+ID1cbiAgICB0aGlzLmNvbmZpZ1JvdXRlckV4dHJhY3RvclNlcnZpY2UuZXh0cmFjdFJvdXRlckRhdGEoKTtcblxuICBjb25maWd1cmF0aW9uJDogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj4gPVxuICAgIHRoaXMucm91dGVyRGF0YSQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocm91dGVyRGF0YSkgPT5cbiAgICAgICAgdGhpcy5jb25maWdDb21tb25zU2VydmljZVxuICAgICAgICAgIC5nZXRDb25maWd1cmF0aW9uKHJvdXRlckRhdGEub3duZXIpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbmZpZ3VyYXRpb24pID0+ICh7IHJvdXRlckRhdGEsIGNvbmZpZ3VyYXRpb24gfSkpLFxuICAgICAgICAgICAgLy9XZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHRoZSBuYXZpZ2F0aW9uIHRvIGNvbmZsaWN0IGdyb3VwcyBvclxuICAgICAgICAgICAgLy9ncm91cHMgd2l0aCBtYW5kYXRvcnkgYXR0cmlidXRlcyBhbHJlYWR5IGhhcyB0YWtlbiBwbGFjZSwgYXMgdGhpcyBoYXBwZW5zXG4gICAgICAgICAgICAvL2luIGFuIG9uSW5pdCBvZiBhbm90aGVyIGNvbXBvbmVudC5cbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIHdlIHJpc2sgdGhhdCB0aGlzIGNvbXBvbmVudCBpcyBjb21wbGV0ZWx5IGluaXRpYWxpemVkIHRvbyBlYXJseSxcbiAgICAgICAgICAgIC8vaW4gZGV2IG1vZGUgcmVzdWx0aW5nIGluIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3JcbiAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgKGNvbnQpID0+XG4gICAgICAgICAgICAgICAgKGNvbnQuY29uZmlndXJhdGlvbi5jb21wbGV0ZSAmJlxuICAgICAgICAgICAgICAgICAgY29udC5jb25maWd1cmF0aW9uLmNvbnNpc3RlbnQpIHx8XG4gICAgICAgICAgICAgICAgY29udC5jb25maWd1cmF0aW9uLmludGVyYWN0aW9uU3RhdGUuaXNzdWVOYXZpZ2F0aW9uRG9uZSB8fFxuICAgICAgICAgICAgICAgICFjb250LnJvdXRlckRhdGEucmVzb2x2ZUlzc3Vlc1xuICAgICAgICAgICAgKVxuICAgICAgICAgIClcblxuICAgICAgICAgIC5waXBlKG1hcCgoY29udCkgPT4gY29udC5jb25maWd1cmF0aW9uKSlcbiAgICAgIClcbiAgICApO1xuXG4gIGN1cnJlbnRHcm91cCQ6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwPiA9IHRoaXMucm91dGVyRGF0YSQucGlwZShcbiAgICBzd2l0Y2hNYXAoKHJvdXRlckRhdGEpID0+XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuZ2V0Q3VycmVudEdyb3VwKHJvdXRlckRhdGEub3duZXIpXG4gICAgKVxuICApO1xuICAvKipcbiAgICogQ3VycmVudCBwYXJlbnQgZ3JvdXAuIFVuZGVmaW5lZCBmb3IgdG9wIGxldmVsIGdyb3Vwc1xuICAgKi9cbiAgZGlzcGxheWVkUGFyZW50R3JvdXAkOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZD4gPVxuICAgIHRoaXMuY29uZmlndXJhdGlvbiQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY29uZmlndXJhdGlvbikgPT5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLmdldE1lbnVQYXJlbnRHcm91cChjb25maWd1cmF0aW9uLm93bmVyKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgocGFyZW50R3JvdXApID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcmVudEdyb3VwXG4gICAgICAgICAgPyB0aGlzLmdldENvbmRlbnNlZFBhcmVudEdyb3VwKHBhcmVudEdyb3VwKVxuICAgICAgICAgIDogb2YocGFyZW50R3JvdXApO1xuICAgICAgfSlcbiAgICApO1xuXG4gIGRpc3BsYXllZEdyb3VwcyQ6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwW10+ID1cbiAgICB0aGlzLmRpc3BsYXllZFBhcmVudEdyb3VwJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChwYXJlbnRHcm91cCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uJC5waXBlKFxuICAgICAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmVudEdyb3VwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmRlbnNlR3JvdXBzKHBhcmVudEdyb3VwLnN1Ykdyb3Vwcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kZW5zZUdyb3Vwcyhjb25maWd1cmF0aW9uLmdyb3Vwcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG4gIEVSUk9SID0gJyBFUlJPUic7XG4gIENPTVBMRVRFID0gJyBDT01QTEVURSc7XG4gIFdBUk5JTkcgPSAnIFdBUk5JTkcnO1xuICBJQ09OID0gJ0lDT04nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWdDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2U6IENvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGhhbWJ1cmdlck1lbnVTZXJ2aWNlOiBIYW1idXJnZXJNZW51U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnUm91dGVyRXh0cmFjdG9yU2VydmljZTogQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnVXRpbHM6IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ0dyb3VwTWVudVNlcnZpY2U6IENvbmZpZ3VyYXRvckdyb3VwTWVudVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvblNlcnZpY2U6IERpcmVjdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ0V4cGVydE1vZGVTZXJ2aWNlOiBDb25maWd1cmF0b3JFeHBlcnRNb2RlU2VydmljZVxuICApIHt9XG5cbiAgY2xpY2soZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlndXJhdGlvbiQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgIGlmIChjb25maWd1cmF0aW9uLmludGVyYWN0aW9uU3RhdGUuY3VycmVudEdyb3VwID09PSBncm91cC5pZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY29uZmlndXJhdG9yR3JvdXBzU2VydmljZS5oYXNTdWJHcm91cHMoZ3JvdXApKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdG9yR3JvdXBzU2VydmljZS5uYXZpZ2F0ZVRvR3JvdXAoY29uZmlndXJhdGlvbiwgZ3JvdXAuaWQpO1xuICAgICAgICB0aGlzLmhhbWJ1cmdlck1lbnVTZXJ2aWNlLnRvZ2dsZSh0cnVlKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ1V0aWxzLnNjcm9sbFRvQ29uZmlndXJhdGlvbkVsZW1lbnQoXG4gICAgICAgICAgJy5WYXJpYW50Q29uZmlndXJhdGlvblRlbXBsYXRlLCAuQ3BxQ29uZmlndXJhdGlvblRlbXBsYXRlJ1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLnNldE1lbnVQYXJlbnRHcm91cChcbiAgICAgICAgICBjb25maWd1cmF0aW9uLm93bmVyLFxuICAgICAgICAgIGdyb3VwLmlkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuYXZpZ2F0ZVVwKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheWVkUGFyZW50R3JvdXAkXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZGlzcGxheWVkUGFyZW50R3JvdXApID0+IHtcbiAgICAgICAgLy93ZSBvbmx5IG5hdmlnYXRlIHVwIGlmIHdlIGFyZSBub3Qgb24gYSBzdWIgbGV2ZWwgZ3JvdXBcbiAgICAgICAgaWYgKGRpc3BsYXllZFBhcmVudEdyb3VwKSB7XG4gICAgICAgICAgY29uc3QgZ3JhbmRQYXJlbnRHcm91cCQgPSB0aGlzLmdldFBhcmVudEdyb3VwKGRpc3BsYXllZFBhcmVudEdyb3VwKTtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24kLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChjb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgICAgICBncmFuZFBhcmVudEdyb3VwJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoZ3JhbmRQYXJlbnRHcm91cCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2Uuc2V0TWVudVBhcmVudEdyb3VwKFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24ub3duZXIsXG4gICAgICAgICAgICAgICAgZ3JhbmRQYXJlbnRHcm91cCA/IGdyYW5kUGFyZW50R3JvdXAuaWQgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIG51bWJlciBvZiBjb25mbGljdHMgZm9yIHRoZSBjdXJyZW50IGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBDdXJyZW50IGdyb3VwXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBudW1iZXIgb2YgY29uZmxpY3RzXG4gICAqL1xuICBnZXRDb25mbGljdE51bWJlcihncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogc3RyaW5nIHtcbiAgICBpZiAoXG4gICAgICBncm91cCAmJlxuICAgICAgZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUFxuICAgICkge1xuICAgICAgcmV0dXJuICcoJyArIGdyb3VwLnN1Ykdyb3Vwcy5sZW5ndGggKyAnKSc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjdXJyZW50IGdyb3VwIGhhcyBzdWJncm91cHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEN1cnJlbnQgZ3JvdXBcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSBSZXR1cm5zICd0cnVlJyBpZiB0aGUgY3VycmVudCBncm91cCBoYXMgYSBzdWJncm91cHMsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKi9cbiAgaGFzU3ViR3JvdXBzKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLmhhc1N1Ykdyb3Vwcyhncm91cCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIG9ic2VydmFibGUgb2YgcGFyZW50IGdyb3VwIGZvciBhIGdyb3VwXG4gICAqIEBwYXJhbSBncm91cFxuICAgKiBAcmV0dXJucyBQYXJlbnQgZ3JvdXAsIHVuZGVmaW5lZCBpbiBjYXNlIGlucHV0IGdyb3VwIGlzIGFscmVhZHkgb24gcm9vdCBsZXZlbFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFBhcmVudEdyb3VwKFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXBcbiAgKTogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uJC5waXBlKFxuICAgICAgbWFwKChjb25maWd1cmF0aW9uKSA9PlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuZ2V0UGFyZW50R3JvdXAoXG4gICAgICAgICAgY29uZmlndXJhdGlvbi5ncm91cHMsXG4gICAgICAgICAgZ3JvdXBcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXRDb25kZW5zZWRQYXJlbnRHcm91cChcbiAgICBwYXJlbnRHcm91cDogQ29uZmlndXJhdG9yLkdyb3VwXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKFxuICAgICAgcGFyZW50R3JvdXAgJiZcbiAgICAgIHBhcmVudEdyb3VwLnN1Ykdyb3VwcyAmJlxuICAgICAgcGFyZW50R3JvdXAuc3ViR3JvdXBzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgcGFyZW50R3JvdXAuZ3JvdXBUeXBlICE9PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUFxuICAgICkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyZW50R3JvdXAocGFyZW50R3JvdXApLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoZ3JvdXApID0+IHtcbiAgICAgICAgICByZXR1cm4gZ3JvdXAgPyB0aGlzLmdldENvbmRlbnNlZFBhcmVudEdyb3VwKGdyb3VwKSA6IG9mKGdyb3VwKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihwYXJlbnRHcm91cCk7XG4gICAgfVxuICB9XG5cbiAgY29uZGVuc2VHcm91cHMoZ3JvdXBzOiBDb25maWd1cmF0b3IuR3JvdXBbXSk6IENvbmZpZ3VyYXRvci5Hcm91cFtdIHtcbiAgICByZXR1cm4gZ3JvdXBzLmZsYXRNYXAoKGdyb3VwKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGdyb3VwLnN1Ykdyb3Vwcy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgZ3JvdXAuZ3JvdXBUeXBlICE9PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRlbnNlR3JvdXBzKGdyb3VwLnN1Ykdyb3Vwcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGdyb3VwIGhhcyBiZWVuIHZpc2l0ZWQgYW5kIGlmIHRoZSBncm91cCBpcyBub3QgYSBjb25mbGljdCBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gQ3VycmVudCBncm91cFxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGJvb2xlYW4+fSAtIHRydWUgaWYgdmlzaXRlZCBhbmQgbm90IGEgY29uZmxpY3QgZ3JvdXBcbiAgICovXG4gIGlzR3JvdXBWaXNpdGVkKFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdG9yR3JvdXBzU2VydmljZVxuICAgICAgLmlzR3JvdXBWaXNpdGVkKGNvbmZpZ3VyYXRpb24ub3duZXIsIGdyb3VwLmlkKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoaXNWaXNpdGVkKSA9PlxuICAgICAgICAgICAgaXNWaXNpdGVkICYmXG4gICAgICAgICAgICAhdGhpcy5pc0NvbmZsaWN0R3JvdXBUeXBlKFxuICAgICAgICAgICAgICBncm91cC5ncm91cFR5cGUgPz8gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5BVFRSSUJVVEVfR1JPVVBcbiAgICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjdXJyZW50IGdyb3VwIGlzIGNvbmZsaWN0IG9uZS5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXBUeXBlfSBncm91cFR5cGUgLSBHcm91cCB0eXBlXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ1RydWUnIGlmIHRoZSBjdXJyZW50IGdyb3VwIGlzIGNvbmZsaWN0IG9uZSwgb3RoZXJ3aXNlICdmYWxzZScuXG4gICAqL1xuICBpc0NvbmZsaWN0R3JvdXBUeXBlKGdyb3VwVHlwZTogQ29uZmlndXJhdG9yLkdyb3VwVHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuaXNDb25mbGljdEdyb3VwVHlwZShncm91cFR5cGUpO1xuICB9XG5cbiAgLy9UT0RPKENYU1BBLTMzOTIpIGdldCByaWQgb2YgdGhpcyBtZXRob2QgaW4gbmV4dCBtYWpvci4gQ2hhbmdlIHNpZ25hdHVyZSBvZlxuICAvL2lzQ29uZmxpY3RHcm91cFR5cGUgdG8gYWxsb3cgdW5kZWZpbmVkLCBhbmQgdXNlIHRoaXMgbWV0aG9kIGluc3RlYWRcbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgY29uZmxpY3Qgb25lIGJ1dCBhbGxvd3MgZm9yIHVuZGVmaW5lZCBpbnB1dFxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cFR5cGV9IGdyb3VwVHlwZSAtIEdyb3VwIHR5cGVcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSAnVHJ1ZScgaWYgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgY29uZmxpY3Qgb25lLCBvdGhlcndpc2UgJ2ZhbHNlJy5cbiAgICovXG4gIGlzQ29uZmxpY3RHcm91cFR5cGVBbGxvd2luZ1VuZGVmaW5lZChcbiAgICBncm91cFR5cGU6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUgfCB1bmRlZmluZWRcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyb3VwVHlwZVxuICAgICAgPyB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuaXNDb25mbGljdEdyb3VwVHlwZShncm91cFR5cGUpXG4gICAgICA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBncm91cCBpcyBjb25mbGljdCBoZWFkZXIgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEN1cnJlbnQgZ3JvdXBcbiAgICogIEByZXR1cm4ge2Jvb2xlYW59IC0gUmV0dXJucyAndHJ1ZScgaWYgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgY29uZmxpY3QgaGVhZGVyIGdyb3VwLCBvdGhlcndpc2UgJ2ZhbHNlJy5cbiAgICovXG4gIGlzQ29uZmxpY3RIZWFkZXIoZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBncm91cCAmJiBncm91cC5ncm91cFR5cGUgPT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfSEVBREVSX0dST1VQXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgZ3JvdXAgaXMgY29uZmxpY3QgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEN1cnJlbnQgZ3JvdXBcbiAgICogIEByZXR1cm4ge2Jvb2xlYW59IC0gUmV0dXJucyAndHJ1ZScgaWYgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgY29uZmxpY3QgZ3JvdXAsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKi9cbiAgaXNDb25mbGljdEdyb3VwKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ3JvdXAgJiYgZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZ3JvdXAtc3RhdHVzIHN0eWxlIGNsYXNzZXMgZGVwZW5kZW50IG9uIGNvbXBsZXRlbmVzcywgY29uZmxpY3RzLCB2aXNpdGVkIHN0YXR1cyBhbmQgY29uZmlndXJhdG9yIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEN1cnJlbnQgZ3JvdXBcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxib29sZWFuPn0gLSB0cnVlIGlmIHZpc2l0ZWQgYW5kIG5vdCBhIGNvbmZsaWN0IGdyb3VwXG4gICAqL1xuICBnZXRHcm91cFN0YXR1c1N0eWxlcyhcbiAgICBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwLFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uXG4gICk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNHcm91cFZpc2l0ZWQoZ3JvdXAsIGNvbmZpZ3VyYXRpb24pLnBpcGUoXG4gICAgICBtYXAoKGlzVmlzaXRlZCkgPT4ge1xuICAgICAgICBjb25zdCBDTE9VRENQUV9DT05GSUdVUkFUT1JfVFlQRSA9ICdDTE9VRENQUUNPTkZJR1VSQVRPUic7XG4gICAgICAgIGxldCBncm91cFN0YXR1c1N0eWxlOiBzdHJpbmcgPSAnY3gtbWVudS1pdGVtJztcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24ub3duZXIuY29uZmlndXJhdG9yVHlwZSAhPT0gQ0xPVURDUFFfQ09ORklHVVJBVE9SX1RZUEUgJiZcbiAgICAgICAgICAhZ3JvdXAuY29uc2lzdGVudFxuICAgICAgICApIHtcbiAgICAgICAgICBncm91cFN0YXR1c1N0eWxlID0gZ3JvdXBTdGF0dXNTdHlsZSArIHRoaXMuV0FSTklORztcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgY29uZmlndXJhdGlvbi5vd25lci5jb25maWd1cmF0b3JUeXBlICE9PSBDTE9VRENQUV9DT05GSUdVUkFUT1JfVFlQRSAmJlxuICAgICAgICAgIGdyb3VwLmNvbXBsZXRlICYmXG4gICAgICAgICAgZ3JvdXAuY29uc2lzdGVudCAmJlxuICAgICAgICAgIGlzVmlzaXRlZFxuICAgICAgICApIHtcbiAgICAgICAgICBncm91cFN0YXR1c1N0eWxlID0gZ3JvdXBTdGF0dXNTdHlsZSArIHRoaXMuQ09NUExFVEU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFncm91cC5jb21wbGV0ZSAmJiBpc1Zpc2l0ZWQpIHtcbiAgICAgICAgICBncm91cFN0YXR1c1N0eWxlID0gZ3JvdXBTdGF0dXNTdHlsZSArIHRoaXMuRVJST1I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwU3RhdHVzU3R5bGU7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNMVFJEaXJlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uU2VydmljZS5nZXREaXJlY3Rpb24oKSA9PT0gRGlyZWN0aW9uTW9kZS5MVFI7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNSVExEaXJlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uU2VydmljZS5nZXREaXJlY3Rpb24oKSA9PT0gRGlyZWN0aW9uTW9kZS5SVEw7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgdXNlciBuYXZpZ2F0ZXMgaW50byBhIHN1Ymdyb3VwIG9mIHRoZSBtYWluIGdyb3VwIG1lbnUuXG4gICAqXG4gICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBLZXlib2FyZCBldmVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSd0cnVlJyBpZiB0aGUgdXNlciBuYXZpZ2F0ZXMgaW50byB0aGUgc3ViZ3JvdXAsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNGb3J3YXJkc05hdmlnYXRpb24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1JpZ2h0JyAmJiB0aGlzLmlzTFRSRGlyZWN0aW9uKCkpIHx8XG4gICAgICAoZXZlbnQuY29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgdGhpcy5pc1JUTERpcmVjdGlvbigpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgdXNlciBuYXZpZ2F0ZXMgZnJvbSBhIHN1Ymdyb3VwIGJhY2sgdG8gdGhlIG1haW4gZ3JvdXAgbWVudS5cbiAgICpcbiAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIEtleWJvYXJkIGV2ZW50XG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtJ3RydWUnIGlmIHRoZSB1c2VyIG5hdmlnYXRlcyBiYWNrIGludG8gdGhlIG1haW4gZ3JvdXAgbWVudSwgb3RoZXJ3aXNlICdmYWxzZScuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBpc0JhY2tOYXZpZ2F0aW9uKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIChldmVudC5jb2RlID09PSAnQXJyb3dMZWZ0JyAmJiB0aGlzLmlzTFRSRGlyZWN0aW9uKCkpIHx8XG4gICAgICAoZXZlbnQuY29kZSA9PT0gJ0Fycm93UmlnaHQnICYmIHRoaXMuaXNSVExEaXJlY3Rpb24oKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRoZSBncm91cCBvbiBwcmVzc2luZyBhbiBhcnJvdyBrZXkuXG4gICAqXG4gICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBLZXlib2FyZCBldmVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJbmRleCAtIEdyb3VwIGluZGV4XG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSB0YXJnZXRHcm91cCAtIFRhcmdldCBncm91cFxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gY3VycmVudEdyb3VwIC0gQ3VycmVudCBncm91cFxuICAgKi9cbiAgc3dpdGNoR3JvdXBPbkFycm93UHJlc3MoXG4gICAgZXZlbnQ6IEtleWJvYXJkRXZlbnQsXG4gICAgZ3JvdXBJbmRleDogbnVtYmVyLFxuICAgIHRhcmdldEdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgY3VycmVudEdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXBcbiAgKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1VwJyB8fCBldmVudC5jb2RlID09PSAnQXJyb3dEb3duJykge1xuICAgICAgdGhpcy5jb25maWdHcm91cE1lbnVTZXJ2aWNlLnN3aXRjaEdyb3VwT25BcnJvd1ByZXNzKFxuICAgICAgICBldmVudCxcbiAgICAgICAgZ3JvdXBJbmRleCxcbiAgICAgICAgdGhpcy5ncm91cHNcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRm9yd2FyZHNOYXZpZ2F0aW9uKGV2ZW50KSkge1xuICAgICAgaWYgKHRhcmdldEdyb3VwICYmIHRoaXMuaGFzU3ViR3JvdXBzKHRhcmdldEdyb3VwKSkge1xuICAgICAgICB0aGlzLmNsaWNrKHRhcmdldEdyb3VwKTtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0ZvclN1Ykdyb3VwKHRhcmdldEdyb3VwLCBjdXJyZW50R3JvdXAuaWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0JhY2tOYXZpZ2F0aW9uKGV2ZW50KSkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnR3JvdXBNZW51U2VydmljZS5pc0JhY2tCdG5Gb2N1c2VkKHRoaXMuZ3JvdXBzKSkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlVXAoKTtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0Zvck1haW5NZW51KGN1cnJlbnRHcm91cC5pZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcnNpc3RzIHRoZSBrZXlib2FyZCBmb2N1cyBzdGF0ZSBmb3IgdGhlIGdpdmVuIGtleVxuICAgKiBmcm9tIHRoZSBtYWluIGdyb3VwIG1lbnUgYnkgYmFjayBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudEdyb3VwSWQgLSBDdXJyZW50IGdyb3VwIElEXG4gICAqL1xuICBzZXRGb2N1c0Zvck1haW5NZW51KGN1cnJlbnRHcm91cElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGtleTogc3RyaW5nIHwgdW5kZWZpbmVkID0gY3VycmVudEdyb3VwSWQ7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgY29uZmlndXJhdGlvbi5ncm91cHM/LmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBncm91cC5zdWJHcm91cHM/Lmxlbmd0aCAhPT0gMSAmJlxuICAgICAgICAgICh0aGlzLmlzR3JvdXBTZWxlY3RlZChncm91cC5pZCwgY3VycmVudEdyb3VwSWQpIHx8XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5zU2VsZWN0ZWRHcm91cChncm91cCwgY3VycmVudEdyb3VwSWQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBrZXkgPSBncm91cC5pZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5jb25maWdVdGlscy5zZXRGb2N1cyhrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcnNpc3RzIHRoZSBrZXlib2FyZCBmb2N1cyBzdGF0ZSBmb3IgdGhlIGdpdmVuIGtleVxuICAgKiBmcm9tIHRoZSBzdWJncm91cCBtZW51IGJ5IGZvcndhcmRzIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEdyb3VwXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50R3JvdXBJZCAtIEN1cnJlbnQgZ3JvdXAgSURcbiAgICovXG4gIHNldEZvY3VzRm9yU3ViR3JvdXAoXG4gICAgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCxcbiAgICBjdXJyZW50R3JvdXBJZD86IHN0cmluZ1xuICApOiB2b2lkIHtcbiAgICBsZXQga2V5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnY3gtbWVudS1iYWNrJztcbiAgICBpZiAodGhpcy5jb250YWluc1NlbGVjdGVkR3JvdXAoZ3JvdXAsIGN1cnJlbnRHcm91cElkKSkge1xuICAgICAga2V5ID0gY3VycmVudEdyb3VwSWQ7XG4gICAgfVxuICAgIHRoaXMuY29uZmlnVXRpbHMuc2V0Rm9jdXMoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBwYXJlbnQgZ3JvdXAgY29udGFpbnMgYSBzZWxlY3RlZCBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gR3JvdXBcbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRHcm91cElkIC0gQ3VycmVudCBncm91cCBJRFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSAndHJ1ZScgaWYgdGhlIHBhcmVudCBncm91cCBjb250YWlucyBhIHNlbGVjdGVkIGdyb3VwLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgY29udGFpbnNTZWxlY3RlZEdyb3VwKFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgY3VycmVudEdyb3VwSWQ/OiBzdHJpbmdcbiAgKTogYm9vbGVhbiB7XG4gICAgbGV0IGlzQ3VycmVudEdyb3VwRm91bmQgPSBmYWxzZTtcbiAgICBncm91cC5zdWJHcm91cHM/LmZvckVhY2goKHN1Ykdyb3VwKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0dyb3VwU2VsZWN0ZWQoc3ViR3JvdXAuaWQsIGN1cnJlbnRHcm91cElkKSkge1xuICAgICAgICBpc0N1cnJlbnRHcm91cEZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaXNDdXJyZW50R3JvdXBGb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHRhYiBpbmRleCBkZXBlbmRpbmcgb24gaWYgdGhlIHRoZSBjdXJyZW50IGdyb3VwIGlzIHNlbGVjdGVkXG4gICAqIG9yIHRoZSBwYXJlbnQgZ3JvdXAgY29udGFpbnMgdGhlIHNlbGVjdGVkIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBHcm91cFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudEdyb3VwSWQgLSBDdXJyZW50IGdyb3VwIElEXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGFiIGluZGV4XG4gICAqL1xuICBnZXRUYWJJbmRleChncm91cDogQ29uZmlndXJhdG9yLkdyb3VwLCBjdXJyZW50R3JvdXBJZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5pc0dyb3VwU2VsZWN0ZWQoZ3JvdXAuaWQsIGN1cnJlbnRHcm91cElkKSAmJlxuICAgICAgIXRoaXMuY29udGFpbnNTZWxlY3RlZEdyb3VwKGdyb3VwLCBjdXJyZW50R3JvdXBJZClcbiAgICApIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgc2VsZWN0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gZ3JvdXAgSURcbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRHcm91cElkIC0gQ3VycmVudCBncm91cCBJRFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSAndHJ1ZScgaWYgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgc2VsZWN0ZWQsIG90aGVyd2lzZSAnZmFsc2UnXG4gICAqL1xuICBpc0dyb3VwU2VsZWN0ZWQoZ3JvdXBJZD86IHN0cmluZywgY3VycmVudEdyb3VwSWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ3JvdXBJZCA9PT0gY3VycmVudEdyb3VwSWQ7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgZ3JvdXAgSUQgZm9yIGFyaWEtY29udHJvbHMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gZ3JvdXAgSURcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH0gLSBnZW5lcmF0ZWQgZ3JvdXAgSURcbiAgICovXG4gIGNyZWF0ZUFyaWFDb250cm9scyhncm91cElkPzogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdVdGlscy5jcmVhdGVHcm91cElkKGdyb3VwSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhcmlhLWxhYmVsIGZvciBncm91cCBtZW51IGl0ZW1cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gZ3JvdXBcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH0gLSBnZW5lcmF0ZWQgZ3JvdXAgSURcbiAgICovXG4gIGdldEFyaWFMYWJlbChncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogc3RyaW5nIHtcbiAgICBsZXQgdHJhbnNsYXRlZFRleHQgPSAnJztcbiAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAuZ3JvdXBUeXBlICYmIHRoaXMuaXNDb25mbGljdEdyb3VwVHlwZShncm91cC5ncm91cFR5cGUpKSB7XG4gICAgICBpZiAodGhpcy5pc0NvbmZsaWN0SGVhZGVyKGdyb3VwKSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkuY29uZmxpY3RzSW5Db25maWd1cmF0aW9uJywge1xuICAgICAgICAgICAgbnVtYmVyT2ZDb25mbGljdHM6IHRoaXMuZ2V0Q29uZmxpY3ROdW1iZXIoZ3JvdXApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodHJhbnNsYXRlZFRleHQgPSB0ZXh0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2xhdGVkVGV4dCA9IGdyb3VwLmRlc2NyaXB0aW9uID8gZ3JvdXAuZGVzY3JpcHRpb24gOiAnJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYTExeS5ncm91cE5hbWUnLCB7XG4gICAgICAgICAgZ3JvdXA6IGdyb3VwLmRlc2NyaXB0aW9uLFxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodHJhbnNsYXRlZFRleHQgPSB0ZXh0KSk7XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2xhdGVkVGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gaWQgZm9yIGljb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge0lDT05fVFlQRX0gdHlwZSAtIGljb24gdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIGdyb3VwIGlkXG4gICAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWR9IC0gZ2VuZXJhdGVkIGljb24gaWRcbiAgICovXG4gIGNyZWF0ZUljb25JZCh0eXBlOiBJQ09OX1RZUEUsIGdyb3VwSWQ/OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLklDT04gKyB0eXBlICsgZ3JvdXBJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYXJpYS1kZXNjcmliZWRieVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBDdXJyZW50IGdyb3VwXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8c3RyaW5nPn0gLSBhcmlhLWRlc2NyaWJlZGJ5XG4gICAqL1xuICBnZXRBcmlhRGVzY3JpYmVkYnkoXG4gICAgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCxcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmlzR3JvdXBWaXNpdGVkKGdyb3VwLCBjb25maWd1cmF0aW9uKS5waXBlKFxuICAgICAgbWFwKChpc1Zpc2l0ZWQpID0+IHtcbiAgICAgICAgY29uc3QgQ0xPVURDUFFfQ09ORklHVVJBVE9SX1RZUEUgPSAnQ0xPVURDUFFDT05GSUdVUkFUT1InO1xuICAgICAgICBsZXQgYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24ub3duZXIuY29uZmlndXJhdG9yVHlwZSAhPT0gQ0xPVURDUFFfQ09ORklHVVJBVE9SX1RZUEUgJiZcbiAgICAgICAgICAhZ3JvdXAuY29uc2lzdGVudCAmJlxuICAgICAgICAgIGdyb3VwLmdyb3VwVHlwZSAmJlxuICAgICAgICAgICF0aGlzLmlzQ29uZmxpY3RHcm91cFR5cGUoZ3JvdXAuZ3JvdXBUeXBlKVxuICAgICAgICApIHtcbiAgICAgICAgICBhcmlhRGVzY3JpYmVkYnkgPVxuICAgICAgICAgICAgYXJpYURlc2NyaWJlZGJ5ICsgdGhpcy5jcmVhdGVJY29uSWQoSUNPTl9UWVBFLldBUk5JTkcsIGdyb3VwLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgY29uZmlndXJhdGlvbi5vd25lci5jb25maWd1cmF0b3JUeXBlICE9PSBDTE9VRENQUV9DT05GSUdVUkFUT1JfVFlQRSAmJlxuICAgICAgICAgIGdyb3VwLmNvbXBsZXRlICYmXG4gICAgICAgICAgZ3JvdXAuY29uc2lzdGVudCAmJlxuICAgICAgICAgIGlzVmlzaXRlZFxuICAgICAgICApIHtcbiAgICAgICAgICBhcmlhRGVzY3JpYmVkYnkgPVxuICAgICAgICAgICAgYXJpYURlc2NyaWJlZGJ5ICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUljb25JZChJQ09OX1RZUEUuU1VDQ0VTUywgZ3JvdXAuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZ3JvdXAuY29tcGxldGUgJiYgaXNWaXNpdGVkKSB7XG4gICAgICAgICAgYXJpYURlc2NyaWJlZGJ5ID1cbiAgICAgICAgICAgIGFyaWFEZXNjcmliZWRieSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJY29uSWQoSUNPTl9UWVBFLkVSUk9SLCBncm91cC5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzU3ViR3JvdXBzKGdyb3VwKSkge1xuICAgICAgICAgIGFyaWFEZXNjcmliZWRieSA9XG4gICAgICAgICAgICBhcmlhRGVzY3JpYmVkYnkgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSWNvbklkKElDT05fVFlQRS5DQVJFVF9SSUdIVCwgZ3JvdXAuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGFyaWFEZXNjcmliZWRieSA9IGFyaWFEZXNjcmliZWRieSArICcgaW5MaXN0T2ZHcm91cHMnO1xuICAgICAgICByZXR1cm4gYXJpYURlc2NyaWJlZGJ5O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0R3JvdXBNZW51VGl0bGUoZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IHRpdGxlID0gZ3JvdXAuZGVzY3JpcHRpb247XG4gICAgaWYgKCF0aGlzLmlzQ29uZmxpY3RIZWFkZXIoZ3JvdXApICYmICF0aGlzLmlzQ29uZmxpY3RHcm91cChncm91cCkpIHtcbiAgICAgIHRoaXMuY29uZmlnRXhwZXJ0TW9kZVNlcnZpY2VcbiAgICAgICAgLmdldEV4cE1vZGVBY3RpdmUoKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChleHBNb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKGV4cE1vZGUpIHtcbiAgICAgICAgICAgIHRpdGxlICs9IGAgLyBbJHtncm91cC5uYW1lfV1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZTtcbiAgfVxuXG4gIGRpc3BsYXlNZW51SXRlbShncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbiQucGlwZShcbiAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICBsZXQgZGlzcGxheU1lbnVJdGVtID0gdHJ1ZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24uaW1tZWRpYXRlQ29uZmxpY3RSZXNvbHV0aW9uICYmXG4gICAgICAgICAgZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUFxuICAgICAgICApIHtcbiAgICAgICAgICBkaXNwbGF5TWVudUl0ZW0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlzcGxheU1lbnVJdGVtO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjb25mbGljdCBzb2x2ZXIgZGlhbG9nIGlzIGFjdGl2ZVxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyBDb25mbGljdCBzb2x2ZXIgZGlhbG9nIGFjdGl2ZT9cbiAgICovXG4gIGlzRGlhbG9nQWN0aXZlKGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24uaW50ZXJhY3Rpb25TdGF0ZS5zaG93Q29uZmxpY3RTb2x2ZXJEaWFsb2cgPz8gZmFsc2U7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJjb25maWd1cmF0aW9uJCB8IGFzeW5jIGFzIGNvbmZpZ3VyYXRpb247IGVsc2UgZ2hvc3RHcm91cHNcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0RpYWxvZ0FjdGl2ZShjb25maWd1cmF0aW9uKTsgZWxzZSBnaG9zdEdyb3Vwc1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjeC1ncm91cC1tZW51XCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgIDxzcGFuIGlkPVwibGlzdE9mR3JvdXBzXCIgY2xhc3M9XCJjeC12aXN1YWxseS1oaWRkZW5cIj5cbiAgICAgICAge3sgJ2NvbmZpZ3VyYXRvci5hMTF5Lmxpc3RPZkdyb3VwcycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gaWQ9XCJpbkxpc3RPZkdyb3Vwc1wiIGNsYXNzPVwiY3gtdmlzdWFsbHktaGlkZGVuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIHt7ICdjb25maWd1cmF0b3IuYTExeS5pbkxpc3RPZkdyb3VwcycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9zcGFuPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXllZEdyb3VwcyQgfCBhc3luYyBhcyBncm91cHNcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRHcm91cCQgfCBhc3luYyBhcyBjdXJyZW50R3JvdXBcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBncm91cCBvZiBncm91cHM7IGxldCBncm91cEluZGV4ID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5ZWRQYXJlbnRHcm91cCQgfCBhc3luYyBhcyBwYXJlbnRHcm91cFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJwYXJlbnRHcm91cCAhPT0gbnVsbCAmJiBncm91cEluZGV4ID09PSAwXCJcbiAgICAgICAgICAgICAgICAjZ3JvdXBJdGVtXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjeC1tZW51LWJhY2tcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgICAgICBpc0NvbmZsaWN0R3JvdXBUeXBlQWxsb3dpbmdVbmRlZmluZWQocGFyZW50R3JvdXAuZ3JvdXBUeXBlKVxuICAgICAgICAgICAgICAgICAgICA/ICgnY29uZmlndXJhdG9yLmExMXkuY29uZmxpY3RCYWNrJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICAgICAgICAgICAgICA6ICgnY29uZmlndXJhdG9yLmExMXkuZ3JvdXBCYWNrJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cImxpc3RPZkdyb3Vwc1wiXG4gICAgICAgICAgICAgICAgW2N4Rm9jdXNdPVwieyBrZXk6ICdjeC1tZW51LWJhY2snIH1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJuYXZpZ2F0ZVVwKClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIlxuICAgICAgICAgICAgICAgICAgc3dpdGNoR3JvdXBPbkFycm93UHJlc3MoXG4gICAgICAgICAgICAgICAgICAgICRldmVudCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHcm91cFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuQ0FSRVRfTEVGVFwiPjwvY3gtaWNvbj5cbiAgICAgICAgICAgICAgICB7eyAnY29uZmlndXJhdG9yLmJ1dHRvbi5iYWNrJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheU1lbnVJdGVtKGdyb3VwKSB8IGFzeW5jXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAjZ3JvdXBJdGVtXG4gICAgICAgICAgICAgICAgaWQ9XCJ7eyBncm91cC5pZCB9fVwiXG4gICAgICAgICAgICAgICAgbmdDbGFzcz1cInt7XG4gICAgICAgICAgICAgICAgICBnZXRHcm91cFN0YXR1c1N0eWxlcyhncm91cCwgY29uZmlndXJhdGlvbikgfCBhc3luY1xuICAgICAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuRElTQUJMRURdPVwiIWdyb3VwLmNvbmZpZ3VyYWJsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmN4LW1lbnUtY29uZmxpY3RdPVwiXG4gICAgICAgICAgICAgICAgICBpc0NvbmZsaWN0R3JvdXBUeXBlQWxsb3dpbmdVbmRlZmluZWQoZ3JvdXAuZ3JvdXBUeXBlKVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0dyb3VwU2VsZWN0ZWQoZ3JvdXAuaWQsIGN1cnJlbnRHcm91cC5pZClcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlXT1cIiFncm91cC5jb25maWd1cmFibGVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiXG4gICAgICAgICAgICAgICAgICBnZXRBcmlhRGVzY3JpYmVkYnkoZ3JvdXAsIGNvbmZpZ3VyYXRpb24pIHwgYXN5bmNcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiXG4gICAgICAgICAgICAgICAgICBpc0dyb3VwU2VsZWN0ZWQoZ3JvdXAuaWQsIGN1cnJlbnRHcm91cC5pZClcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiXG4gICAgICAgICAgICAgICAgICBpc0dyb3VwU2VsZWN0ZWQoZ3JvdXAuaWQsIGN1cnJlbnRHcm91cC5pZClcbiAgICAgICAgICAgICAgICAgICAgPyBjcmVhdGVBcmlhQ29udHJvbHMoZ3JvdXAuaWQpXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRBcmlhTGFiZWwoZ3JvdXApXCJcbiAgICAgICAgICAgICAgICBbY3hGb2N1c109XCJ7XG4gICAgICAgICAgICAgICAgICBrZXk6IGdyb3VwLmlkXG4gICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsaWNrKGdyb3VwKVwiXG4gICAgICAgICAgICAgICAgW3RhYmluZGV4XT1cImdldFRhYkluZGV4KGdyb3VwLCBjdXJyZW50R3JvdXAuaWQpXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJcbiAgICAgICAgICAgICAgICAgIHN3aXRjaEdyb3VwT25BcnJvd1ByZXNzKFxuICAgICAgICAgICAgICAgICAgICAkZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50R3JvdXBcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gdGl0bGU9XCJ7eyBncm91cC5kZXNjcmlwdGlvbiB9fVwiPnt7XG4gICAgICAgICAgICAgICAgICBnZXRHcm91cE1lbnVUaXRsZShncm91cClcbiAgICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBJbmRpY2F0b3JzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmxpY3ROdW1iZXJJbmRpY2F0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgZ2V0Q29uZmxpY3ROdW1iZXIoZ3JvdXApIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncm91cFN0YXR1c0luZGljYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICA8Y3gtaWNvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiV0FSTklOR1wiXG4gICAgICAgICAgICAgICAgICAgICAgW3R5cGVdPVwiaWNvblR5cGVzLldBUk5JTkdcIlxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwie3sgY3JlYXRlSWNvbklkKGljb25UeXBlcy5XQVJOSU5HLCBncm91cC5pZCkgfX1cIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkuaWNvbkNvbmZsaWN0JyB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cInt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlndXJhdG9yLmljb24uZ3JvdXBDb25mbGljdCcgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgICAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvY3gtaWNvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyb3VwU3RhdHVzSW5kaWNhdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjeC1pY29uXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJFUlJPUlwiXG4gICAgICAgICAgICAgICAgICAgICAgW3R5cGVdPVwiaWNvblR5cGVzLkVSUk9SXCJcbiAgICAgICAgICAgICAgICAgICAgICBpZD1cInt7IGNyZWF0ZUljb25JZChpY29uVHlwZXMuRVJST1IsIGdyb3VwLmlkKSB9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5pY29uSW5jb21wbGV0ZScgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJ7e1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmZpZ3VyYXRvci5pY29uLmdyb3VwSW5jb21wbGV0ZScgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgICAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvY3gtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPGN4LWljb25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIkNPTVBMRVRFXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdHlwZV09XCJpY29uVHlwZXMuU1VDQ0VTU1wiXG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ7eyBjcmVhdGVJY29uSWQoaWNvblR5cGVzLlNVQ0NFU1MsIGdyb3VwLmlkKSB9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5pY29uQ29tcGxldGUnIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwie3tcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb25maWd1cmF0b3IuaWNvbi5ncm91cENvbXBsZXRlJyB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgICAgICAgICAgICAgfX1cIlxuICAgICAgICAgICAgICAgICAgICA+PC9jeC1pY29uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViR3JvdXBJbmRpY2F0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAgPGN4LWljb25cbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc1N1Ykdyb3Vwcyhncm91cClcIlxuICAgICAgICAgICAgICAgICAgICAgIFt0eXBlXT1cImljb25UeXBlcy5DQVJFVF9SSUdIVFwiXG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ7eyBjcmVhdGVJY29uSWQoaWNvblR5cGVzLkNBUkVUX1JJR0hULCBncm91cC5pZCkgfX1cIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkuaWNvblN1Ykdyb3VwJyB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cInt7ICdjb25maWd1cmF0b3IuaWNvbi5zdWJncm91cCcgfCBjeFRyYW5zbGF0ZSB9fVwiXG4gICAgICAgICAgICAgICAgICAgID48L2N4LWljb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj4gPC9uZy1jb250YWluZXJcbj48L25nLWNvbnRhaW5lcj5cbjxuZy10ZW1wbGF0ZSAjZ2hvc3RHcm91cHM+XG4gIDxkaXYgY2xhc3M9XCJjeC1naG9zdC1ncm91cC1tZW51XCI+XG4gICAgPGRpdlxuICAgICAgKm5nRm9yPVwibGV0IG51bWJlciBvZiBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV1cIlxuICAgICAgY2xhc3M9XCJjeC1naG9zdC1tZW51LWl0ZW1cIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJjeC1naG9zdC1pdGVtLXRpdGxlIGdob3N0XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==