/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet,
} from '@angular/common';
import { TranslatePipe } from '@spartacus/core';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorOverviewAttributeComponent } from '../overview-attribute/configurator-overview-attribute.component';
import { ConfiguratorOverviewBundleAttributeComponent } from '../overview-bundle-attribute/configurator-overview-bundle-attribute.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-form',
  templateUrl: './configurator-overview-form.component.html',
  //here we cannot go with OnPush, as we otherwise do not take the change to host binding into account
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    NgIf,
    NgTemplateOutlet,
    NgFor,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    ConfiguratorOverviewAttributeComponent,
    ConfiguratorOverviewBundleAttributeComponent,
    NgSwitchDefault,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorOverviewFormComponent {
  @HostBinding('class.ghost') ghostStyle = true;

  attributeOverviewType = Configurator.AttributeOverviewType;

  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getOrCreateConfiguration(
          routerData.owner
        )
      ),
      distinctUntilKeyChanged('configId'),
      switchMap((configuration) =>
        this.configuratorCommonsService.getConfigurationWithOverview(
          configuration
        )
      ),
      filter((configuration) => configuration.overview != null),
      tap(() => {
        this.ghostStyle = false;
      })
    );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

  /**
   * Does the configuration contain any selected attribute values?
   * @param configuration - Current configuration
   * @returns - Any attributes available
   */
  hasAttributes(configuration: Configurator.Configuration): boolean {
    return this.hasGroupWithAttributes(configuration.overview?.groups);
  }

  protected hasGroupWithAttributes(
    groups?: Configurator.GroupOverview[]
  ): boolean {
    if (groups) {
      let hasAttributes =
        groups.find(
          (group) => (group.attributes ? group.attributes.length : 0) > 0
        ) !== undefined;
      if (!hasAttributes) {
        hasAttributes =
          groups.find((group) =>
            this.hasGroupWithAttributes(group.subGroups)
          ) !== undefined;
      }
      return hasAttributes;
    } else {
      return false;
    }
  }

  /**
   * Verifies whether the next or the previous attributes are same.
   *
   * @param attributes - Attribute array
   * @param index - Index of the attribute in the array
   * @return - 'True' if it is the same attribute, otherwise 'false'
   */
  isSameAttribute(
    attributes: Configurator.AttributeOverview[],
    index: number
  ): boolean {
    if (attributes.length > 1) {
      if (index === 0) {
        return (
          attributes[index]?.attribute === attributes[index + 1]?.attribute
        );
      } else {
        return (
          attributes[index]?.attribute === attributes[index - 1]?.attribute
        );
      }
    }
    return false;
  }

  /**
   * Retrieves the styling for the corresponding element.
   *
   * @param attributes - Attribute array
   * @param index - Index of the attribute in the array
   * @return - corresponding style class
   */
  getStyleClasses(
    attributes: Configurator.AttributeOverview[],
    index: number
  ): string {
    let styleClass = '';

    switch (attributes[index]?.type) {
      case this.attributeOverviewType.BUNDLE:
        styleClass += 'bundle';
        break;
      case this.attributeOverviewType.GENERAL:
        styleClass += 'general';
        break;
    }

    if (index === 0 || !this.isSameAttribute(attributes, index)) {
      styleClass += ' margin';
    }

    if (
      !this.isSameAttribute(attributes, index + 1) &&
      !styleClass.includes('bundle')
    ) {
      styleClass += ' last-value-pair';
    }

    return styleClass;
  }

  /**
   * Retrieves the styling for the group levels.
   *
   * @param level - Group level. 1 is top level.
   * @param subGroups - subgroups array
   * @return - corresponding style classes
   */
  getGroupLevelStyleClasses(
    level: number,
    subGroups: Configurator.GroupOverview[] | undefined
  ): string {
    let styleClass = 'cx-group';
    if (level === 1) {
      styleClass += ' topLevel';
      if (subGroups && subGroups.length > 0) {
        styleClass += ' subgroupTopLevel';
      }
    } else {
      styleClass += ' subgroup';
      styleClass += ' subgroupLevel' + level;
    }
    return styleClass;
  }

  /**
   * Retrieves a unique prefix ID.
   *
   * @param prefix - prefix that we need to make the ID unique
   * @param groupId - group ID
   * @returns - prefix ID
   */
  getPrefixId(idPrefix: string | undefined, groupId: string): string {
    return this.configuratorStorefrontUtilsService.getPrefixId(
      idPrefix,
      groupId
    );
  }

  /**
   * Retrieves the ids for the overview group headers
   *
   * @param idPrefix - Prefix (reflects the parent groups in the hierarchy)
   * @param groupId - local group id
   * @return - unique group id
   */
  getGroupId(idPrefix: string, groupId: string): string {
    return this.configuratorStorefrontUtilsService.createOvGroupId(
      idPrefix,
      groupId
    );
  }

  /**
   * Verifies whether the bundle attribute has a configuration details section
   * on the overview page.
   *
   * @param group - Group that contains the attribute
   * @param attributeOverview - Attribute overview
   * @return - 'true' if configuration details exist, otherwise 'false'
   */
  hasConfigurationDetails(
    group: Configurator.GroupOverview,
    attributeOverview: Configurator.AttributeOverview
  ): boolean {
    const detailsGroupId =
      this.getContainerRowDetailsGroupId(attributeOverview);
    return (
      !!detailsGroupId &&
      !!group.subGroups?.some((subGroup) => subGroup.id === detailsGroupId)
    );
  }

  protected getContainerRowDetailsGroupId(
    attributeOverview: Configurator.AttributeOverview
  ): string | undefined {
    if (!attributeOverview.attributeId || !attributeOverview.valueId) {
      return undefined;
    }
    return `${Configurator.ContainerRowGroupIdPrefix}@${attributeOverview.attributeId}@${attributeOverview.valueId}`;
  }

  /**
   * Verifies whether the overview group represents a CPQ container row
   * configuration details section (not a nested tab within that section).
   *
   * @param group - Overview group
   * @return - 'true' if the group is a container row details section
   */
  isContainerRowDetailsGroup(group: Configurator.GroupOverview): boolean {
    const prefix = `${Configurator.ContainerRowGroupIdPrefix}@`;
    if (!group.id.startsWith(prefix)) {
      return false;
    }
    const idWithoutPrefix = group.id.substring(prefix.length);
    return idWithoutPrefix.split('@').length === 2;
  }

  /**
   * Resolves the container attribute label for a configuration details section.
   *
   * @param parentGroup - Group that lists the container item
   * @param containerRowGroup - Container row configuration details group
   * @return - Container attribute name
   */
  getContainerAttributeName(
    parentGroup: Configurator.GroupOverview,
    containerRowGroup: Configurator.GroupOverview
  ): string {
    const match = containerRowGroup.id.match(
      new RegExp(`^${Configurator.ContainerRowGroupIdPrefix}@([^@]+)@([^@]+)$`)
    );
    if (!match || !parentGroup.attributes) {
      return '';
    }
    const attributeId = match[1];
    const valueId = match[2];
    const bundleAttribute = parentGroup.attributes.find(
      (attributeOverview) =>
        attributeOverview.type === Configurator.AttributeOverviewType.BUNDLE &&
        attributeOverview.attributeId === attributeId &&
        attributeOverview.valueId === valueId
    );
    return bundleAttribute?.attribute ?? '';
  }
}
