/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, inject, isDevMode, Optional, } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { delay, filter, map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../service/configurator-storefront-utils.service";
import * as i2 from "../../../core/facade/configurator-commons.service";
import * as i3 from "../../../core/facade/configurator-groups.service";
import * as i4 from "../../config/configurator-ui-settings.config";
import * as i5 from "../composition/configurator-attribute-composition.model";
import * as i6 from "@spartacus/core";
import * as i7 from "@angular/common";
import * as i8 from "@spartacus/storefront";
export class ConfiguratorAttributeHeaderComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtils, configuratorCommonsService, configuratorGroupsService, configuratorUiSettings, attributeComponentContext, 
    // TODO (CXSPA-3392): for next major release remove featureConfigService
    featureConfigService) {
        super();
        this.configUtils = configUtils;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configuratorUiSettings = configuratorUiSettings;
        this.attributeComponentContext = attributeComponentContext;
        this.featureConfigService = featureConfigService;
        this.iconTypes = ICON_TYPE;
        this.logger = inject(LoggerService);
        this.attribute = attributeComponentContext.attribute;
        this.owner = attributeComponentContext.owner;
        this.groupId = attributeComponentContext.group.id;
        this.groupType =
            attributeComponentContext.group.groupType ??
                Configurator.GroupType.ATTRIBUTE_GROUP;
        this.expMode = attributeComponentContext.expMode;
        this.isNavigationToGroupEnabled =
            attributeComponentContext.isNavigationToGroupEnabled ?? false;
    }
    ngOnInit() {
        /**
         * Show message that indicates that attribute is required in case attribute has a domain of values
         */
        this.showRequiredMessageForDomainAttribute$ = this.configUtils
            .isCartEntryOrGroupVisited(this.owner, this.groupId)
            .pipe(map((result) => result && this.needsRequiredAttributeErrorMsg()));
    }
    /**
     * Get message key for the required message. Is different for multi- and single selection values
     *  @return {string} - required message key
     */
    getRequiredMessageKey() {
        if (this.isSingleSelection()) {
            return this.isWithAdditionalValues(this.attribute)
                ? 'configurator.attribute.singleSelectAdditionalRequiredMessage'
                : 'configurator.attribute.singleSelectRequiredMessage';
        }
        else if (this.isMultiSelection) {
            return 'configurator.attribute.multiSelectRequiredMessage';
        }
        else {
            return 'configurator.attribute.singleSelectRequiredMessage';
        }
    }
    get isMultiSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isSingleSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isAttributeWithoutErrorMsg(uiType) {
        switch (uiType) {
            case Configurator.UiType.NOT_IMPLEMENTED:
            case Configurator.UiType.STRING:
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.DROPDOWN_PRODUCT: {
                return false;
            }
        }
        return true;
    }
    isAttributeWithDomain(uiType) {
        switch (uiType) {
            case Configurator.UiType.NOT_IMPLEMENTED:
            case Configurator.UiType.STRING:
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.CHECKBOX: {
                return false;
            }
        }
        return true;
    }
    // TODO (CXSPA-3392): for next major release remove featureConfigService
    needsRequiredAttributeErrorMsg() {
        if (this.featureConfigService?.isLevel('6.2')) {
            // TODO: for next major release this condition should be proved
            return this.isRequiredAttributeWithoutErrorMsg();
        }
        else {
            return this.isRequiredAttributeWithDomain();
        }
    }
    isRequiredAttributeWithDomain() {
        return (this.isRequiredErrorMsg(this.attribute) &&
            this.isAttributeWithDomain(this.attribute.uiType));
    }
    isRequiredAttributeWithoutErrorMsg() {
        return (this.isRequiredErrorMsg(this.attribute) &&
            this.isAttributeWithoutErrorMsg(this.attribute.uiType));
    }
    /**
     * Verifies whether the group type is attribute group
     *
     * @return {boolean} - 'true' if the group type is 'attribute group' otherwise 'false'
     */
    isAttributeGroup() {
        if (Configurator.GroupType.ATTRIBUTE_GROUP === this.groupType) {
            return true;
        }
        return false;
    }
    /**
     * Verifies whether the conflict resolution is active.
     *
     * @return {boolean} - 'true' if the conflict resolution is active otherwise 'false'
     */
    isConflictResolutionActive() {
        return this.isAttributeGroup() && this.isNavigationToGroupEnabled;
    }
    /**
     * Retrieves a certain conflict link key depending on the current group type for translation.
     *
     * @return {string} - the conflict link key
     */
    getConflictMessageKey() {
        return this.groupType === Configurator.GroupType.CONFLICT_GROUP
            ? 'configurator.conflict.viewConfigurationDetails'
            : this.isNavigationToConflictEnabled()
                ? 'configurator.conflict.viewConflictDetails'
                : 'configurator.conflict.conflictDetected';
    }
    /**
     * Checks if an image is attached
     * @returns True if an only if at least one image exists
     */
    get hasImage() {
        const images = this.attribute.images;
        return images ? images.length > 0 : false;
    }
    /**
     * Returns image attached to the attribute (if available)
     * @returns Image
     */
    get image() {
        const images = this.attribute.images;
        return images && this.hasImage ? images[0] : undefined;
    }
    /**
     * Navigates to the group.
     */
    navigateToGroup() {
        this.configuratorCommonsService
            .getConfiguration(this.owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            let groupId;
            if (this.groupType === Configurator.GroupType.CONFLICT_GROUP) {
                groupId = this.attribute.groupId;
            }
            else {
                groupId = this.findConflictGroupId(configuration, this.attribute);
            }
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusValue(this.attribute);
                this.scrollToAttribute(this.attribute.name);
            }
            else {
                this.logError('Attribute was not found in any conflict group. Note that for this navigation, commerce 22.05 or later is required. Consider to disable setting "enableNavigationToConflict"');
            }
        });
    }
    /**
     * Scroll to conflicting attribute
     *
     * @protected
     */
    scrollToAttribute(name) {
        this.onNavigationCompleted(() => this.configUtils.scrollToConfigurationElement('#' + this.createAttributeUiKey('label', name)));
    }
    findConflictGroupId(configuration, currentAttribute) {
        return configuration.flatGroups
            .filter((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP)
            .find((group) => {
            return group.attributes?.find((attribute) => attribute.key === currentAttribute.key);
        })?.id;
    }
    logError(text) {
        if (isDevMode()) {
            this.logger.error(text);
        }
    }
    focusValue(attribute) {
        this.onNavigationCompleted(() => this.configUtils.focusValue(attribute));
    }
    /**
     * The status of the configuration loading is retrieved twice:
     * firstly, wait that the navigation to the corresponding group is started,
     * secondly, wait that the navigation is completed and
     * finally, invoke the callback function
     *
     * @protected
     */
    onNavigationCompleted(callback) {
        this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => isLoading), take(1), switchMap(() => this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => !isLoading), take(1), delay(0) //we need to consider the re-rendering of the page
        )))
            .subscribe(callback);
    }
    /**
     * Verifies whether the navigation to a conflict group is enabled.
     *
     * @returns {boolean} true only if navigation to conflict groups is enabled.
     */
    isNavigationToConflictEnabled() {
        return ((this.isNavigationToGroupEnabled &&
            this.configuratorUiSettings.productConfigurator
                ?.enableNavigationToConflict) ??
            false);
    }
}
ConfiguratorAttributeHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, deps: [{ token: i1.ConfiguratorStorefrontUtilsService }, { token: i2.ConfiguratorCommonsService }, { token: i3.ConfiguratorGroupsService }, { token: i4.ConfiguratorUISettingsConfig }, { token: i5.ConfiguratorAttributeCompositionContext }, { token: i6.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeHeaderComponent, selector: "cx-configurator-attribute-header", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"!attribute.visible\" class=\"cx-hidden-msg\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ 'configurator.attribute.notVisibleAttributeMsg' | cxTranslate }}\n</div>\n\n<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ getLabel(expMode, attribute.label, attribute.name) }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isConflictResolutionActive() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isConflictResolutionActive() ? true : false\"\n  [attr.role]=\"isConflictResolutionActive() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isConflictResolutionActive()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    *ngIf=\"isNavigationToGroupEnabled\"\n    class=\"link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i8.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i7.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"!attribute.visible\" class=\"cx-hidden-msg\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ 'configurator.attribute.notVisibleAttributeMsg' | cxTranslate }}\n</div>\n\n<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ getLabel(expMode, attribute.label, attribute.name) }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isConflictResolutionActive() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isConflictResolutionActive() ? true : false\"\n  [attr.role]=\"isConflictResolutionActive() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isConflictResolutionActive()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    *ngIf=\"isNavigationToGroupEnabled\"\n    class=\"link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorStorefrontUtilsService }, { type: i2.ConfiguratorCommonsService }, { type: i3.ConfiguratorGroupsService }, { type: i4.ConfiguratorUISettingsConfig }, { type: i5.ConfiguratorAttributeCompositionContext }, { type: i6.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9oZWFkZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9oZWFkZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBRVQsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWxELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBSXRFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFEQUFxRCxDQUFDOzs7Ozs7Ozs7O0FBT3pHLE1BQU0sT0FBTyxvQ0FDWCxTQUFRLGtDQUFrQztJQW9DMUMsWUFDWSxXQUErQyxFQUMvQywwQkFBc0QsRUFDdEQseUJBQW9ELEVBQ3BELHNCQUFvRCxFQUNwRCx5QkFBa0U7SUFDNUUsd0VBQXdFO0lBQ2xELG9CQUEyQztRQUVqRSxLQUFLLEVB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Q2xDLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsa0RBQWtEO1NBQzVELENBQ0osQ0FDRjthQUNBLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDZCQUE2QjtRQUMzQixPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsMEJBQTBCO1lBQzlCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUI7Z0JBQzdDLEVBQUUsMEJBQTBCLENBQUM7WUFDakMsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDOztpSUFoVVUsb0NBQW9DO3FIQUFwQyxvQ0FBb0MsK0ZDaENqRCxrM0ZBeUZBOzJGRHpEYSxvQ0FBb0M7a0JBTGhELFNBQVM7K0JBQ0Usa0NBQWtDLG1CQUUzQix1QkFBdUIsQ0FBQyxNQUFNOzswQkE4QzVDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBpbmplY3QsXG4gIGlzRGV2TW9kZSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGZWF0dXJlQ29uZmlnU2VydmljZSwgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDb21tb25zU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZmFjYWRlL2NvbmZpZ3VyYXRvci1jb21tb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZmFjYWRlL2NvbmZpZ3VyYXRvci1ncm91cHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZ3VyYXRvci11aS1zZXR0aW5ncy5jb25maWcnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2UvY29uZmlndXJhdG9yLXN0b3JlZnJvbnQtdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbnRleHQgfSBmcm9tICcuLi9jb21wb3NpdGlvbi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNvbXBvc2l0aW9uLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQgfSBmcm9tICcuLi90eXBlcy9iYXNlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtYmFzZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVIZWFkZXJDb21wb25lbnRcbiAgZXh0ZW5kcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0XG57XG4gIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZTtcbiAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcjtcbiAgZ3JvdXBJZDogc3RyaW5nO1xuICBncm91cFR5cGU6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGU7XG4gIGV4cE1vZGU6IGJvb2xlYW47XG4gIGlzTmF2aWdhdGlvblRvR3JvdXBFbmFibGVkOiBib29sZWFuO1xuXG4gIGljb25UeXBlcyA9IElDT05fVFlQRTtcbiAgc2hvd1JlcXVpcmVkTWVzc2FnZUZvckRvbWFpbkF0dHJpYnV0ZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb25maWdVdGlsczogQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSxcbiAgICBjb25maWd1cmF0b3JDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UsXG4gICAgY29uZmlndXJhdG9yR3JvdXBzU2VydmljZTogQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZSxcbiAgICBjb25maWd1cmF0b3JVaVNldHRpbmdzOiBDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnLFxuICAgIGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQ6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dCxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuaWZpZWQtc2lnbmF0dXJlc1xuICAgIGZlYXR1cmVDb25maWdTZXJ2aWNlPzogRmVhdHVyZUNvbmZpZ1NlcnZpY2VcbiAgKTtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgNi4yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25maWdVdGlsczogQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSxcbiAgICBjb25maWd1cmF0b3JDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UsXG4gICAgY29uZmlndXJhdG9yR3JvdXBzU2VydmljZTogQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZSxcbiAgICBjb25maWd1cmF0b3JVaVNldHRpbmdzOiBDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnLFxuICAgIGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQ6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dFxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWdVdGlsczogQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2U6IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlOiBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JVaVNldHRpbmdzOiBDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnLFxuICAgIHByb3RlY3RlZCBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0OiBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbnRleHQsXG4gICAgLy8gVE9ETyAoQ1hTUEEtMzM5Mik6IGZvciBuZXh0IG1ham9yIHJlbGVhc2UgcmVtb3ZlIGZlYXR1cmVDb25maWdTZXJ2aWNlXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGZlYXR1cmVDb25maWdTZXJ2aWNlPzogRmVhdHVyZUNvbmZpZ1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dHJpYnV0ZSA9IGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQuYXR0cmlidXRlO1xuICAgIHRoaXMub3duZXIgPSBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0Lm93bmVyO1xuICAgIHRoaXMuZ3JvdXBJZCA9IGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQuZ3JvdXAuaWQ7XG4gICAgdGhpcy5ncm91cFR5cGUgPVxuICAgICAgYXR0cmlidXRlQ29tcG9uZW50Q29udGV4dC5ncm91cC5ncm91cFR5cGUgPz9cbiAgICAgIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQO1xuICAgIHRoaXMuZXhwTW9kZSA9IGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQuZXhwTW9kZTtcbiAgICB0aGlzLmlzTmF2aWdhdGlvblRvR3JvdXBFbmFibGVkID1cbiAgICAgIGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQuaXNOYXZpZ2F0aW9uVG9Hcm91cEVuYWJsZWQgPz8gZmFsc2U7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvKipcbiAgICAgKiBTaG93IG1lc3NhZ2UgdGhhdCBpbmRpY2F0ZXMgdGhhdCBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgaW4gY2FzZSBhdHRyaWJ1dGUgaGFzIGEgZG9tYWluIG9mIHZhbHVlc1xuICAgICAqL1xuICAgIHRoaXMuc2hvd1JlcXVpcmVkTWVzc2FnZUZvckRvbWFpbkF0dHJpYnV0ZSQgPSB0aGlzLmNvbmZpZ1V0aWxzXG4gICAgICAuaXNDYXJ0RW50cnlPckdyb3VwVmlzaXRlZCh0aGlzLm93bmVyLCB0aGlzLmdyb3VwSWQpXG4gICAgICAucGlwZShtYXAoKHJlc3VsdCkgPT4gcmVzdWx0ICYmIHRoaXMubmVlZHNSZXF1aXJlZEF0dHJpYnV0ZUVycm9yTXNnKCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbWVzc2FnZSBrZXkgZm9yIHRoZSByZXF1aXJlZCBtZXNzYWdlLiBJcyBkaWZmZXJlbnQgZm9yIG11bHRpLSBhbmQgc2luZ2xlIHNlbGVjdGlvbiB2YWx1ZXNcbiAgICogIEByZXR1cm4ge3N0cmluZ30gLSByZXF1aXJlZCBtZXNzYWdlIGtleVxuICAgKi9cbiAgZ2V0UmVxdWlyZWRNZXNzYWdlS2V5KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNXaXRoQWRkaXRpb25hbFZhbHVlcyh0aGlzLmF0dHJpYnV0ZSlcbiAgICAgICAgPyAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5zaW5nbGVTZWxlY3RBZGRpdGlvbmFsUmVxdWlyZWRNZXNzYWdlJ1xuICAgICAgICA6ICdjb25maWd1cmF0b3IuYXR0cmlidXRlLnNpbmdsZVNlbGVjdFJlcXVpcmVkTWVzc2FnZSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlTZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybiAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5tdWx0aVNlbGVjdFJlcXVpcmVkTWVzc2FnZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5zaW5nbGVTZWxlY3RSZXF1aXJlZE1lc3NhZ2UnO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaXNNdWx0aVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBzd2l0Y2ggKHRoaXMuYXR0cmlidXRlLnVpVHlwZSkge1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YTElTVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1RfUFJPRFVDVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5NVUxUSV9TRUxFQ1RJT05fSU1BR0U6IHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1NpbmdsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBzd2l0Y2ggKHRoaXMuYXR0cmlidXRlLnVpVHlwZSkge1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OX0FERElUSU9OQUxfSU5QVVQ6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT05fUFJPRFVDVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTl9BRERJVElPTkFMX0lOUFVUOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlNJTkdMRV9TRUxFQ1RJT05fSU1BR0U6IHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0F0dHJpYnV0ZVdpdGhvdXRFcnJvck1zZyhcbiAgICB1aVR5cGU6IENvbmZpZ3VyYXRvci5VaVR5cGUgfCB1bmRlZmluZWRcbiAgKTogYm9vbGVhbiB7XG4gICAgc3dpdGNoICh1aVR5cGUpIHtcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URUQ6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuU1RSSU5HOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUM6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1g6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV046XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV05fUFJPRFVDVDoge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQXR0cmlidXRlV2l0aERvbWFpbihcbiAgICB1aVR5cGU6IENvbmZpZ3VyYXRvci5VaVR5cGUgfCB1bmRlZmluZWRcbiAgKTogYm9vbGVhbiB7XG4gICAgc3dpdGNoICh1aVR5cGUpIHtcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URUQ6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuU1RSSU5HOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUM6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1g6IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRPRE8gKENYU1BBLTMzOTIpOiBmb3IgbmV4dCBtYWpvciByZWxlYXNlIHJlbW92ZSBmZWF0dXJlQ29uZmlnU2VydmljZVxuICBwcm90ZWN0ZWQgbmVlZHNSZXF1aXJlZEF0dHJpYnV0ZUVycm9yTXNnKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmZlYXR1cmVDb25maWdTZXJ2aWNlPy5pc0xldmVsKCc2LjInKSkge1xuICAgICAgLy8gVE9ETzogZm9yIG5leHQgbWFqb3IgcmVsZWFzZSB0aGlzIGNvbmRpdGlvbiBzaG91bGQgYmUgcHJvdmVkXG4gICAgICByZXR1cm4gdGhpcy5pc1JlcXVpcmVkQXR0cmlidXRlV2l0aG91dEVycm9yTXNnKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmlzUmVxdWlyZWRBdHRyaWJ1dGVXaXRoRG9tYWluKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGlzUmVxdWlyZWRBdHRyaWJ1dGVXaXRoRG9tYWluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmlzUmVxdWlyZWRFcnJvck1zZyh0aGlzLmF0dHJpYnV0ZSkgJiZcbiAgICAgIHRoaXMuaXNBdHRyaWJ1dGVXaXRoRG9tYWluKHRoaXMuYXR0cmlidXRlLnVpVHlwZSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzUmVxdWlyZWRBdHRyaWJ1dGVXaXRob3V0RXJyb3JNc2coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuaXNSZXF1aXJlZEVycm9yTXNnKHRoaXMuYXR0cmlidXRlKSAmJlxuICAgICAgdGhpcy5pc0F0dHJpYnV0ZVdpdGhvdXRFcnJvck1zZyh0aGlzLmF0dHJpYnV0ZS51aVR5cGUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBncm91cCB0eXBlIGlzIGF0dHJpYnV0ZSBncm91cFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICd0cnVlJyBpZiB0aGUgZ3JvdXAgdHlwZSBpcyAnYXR0cmlidXRlIGdyb3VwJyBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgaXNBdHRyaWJ1dGVHcm91cCgpOiBib29sZWFuIHtcbiAgICBpZiAoQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5BVFRSSUJVVEVfR1JPVVAgPT09IHRoaXMuZ3JvdXBUeXBlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGNvbmZsaWN0IHJlc29sdXRpb24gaXMgYWN0aXZlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICd0cnVlJyBpZiB0aGUgY29uZmxpY3QgcmVzb2x1dGlvbiBpcyBhY3RpdmUgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGlzQ29uZmxpY3RSZXNvbHV0aW9uQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQXR0cmlidXRlR3JvdXAoKSAmJiB0aGlzLmlzTmF2aWdhdGlvblRvR3JvdXBFbmFibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIGNlcnRhaW4gY29uZmxpY3QgbGluayBrZXkgZGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IGdyb3VwIHR5cGUgZm9yIHRyYW5zbGF0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIGNvbmZsaWN0IGxpbmsga2V5XG4gICAqL1xuICBnZXRDb25mbGljdE1lc3NhZ2VLZXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cFR5cGUgPT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVBcbiAgICAgID8gJ2NvbmZpZ3VyYXRvci5jb25mbGljdC52aWV3Q29uZmlndXJhdGlvbkRldGFpbHMnXG4gICAgICA6IHRoaXMuaXNOYXZpZ2F0aW9uVG9Db25mbGljdEVuYWJsZWQoKVxuICAgICAgPyAnY29uZmlndXJhdG9yLmNvbmZsaWN0LnZpZXdDb25mbGljdERldGFpbHMnXG4gICAgICA6ICdjb25maWd1cmF0b3IuY29uZmxpY3QuY29uZmxpY3REZXRlY3RlZCc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGltYWdlIGlzIGF0dGFjaGVkXG4gICAqIEByZXR1cm5zIFRydWUgaWYgYW4gb25seSBpZiBhdCBsZWFzdCBvbmUgaW1hZ2UgZXhpc3RzXG4gICAqL1xuICBnZXQgaGFzSW1hZ2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW1hZ2VzID0gdGhpcy5hdHRyaWJ1dGUuaW1hZ2VzO1xuICAgIHJldHVybiBpbWFnZXMgPyBpbWFnZXMubGVuZ3RoID4gMCA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaW1hZ2UgYXR0YWNoZWQgdG8gdGhlIGF0dHJpYnV0ZSAoaWYgYXZhaWxhYmxlKVxuICAgKiBAcmV0dXJucyBJbWFnZVxuICAgKi9cbiAgZ2V0IGltYWdlKCk6IENvbmZpZ3VyYXRvci5JbWFnZSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaW1hZ2VzID0gdGhpcy5hdHRyaWJ1dGUuaW1hZ2VzO1xuICAgIHJldHVybiBpbWFnZXMgJiYgdGhpcy5oYXNJbWFnZSA/IGltYWdlc1swXSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIGdyb3VwLlxuICAgKi9cbiAgbmF2aWdhdGVUb0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWd1cmF0aW9uKHRoaXMub3duZXIpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICBsZXQgZ3JvdXBJZDtcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQKSB7XG4gICAgICAgICAgZ3JvdXBJZCA9IHRoaXMuYXR0cmlidXRlLmdyb3VwSWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JvdXBJZCA9IHRoaXMuZmluZENvbmZsaWN0R3JvdXBJZChjb25maWd1cmF0aW9uLCB0aGlzLmF0dHJpYnV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwSWQpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UubmF2aWdhdGVUb0dyb3VwKFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwSWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuZm9jdXNWYWx1ZSh0aGlzLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0F0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ0Vycm9yKFxuICAgICAgICAgICAgJ0F0dHJpYnV0ZSB3YXMgbm90IGZvdW5kIGluIGFueSBjb25mbGljdCBncm91cC4gTm90ZSB0aGF0IGZvciB0aGlzIG5hdmlnYXRpb24sIGNvbW1lcmNlIDIyLjA1IG9yIGxhdGVyIGlzIHJlcXVpcmVkLiBDb25zaWRlciB0byBkaXNhYmxlIHNldHRpbmcgXCJlbmFibGVOYXZpZ2F0aW9uVG9Db25mbGljdFwiJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB0byBjb25mbGljdGluZyBhdHRyaWJ1dGVcbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIHNjcm9sbFRvQXR0cmlidXRlKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMub25OYXZpZ2F0aW9uQ29tcGxldGVkKCgpID0+XG4gICAgICB0aGlzLmNvbmZpZ1V0aWxzLnNjcm9sbFRvQ29uZmlndXJhdGlvbkVsZW1lbnQoXG4gICAgICAgICcjJyArIHRoaXMuY3JlYXRlQXR0cmlidXRlVWlLZXkoJ2xhYmVsJywgbmFtZSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZmluZENvbmZsaWN0R3JvdXBJZChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbixcbiAgICBjdXJyZW50QXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24uZmxhdEdyb3Vwc1xuICAgICAgLmZpbHRlcihcbiAgICAgICAgKGdyb3VwKSA9PiBncm91cC5ncm91cFR5cGUgPT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVBcbiAgICAgIClcbiAgICAgIC5maW5kKChncm91cCkgPT4ge1xuICAgICAgICByZXR1cm4gZ3JvdXAuYXR0cmlidXRlcz8uZmluZChcbiAgICAgICAgICAoYXR0cmlidXRlKSA9PiBhdHRyaWJ1dGUua2V5ID09PSBjdXJyZW50QXR0cmlidXRlLmtleVxuICAgICAgICApO1xuICAgICAgfSk/LmlkO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvZ0Vycm9yKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGZvY3VzVmFsdWUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKTogdm9pZCB7XG4gICAgdGhpcy5vbk5hdmlnYXRpb25Db21wbGV0ZWQoKCkgPT4gdGhpcy5jb25maWdVdGlscy5mb2N1c1ZhbHVlKGF0dHJpYnV0ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzdGF0dXMgb2YgdGhlIGNvbmZpZ3VyYXRpb24gbG9hZGluZyBpcyByZXRyaWV2ZWQgdHdpY2U6XG4gICAqIGZpcnN0bHksIHdhaXQgdGhhdCB0aGUgbmF2aWdhdGlvbiB0byB0aGUgY29ycmVzcG9uZGluZyBncm91cCBpcyBzdGFydGVkLFxuICAgKiBzZWNvbmRseSwgd2FpdCB0aGF0IHRoZSBuYXZpZ2F0aW9uIGlzIGNvbXBsZXRlZCBhbmRcbiAgICogZmluYWxseSwgaW52b2tlIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgb25OYXZpZ2F0aW9uQ29tcGxldGVkKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgLmlzQ29uZmlndXJhdGlvbkxvYWRpbmcodGhpcy5vd25lcilcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKGlzTG9hZGluZykgPT4gaXNMb2FkaW5nKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgICAgICAgLmlzQ29uZmlndXJhdGlvbkxvYWRpbmcodGhpcy5vd25lcilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIoKGlzTG9hZGluZykgPT4gIWlzTG9hZGluZyksXG4gICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgIGRlbGF5KDApIC8vd2UgbmVlZCB0byBjb25zaWRlciB0aGUgcmUtcmVuZGVyaW5nIG9mIHRoZSBwYWdlXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIG5hdmlnYXRpb24gdG8gYSBjb25mbGljdCBncm91cCBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBvbmx5IGlmIG5hdmlnYXRpb24gdG8gY29uZmxpY3QgZ3JvdXBzIGlzIGVuYWJsZWQuXG4gICAqL1xuICBpc05hdmlnYXRpb25Ub0NvbmZsaWN0RW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMuaXNOYXZpZ2F0aW9uVG9Hcm91cEVuYWJsZWQgJiZcbiAgICAgICAgdGhpcy5jb25maWd1cmF0b3JVaVNldHRpbmdzLnByb2R1Y3RDb25maWd1cmF0b3JcbiAgICAgICAgICA/LmVuYWJsZU5hdmlnYXRpb25Ub0NvbmZsaWN0KSA/P1xuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiIWF0dHJpYnV0ZS52aXNpYmxlXCIgY2xhc3M9XCJjeC1oaWRkZW4tbXNnXCI+XG4gIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5XQVJOSU5HXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9jeC1pY29uPlxuICB7eyAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5ub3RWaXNpYmxlQXR0cmlidXRlTXNnJyB8IGN4VHJhbnNsYXRlIH19XG48L2Rpdj5cblxuPGxhYmVsXG4gIGlkPVwie3sgY3JlYXRlQXR0cmlidXRlVWlLZXkoJ2xhYmVsJywgYXR0cmlidXRlLm5hbWUpIH19XCJcbiAgW2NsYXNzLmN4LXJlcXVpcmVkLWVycm9yXT1cInNob3dSZXF1aXJlZE1lc3NhZ2VGb3JEb21haW5BdHRyaWJ1dGUkIHwgYXN5bmNcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICFhdHRyaWJ1dGUucmVxdWlyZWRcbiAgICAgID8gKCdjb25maWd1cmF0b3IuYTExeS5hdHRyaWJ1dGUnXG4gICAgICAgIHwgY3hUcmFuc2xhdGU6IHsgYXR0cmlidXRlOiBhdHRyaWJ1dGUubGFiZWwgfSlcbiAgICAgIDogKCdjb25maWd1cmF0b3IuYTExeS5yZXF1aXJlZEF0dHJpYnV0ZSdcbiAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBwYXJhbTogYXR0cmlidXRlLmxhYmVsIH0pXG4gIFwiXG4gID48c3BhblxuICAgIFtjbGFzcy5jeC1yZXF1aXJlZC1pY29uXT1cImF0dHJpYnV0ZS5yZXF1aXJlZFwiXG4gICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJjcmVhdGVBdHRyaWJ1dGVVaUtleSgnbGFiZWwnLCBhdHRyaWJ1dGUubmFtZSlcIlxuICAgID57eyBnZXRMYWJlbChleHBNb2RlLCBhdHRyaWJ1dGUubGFiZWwsIGF0dHJpYnV0ZS5uYW1lKSB9fTwvc3BhblxuICA+PC9sYWJlbFxuPlxuPGRpdlxuICAqbmdJZj1cImF0dHJpYnV0ZS5oYXNDb25mbGljdHNcIlxuICBjbGFzcz1cImN4LWNvbmZsaWN0LW1zZ1wiXG4gIGlkPVwie3sgY3JlYXRlQXR0cmlidXRlVWlLZXkoJ2F0dHJpYnV0ZS1tc2cnLCBhdHRyaWJ1dGUubmFtZSkgfX1cIlxuICBbYXR0ci5hcmlhLWxpdmVdPVwiaXNDb25mbGljdFJlc29sdXRpb25BY3RpdmUoKSA/ICdhc3NlcnRpdmUnIDogJ29mZidcIlxuICBbYXR0ci5hcmlhLWF0b21pY109XCJpc0NvbmZsaWN0UmVzb2x1dGlvbkFjdGl2ZSgpID8gdHJ1ZSA6IGZhbHNlXCJcbiAgW2F0dHIucm9sZV09XCJpc0NvbmZsaWN0UmVzb2x1dGlvbkFjdGl2ZSgpID8gJ2FsZXJ0JyA6IG51bGxcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgIGlzQ29uZmxpY3RSZXNvbHV0aW9uQWN0aXZlKClcbiAgICAgID8gKCdjb25maWd1cmF0b3IuYTExeS5jb25mbGljdERldGVjdGVkJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgOiAnJ1xuICBcIlxuPlxuICA8Y3gtaWNvblxuICAgICpuZ0lmPVwiaXNBdHRyaWJ1dGVHcm91cCgpXCJcbiAgICBbdHlwZV09XCJpY29uVHlwZXMuV0FSTklOR1wiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgPjwvY3gtaWNvbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQXR0cmlidXRlR3JvdXAoKTsgZWxzZSBjb25mbGljdEdyb3VwXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzTmF2aWdhdGlvblRvQ29uZmxpY3RFbmFibGVkKCk7IGVsc2Ugd2l0aG91dExpbmtcIj5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzPVwibGluayBjeC1hY3Rpb24tbGlua1wiXG4gICAgICAgIChjbGljayk9XCJuYXZpZ2F0ZVRvR3JvdXAoKVwiXG4gICAgICAgIChrZXlkb3duLmVudGVyKT1cIm5hdmlnYXRlVG9Hcm91cCgpXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubmF2aWdhdGVUb0NvbmZsaWN0J1xuICAgICAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBhdHRyaWJ1dGU6IGF0dHJpYnV0ZS5sYWJlbCB9XG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIHt7IGdldENvbmZsaWN0TWVzc2FnZUtleSgpIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgIDwvYT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbjxkaXZcbiAgKm5nSWY9XCJzaG93UmVxdWlyZWRNZXNzYWdlRm9yRG9tYWluQXR0cmlidXRlJCB8IGFzeW5jXCJcbiAgY2xhc3M9XCJjeC1yZXF1aXJlZC1lcnJvci1tc2dcIlxuICBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdhdHRyaWJ1dGUtbXNnJywgYXR0cmlidXRlLm5hbWUpIH19XCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRSZXF1aXJlZE1lc3NhZ2VLZXkoKSB8IGN4VHJhbnNsYXRlXCJcbj5cbiAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLkVSUk9SXCI+PC9jeC1pY29uPlxuICB7eyBnZXRSZXF1aXJlZE1lc3NhZ2VLZXkoKSB8IGN4VHJhbnNsYXRlIH19XG48L2Rpdj5cbjxpbWdcbiAgKm5nSWY9XCJoYXNJbWFnZVwiXG4gIGNsYXNzPVwiY3gtYXR0cmlidXRlLWltZ1wiXG4gIHNyYz1cInt7IGltYWdlPy51cmwgfX1cIlxuICBhbHQ9XCJ7eyBpbWFnZT8uYWx0VGV4dCB9fVwiXG4vPlxuXG48bmctdGVtcGxhdGUgI2NvbmZsaWN0R3JvdXA+XG4gIDxhXG4gICAgKm5nSWY9XCJpc05hdmlnYXRpb25Ub0dyb3VwRW5hYmxlZFwiXG4gICAgY2xhc3M9XCJsaW5rIGN4LWFjdGlvbi1saW5rXCJcbiAgICAoY2xpY2spPVwibmF2aWdhdGVUb0dyb3VwKClcIlxuICAgIChrZXlkb3duLmVudGVyKT1cIm5hdmlnYXRlVG9Hcm91cCgpXCJcbiAgICB0YWJpbmRleD1cIjBcIlxuICA+XG4gICAge3sgZ2V0Q29uZmxpY3RNZXNzYWdlS2V5KCkgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2E+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI3dpdGhvdXRMaW5rPlxuICA8ZGl2IGNsYXNzPVwiY3gtY29uZmxpY3QtbXNnXCI+XG4gICAge3sgZ2V0Q29uZmxpY3RNZXNzYWdlS2V5KCkgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=