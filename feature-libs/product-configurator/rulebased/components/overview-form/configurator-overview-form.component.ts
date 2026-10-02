/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import {
  FeatureToggles,
  TranslatePipe,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
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
  /**
   * ID of the overview content region, the target of the overview skip link.
   */
  static readonly OVERVIEW_CONTENT_ID = 'cx-configurator-overview-content';

  @HostBinding('class.ghost') ghostStyle = true;

  private featureToggles = inject(FeatureToggles);
  protected translationService = inject(TranslationService);

  /**
   * Accessible name of the overview content region.
   * Only set if in-page navigation is enabled.
   */
  @HostBinding('attr.aria-label') contentLabel: string | null = null;

  /**
   * Whether the overview form acts as target of the accessible in-page
   * navigation: the host is exposed as focusable region and the group
   * headings are programmatically focusable.
   *
   * @returns {boolean} - `true` if `productConfiguratorCPQContainer` is enabled
   */
  get isInPageNavigationEnabled(): boolean {
    return !!this.featureToggles.productConfiguratorCPQContainer;
  }

  @HostBinding('attr.id') get contentId(): string | null {
    return this.isInPageNavigationEnabled
      ? ConfiguratorOverviewFormComponent.OVERVIEW_CONTENT_ID
      : null;
  }

  @HostBinding('attr.role') get contentRole(): string | null {
    return this.isInPageNavigationEnabled ? 'region' : null;
  }

  @HostBinding('attr.tabindex') get contentTabindex(): number | null {
    return this.isInPageNavigationEnabled ? -1 : null;
  }

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
  ) {
    useFeatureStyles('productConfiguratorCPQContainer');
    if (this.isInPageNavigationEnabled) {
      this.translationService
        .translate('configurator.a11y.overviewContent')
        .pipe(takeUntilDestroyed())
        .subscribe((label) => (this.contentLabel = label));
    }
  }

  /**
   * Does the configuration contain any selected attribute values?
   * @param {Configurator.Configuration} configuration - Current configuration
   * @returns {boolean} - Any attributes available
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
   * @param {Configurator.AttributeOverview[]} attributes - Attribute array
   * @param {number} index - Index of the attribute in the array
   * @return {boolean} - 'True' if it is the same attribute, otherwise 'false'
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
   * @param {Configurator.AttributeOverview[]} attributes - Attribute array
   * @param {number} index - Index of the attribute in the array
   * @return {string} - corresponding style class
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
   * @param {number} level - Group level. 1 is top level.
   * @param {Configurator.GroupOverview[]} subGroups - subgroups array
   * @return {string} - corresponding style classes
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
   * @param {string | undefined} prefix - prefix that we need to make the ID unique
   * @param {string} groupId - group ID
   * @returns {string} - prefix ID
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
   * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
   * @param {string} groupId - local group id
   * @return {string} - unique group id
   */
  getGroupId(idPrefix: string, groupId: string): string {
    return this.configuratorStorefrontUtilsService.createOvGroupId(
      idPrefix,
      groupId
    );
  }
}
