/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  isDevMode,
  OnInit,
} from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { delay, filter, map, switchMap, take } from 'rxjs/operators';
import {
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
} from '../../../core';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../config/configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-header',
  templateUrl: './configurator-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeHeaderComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  attribute: Configurator.Attribute;
  owner: CommonConfigurator.Owner;
  groupId: string;
  groupType: Configurator.GroupType;
  expMode: boolean;
  isNavigationToGroupEnabled: boolean;

  iconTypes = ICON_TYPE;
  showRequiredMessageForDomainAttribute$: Observable<boolean>;

  protected logger = inject(LoggerService);

  constructor(
    protected configUtils: ConfiguratorStorefrontUtilsService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configuratorUiSettings: ConfiguratorUISettingsConfig,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext
  ) {
    super();
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

  ngOnInit(): void {
    /**
     * Show message that indicates that attribute is required in case attribute has a domain of values
     */
    this.showRequiredMessageForDomainAttribute$ = this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.groupId)
      .pipe(map((result) => result && this.isRequiredAttributeWithDomain()));
  }

  /**
   * Get message key for the required message. Is different for multi- and single selection values
   *  @return {string} - required message key
   */
  getRequiredMessageKey(): string {
    if (this.isSingleSelection()) {
      return this.isWithAdditionalValues(this.attribute)
        ? 'configurator.attribute.singleSelectAdditionalRequiredMessage'
        : 'configurator.attribute.singleSelectRequiredMessage';
    } else if (this.isMultiSelection) {
      return 'configurator.attribute.multiSelectRequiredMessage';
    } else {
      //input attribute types
      return 'configurator.attribute.singleSelectRequiredMessage';
    }
  }

  protected get isMultiSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.CHECKBOXLIST:
      case Configurator.UiType.CHECKBOXLIST_PRODUCT:
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  protected isSingleSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
      case Configurator.UiType.RADIOBUTTON_PRODUCT:
      case Configurator.UiType.CHECKBOX:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
      case Configurator.UiType.DROPDOWN_PRODUCT:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  protected isRequiredAttributeWithDomain(): boolean {
    const uiType = this.attribute.uiType;
    return (
      (this.attribute.required &&
        this.attribute.incomplete &&
        uiType !== Configurator.UiType.NOT_IMPLEMENTED &&
        uiType !== Configurator.UiType.STRING &&
        uiType !== Configurator.UiType.NUMERIC) ??
      false
    );
  }

  /**
   * Verifies whether the group type is attribute group
   *
   * @return {boolean} - 'true' if the group type is 'attribute group' otherwise 'false'
   */
  isAttributeGroup(): boolean {
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
  isConflictResolutionActive(): boolean {
    return this.isAttributeGroup() && this.isNavigationToGroupEnabled;
  }

  /**
   * Retrieves a certain conflict link key depending on the current group type for translation.
   *
   * @return {string} - the conflict link key
   */
  getConflictMessageKey(): string {
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
  get hasImage(): boolean {
    const images = this.attribute.images;
    return images ? images.length > 0 : false;
  }

  /**
   * Returns image attached to the attribute (if available)
   * @returns Image
   */
  get image(): Configurator.Image | undefined {
    const images = this.attribute.images;
    return images && this.hasImage ? images[0] : undefined;
  }

  /**
   * Navigates to the group.
   */
  navigateToGroup(): void {
    this.configuratorCommonsService
      .getConfiguration(this.owner)
      .pipe(take(1))
      .subscribe((configuration) => {
        let groupId;
        if (this.groupType === Configurator.GroupType.CONFLICT_GROUP) {
          groupId = this.attribute.groupId;
        } else {
          groupId = this.findConflictGroupId(configuration, this.attribute);
        }
        if (groupId) {
          this.configuratorGroupsService.navigateToGroup(
            configuration,
            groupId
          );
          this.focusValue(this.attribute);
          this.scrollToAttribute(this.attribute.name);
        } else {
          this.logError(
            'Attribute was not found in any conflict group. Note that for this navigation, commerce 22.05 or later is required. Consider to disable setting "enableNavigationToConflict"'
          );
        }
      });
  }

  /**
   * Scroll to conflicting attribute
   *
   * @protected
   */
  protected scrollToAttribute(name: string) {
    this.onNavigationCompleted(() =>
      this.configUtils.scrollToConfigurationElement(
        '#' + this.createAttributeUiKey('label', name)
      )
    );
  }

  findConflictGroupId(
    configuration: Configurator.Configuration,
    currentAttribute: Configurator.Attribute
  ): string | undefined {
    return configuration.flatGroups
      .filter(
        (group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP
      )
      .find((group) => {
        return group.attributes?.find(
          (attribute) => attribute.key === currentAttribute.key
        );
      })?.id;
  }

  protected logError(text: string): void {
    if (isDevMode()) {
      this.logger.error(text);
    }
  }

  protected focusValue(attribute: Configurator.Attribute): void {
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
  protected onNavigationCompleted(callback: () => void): void {
    this.configuratorCommonsService
      .isConfigurationLoading(this.owner)
      .pipe(
        filter((isLoading) => isLoading),
        take(1),
        switchMap(() =>
          this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(
              filter((isLoading) => !isLoading),
              take(1),
              delay(0) //we need to consider the re-rendering of the page
            )
        )
      )
      .subscribe(callback);
  }

  /**
   * Verifies whether the navigation to a conflict group is enabled.
   *
   * @returns {boolean} true only if navigation to conflict groups is enabled.
   */
  isNavigationToConflictEnabled(): boolean {
    return (
      (this.isNavigationToGroupEnabled &&
        this.configuratorUiSettings.productConfigurator
          ?.enableNavigationToConflict) ??
      false
    );
  }
}
