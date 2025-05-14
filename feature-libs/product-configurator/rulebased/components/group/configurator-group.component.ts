/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FeatureConfigService, LanguageService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfigFormUpdateEvent } from '../form/configurator-form.event';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';

@Component({
  selector: 'cx-configurator-group',
  templateUrl: './configurator-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfiguratorGroupComponent {
  protected readonly typePrefix = 'AttributeType_';
  @Input() group: Configurator.Group;
  @Input() owner: CommonConfigurator.Owner;
  @Input() isNavigationToGroupEnabled: boolean;
  @Input() isPricingAsync?: boolean;

  activeLanguage$: Observable<string> = this.languageService.getActive();
  uiType = Configurator.UiType;

  private featureConfigService = inject(FeatureConfigService);

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected languageService: LanguageService,
    protected configUtils: ConfiguratorStorefrontUtilsService,
    protected configExpertModeService: ConfiguratorExpertModeService
  ) {}

  /**
   * Updates a configuration, specified by the configuration form update event.
   *
   * @param {ConfigFormUpdateEvent} event - Configuration form update event
   */
  updateConfiguration(event: ConfigFormUpdateEvent): void {
    this.configuratorCommonsService.updateConfiguration(
      event.ownerKey,
      event.changedAttribute,
      event.updateType
    );
  }

  /**
   * Verifies whether the current group type is conflict one.
   *
   * @param {Configurator.GroupType | undefined} groupType - Group type
   * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
   */
  isConflictGroupType(groupType: Configurator.GroupType | undefined): boolean {
    return groupType
      ? this.configuratorGroupsService.isConflictGroupType(groupType)
      : false;
  }

  /**
   * Display group description box only for conflict groups with a given group name (i.e. a conflict description)
   *
   * @param {Configurator.Group} group - Group
   * @returns {boolean} - 'True' if conflict description box should be displayed, otherwise 'false'.
   */
  displayConflictDescription(group: Configurator.Group): boolean {
    return (
      group.groupType !== undefined &&
      this.configuratorGroupsService.isConflictGroupType(group.groupType) &&
      group.name !== ''
    );
  }

  /**
   * Generates a group ID.
   *
   * @param {string} groupId - group ID
   * @returns {string | undefined} - generated group ID
   */
  createGroupId(groupId?: string): string | undefined {
    return this.configUtils.createGroupId(groupId);
  }

  /**
   * Creates unique key for config attribute on the UI
   *
   * @param prefix for key depending on usage (e.g. uiType, label)
   * @param attributeId
   */
  createAttributeUiKey(prefix: string, attributeId: string): string {
    return this.configUtils.createAttributeUiKey(prefix, attributeId);
  }

  /**
   * Retrieves information whether the expert mode is active.
   *
   * @returns {Observable<boolean> | undefined } - 'True' if the expert mode is active, otherwise 'false'.
   */
  get expMode(): Observable<boolean> {
    return this.configExpertModeService.getExpModeActive();
  }

  getComponentKey(attribute: Configurator.Attribute): string {
    return attribute.uiTypeVariation?.includes(
      Configurator.CustomUiTypeIndicator
    )
      ? this.typePrefix + attribute.uiTypeVariation
      : this.typePrefix + attribute.uiType;
  }

  /**
   * track-by function for the *ngFor generating the attribute list of the current group,
   * returning the attribute key if the 'productConfiguratorDeltaRendering' toggle is active.
   *
   * @param _index
   * @param group
   * @returns attribute key if feature 'productConfiguratorDeltaRendering' is active, the attribute itself otherwise (same as if there were not track-by function)
   */
  trackByFn = (_index: number, attribute: Configurator.Attribute) => {
    return this.featureConfigService.isEnabled(
      'productConfiguratorDeltaRendering'
    )
      ? attribute.key
      : attribute;
  };
}
