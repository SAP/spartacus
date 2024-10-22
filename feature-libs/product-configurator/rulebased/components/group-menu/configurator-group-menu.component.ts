/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { FeatureConfigService, TranslationService } from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  BREAKPOINT,
  BreakpointService,
  DirectionMode,
  DirectionService,
  HamburgerMenuService,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorGroupMenuService } from './configurator-group-menu.component.service';

@Component({
  selector: 'cx-configurator-group-menu',
  templateUrl: './configurator-group-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorGroupMenuComponent {
  @ViewChildren('groupItem') groups: QueryList<ElementRef<HTMLElement>>;

  protected breakpointService = inject(BreakpointService);
  private featureConfigService = inject(FeatureConfigService);

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configCommonsService
          .getConfiguration(routerData.owner)
          .pipe(
            map((configuration) => ({ routerData, configuration })),
            //We need to ensure that the navigation to conflict groups or
            //groups with mandatory attributes already has taken place, as this happens
            //in an onInit of another component.
            //otherwise we risk that this component is completely initialized too early,
            //in dev mode resulting in ExpressionChangedAfterItHasBeenCheckedError
            filter(
              (cont) =>
                (cont.configuration.complete &&
                  cont.configuration.consistent) ||
                cont.configuration.interactionState.issueNavigationDone ||
                !cont.routerData.resolveIssues
            )
          )

          .pipe(map((cont) => cont.configuration))
      )
    );

  currentGroup$: Observable<Configurator.Group> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorGroupsService.getCurrentGroup(routerData.owner)
    )
  );
  /**
   * Current parent group. Undefined for top level groups
   */
  displayedParentGroup$: Observable<Configurator.Group | undefined> =
    this.configuration$.pipe(
      switchMap((configuration) =>
        this.configuratorGroupsService.getMenuParentGroup(configuration.owner)
      ),
      switchMap((parentGroup) => {
        return parentGroup
          ? this.getCondensedParentGroup(parentGroup)
          : of(parentGroup);
      })
    );

  displayedGroups$: Observable<Configurator.Group[]> =
    this.displayedParentGroup$.pipe(
      switchMap((parentGroup) => {
        return this.configuration$.pipe(
          map((configuration) => {
            if (parentGroup) {
              return this.condenseGroups(parentGroup.subGroups);
            } else {
              return this.condenseGroups(configuration.groups);
            }
          })
        );
      })
    );

  iconTypes = ICON_TYPE;
  ERROR = ' ERROR';
  COMPLETE = ' COMPLETE';
  WARNING = ' WARNING';
  ICON = 'ICON';

  constructor(
    protected configCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected hamburgerMenuService: HamburgerMenuService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configUtils: ConfiguratorStorefrontUtilsService,
    protected configGroupMenuService: ConfiguratorGroupMenuService,
    protected directionService: DirectionService,
    protected translation: TranslationService,
    protected configExpertModeService: ConfiguratorExpertModeService
  ) {}

  /**
   * Selects group or navigates to sub-group depending on clicked group
   *
   * @param {Configurator.Group} group - Target Group
   * @param {Configurator.Group} currentGroup - Current group
   */
  click(group: Configurator.Group, currentGroup?: Configurator.Group): void {
    this.configuration$.pipe(take(1)).subscribe((configuration) => {
      if (configuration.interactionState.currentGroup === group.id) {
        return;
      }
      if (!this.configuratorGroupsService.hasSubGroups(group)) {
        this.configuratorGroupsService.navigateToGroup(configuration, group.id);
        this.hamburgerMenuService.toggle(true);

        this.configUtils.scrollToConfigurationElement(
          '.VariantConfigurationTemplate, .CpqConfigurationTemplate'
        );
      } else {
        this.configuratorGroupsService.setMenuParentGroup(
          configuration.owner,
          group.id
        );
        if (currentGroup) {
          this.setFocusForSubGroup(group, currentGroup.id);
        }
      }
    });
  }

  /**
   * Navigate up and set focus if current group information is provided
   *
   * @param {Configurator.Group} currentGroup - Current group
   */
  navigateUp(currentGroup?: Configurator.Group): void {
    this.displayedParentGroup$
      .pipe(take(1))
      .subscribe((displayedParentGroup) => {
        //we only navigate up if we are not on a sub level group
        if (displayedParentGroup) {
          const grandParentGroup$ = this.getParentGroup(displayedParentGroup);
          this.configuration$.pipe(take(1)).subscribe((configuration) => {
            grandParentGroup$.pipe(take(1)).subscribe((grandParentGroup) => {
              this.configuratorGroupsService.setMenuParentGroup(
                configuration.owner,
                grandParentGroup ? grandParentGroup.id : undefined
              );
            });
          });
        }
      });
    if (currentGroup) {
      this.setFocusForMainMenu(currentGroup.id);
    }
  }

  /**
   * Retrieves the number of conflicts for the current group.
   *
   * @param {Configurator.Group} group - Current group
   * @return {string} - number of conflicts
   */
  getConflictNumber(group: Configurator.Group): string {
    if (
      group &&
      group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP
    ) {
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
  hasSubGroups(group: Configurator.Group): boolean {
    return this.configuratorGroupsService.hasSubGroups(group);
  }

  /**
   * Retrieves observable of parent group for a group
   * @param group
   * @returns Parent group, undefined in case input group is already on root level
   */
  protected getParentGroup(
    group: Configurator.Group
  ): Observable<Configurator.Group | undefined> {
    return this.configuration$.pipe(
      map((configuration) =>
        this.configuratorGroupsService.getParentGroup(
          configuration.groups,
          group
        )
      )
    );
  }

  getCondensedParentGroup(
    parentGroup: Configurator.Group
  ): Observable<Configurator.Group | undefined> {
    if (
      parentGroup &&
      parentGroup.subGroups &&
      parentGroup.subGroups.length === 1 &&
      parentGroup.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP
    ) {
      return this.getParentGroup(parentGroup).pipe(
        switchMap((group) => {
          return group ? this.getCondensedParentGroup(group) : of(group);
        })
      );
    } else {
      return of(parentGroup);
    }
  }

  condenseGroups(groups: Configurator.Group[]): Configurator.Group[] {
    return groups.flatMap((group) => {
      if (
        group.subGroups.length === 1 &&
        group.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP
      ) {
        return this.condenseGroups(group.subGroups);
      } else {
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
  isGroupVisited(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): Observable<boolean> {
    return this.configuratorGroupsService
      .isGroupVisited(configuration.owner, group.id)
      .pipe(
        map(
          (isVisited) =>
            isVisited &&
            !this.isConflictGroupType(
              group.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP
            )
        ),
        take(1)
      );
  }

  /**
   * Verifies whether the current group is conflict one.
   *
   * @param {Configurator.GroupType} groupType - Group type
   * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
   */
  isConflictGroupType(groupType: Configurator.GroupType | undefined): boolean {
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
  isConflictHeader(group: Configurator.Group): boolean {
    return (
      group && group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP
    );
  }

  /**
   * Returns true if group is conflict group.
   *
   * @param {Configurator.Group} group - Current group
   *  @return {boolean} - Returns 'true' if the current group is conflict group, otherwise 'false'.
   */
  isConflictGroup(group: Configurator.Group): boolean {
    return group && group.groupType === Configurator.GroupType.CONFLICT_GROUP;
  }

  /**
   * Returns group-status style classes dependent on completeness, conflicts, visited status and configurator type.
   *
   * @param {Configurator.Group} group - Current group
   * @param {Configurator.Configuration} configuration - Configuration
   * @return {Observable<boolean>} - true if visited and not a conflict group
   */
  getGroupStatusStyles(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): Observable<string> {
    return this.isGroupVisited(group, configuration).pipe(
      map((isVisited) => {
        const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
        let groupStatusStyle: string = 'cx-menu-item';
        if (
          configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
          !group.consistent
        ) {
          groupStatusStyle = groupStatusStyle + this.WARNING;
        }
        if (
          configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
          group.complete &&
          group.consistent &&
          isVisited
        ) {
          groupStatusStyle = groupStatusStyle + this.COMPLETE;
        }
        if (!group.complete && isVisited) {
          groupStatusStyle = groupStatusStyle + this.ERROR;
        }
        return groupStatusStyle;
      })
    );
  }

  protected isLTRDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.LTR;
  }

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }

  /**
   * Verifies whether the user navigates into a subgroup of the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
   * @protected
   */
  protected isForwardsNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowRight' && this.isLTRDirection()) ||
      (event.code === 'ArrowLeft' && this.isRTLDirection())
    );
  }

  /**
   * Verifies whether the user navigates from a subgroup back to the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
   * @protected
   */
  protected isBackNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowLeft' && this.isLTRDirection()) ||
      (event.code === 'ArrowRight' && this.isRTLDirection())
    );
  }

  /**
   * Switches the group on pressing an arrow key.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @param {string} groupIndex - Group index
   * @param {Configurator.Group} targetGroup - Target group
   * @param {Configurator.Group} currentGroup - Current group
   */
  switchGroupOnArrowPress(
    event: KeyboardEvent,
    groupIndex: number,
    targetGroup: Configurator.Group,
    currentGroup: Configurator.Group
  ): void {
    this.handleFocusLoopInMobileMode(event);
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      this.configGroupMenuService.switchGroupOnArrowPress(
        event,
        groupIndex,
        this.groups
      );
    } else if (this.isForwardsNavigation(event)) {
      if (targetGroup && this.hasSubGroups(targetGroup)) {
        this.click(targetGroup, currentGroup);
      }
    } else if (this.isBackNavigation(event)) {
      if (this.configGroupMenuService.isBackBtnFocused(this.groups)) {
        this.navigateUp(currentGroup);
      }
    }
  }

  /**
   * In mobile mode the focus should be set to the first element of the menu ('X') if tab is pressed on the active group menu item.
   * If the focus is currently on the back-button it needs to be checked if the active group is currently in the list of displayed groups.
   * Only if the active group is not in the list of displayed groups, the focus should be set to the first element of the menu ('X') otherwise
   * the focus is set to the active group menu item.
   *
   * @param {KeyboardEvent} event - Keyboard event
   */
  protected handleFocusLoopInMobileMode(event: KeyboardEvent): void {
    this.breakpointService
      .isDown(BREAKPOINT.md)
      .pipe(take(1))
      .subscribe((isMobile) => {
        if (isMobile && event.code === 'Tab' && !event.shiftKey) {
          if (this.configGroupMenuService.isBackBtnFocused(this.groups)) {
            if (
              !this.configGroupMenuService.isActiveGroupInGroupList(this.groups)
            ) {
              event.preventDefault();
              this.configUtils.focusFirstActiveElement('cx-hamburger-menu');
            }
          } else {
            event.preventDefault();
            this.configUtils.focusFirstActiveElement('cx-hamburger-menu');
          }
        }
      });
  }

  /**
   * Persists the keyboard focus state for the given key
   * from the main group menu by back navigation.
   *
   * @param {string} currentGroupId - Current group ID
   */
  setFocusForMainMenu(currentGroupId?: string): void {
    let key: string | undefined = currentGroupId;
    this.configuration$.pipe(take(1)).subscribe((configuration) => {
      configuration.groups?.forEach((group) => {
        if (
          group.subGroups?.length !== 1 &&
          (this.isGroupSelected(group.id, currentGroupId) ||
            this.containsSelectedGroup(group, currentGroupId))
        ) {
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
  setFocusForSubGroup(
    group: Configurator.Group,
    currentGroupId?: string
  ): void {
    let key: string | undefined = 'cx-menu-back';
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
  containsSelectedGroup(
    group: Configurator.Group,
    currentGroupId?: string
  ): boolean {
    return !!group.subGroups?.find(
      (subGroup) =>
        this.isGroupSelected(subGroup.id, currentGroupId) ||
        this.containsSelectedGroup(subGroup, currentGroupId)
    );
  }

  /**
   * Retrieves the tab index depending on if the the current group is selected
   * or the parent group contains the selected group.
   *
   * @param {Configurator.Group} group - Group
   * @param {string} currentGroupId - Current group ID
   * @returns {number} - tab index
   */
  getTabIndex(group: Configurator.Group, currentGroupId: string): number {
    const isCurrentGroupPartOfGroupHierarchy =
      this.isGroupSelected(group.id, currentGroupId) ||
      this.containsSelectedGroup(group, currentGroupId);
    return isCurrentGroupPartOfGroupHierarchy ? 0 : -1; // 0 -> add to tab chain, -1 -> remove from tab chain
  }

  /**
   * Verifies whether the current group is selected.
   *
   * @param {string} groupId - group ID
   * @param {string} currentGroupId - Current group ID
   * @returns {boolean} - 'true' if the current group is selected, otherwise 'false'
   */
  isGroupSelected(groupId?: string, currentGroupId?: string): boolean {
    return groupId === currentGroupId;
  }

  /**
   * Generates a group ID for aria-controls.
   *
   * @param {string} groupId - group ID
   * @returns {string | undefined} - generated group ID
   */
  createAriaControls(groupId?: string): string | undefined {
    return this.configUtils.createGroupId(groupId);
  }

  /**
   * Generates aria-label for group menu item
   *
   * @param {Configurator.Group} group - group
   * @returns {string | undefined} - generated group ID
   */
  getAriaLabel(group: Configurator.Group): string {
    let translatedText = '';
    if (group && group.groupType && this.isConflictGroupType(group.groupType)) {
      if (this.isConflictHeader(group)) {
        this.translation
          .translate('configurator.a11y.conflictsInConfiguration', {
            numberOfConflicts: this.getConflictNumber(group),
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      } else {
        translatedText = group.description ? group.description : '';
      }
    } else {
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
  createIconId(type: ICON_TYPE, groupId?: string): string | undefined {
    return this.ICON + type + groupId;
  }

  /**
   * Generates aria-describedby
   *
   * @param {Configurator.Group} group - Current group
   * @param {Configurator.Configuration} configuration - Configuration
   * @return {Observable<string>} - aria-describedby
   */
  getAriaDescribedby(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): Observable<string> {
    return this.isGroupVisited(group, configuration).pipe(
      map((isVisited) => {
        const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
        let ariaDescribedby: string = '';
        if (
          configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
          !group.consistent &&
          group.groupType &&
          !this.isConflictGroupType(group.groupType)
        ) {
          ariaDescribedby =
            ariaDescribedby + this.createIconId(ICON_TYPE.WARNING, group.id);
        }
        if (
          configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
          group.complete &&
          group.consistent &&
          isVisited
        ) {
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
      })
    );
  }

  getGroupMenuTitle(group: Configurator.Group): string | undefined {
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

  displayMenuItem(group: Configurator.Group): Observable<boolean> {
    return this.configuration$.pipe(
      map((configuration) => {
        let displayMenuItem = true;
        if (
          configuration.immediateConflictResolution &&
          group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP
        ) {
          displayMenuItem = false;
        }
        return displayMenuItem;
      })
    );
  }

  /**
   * Checks if conflict solver dialog is active
   * @param configuration
   * @returns Conflict solver dialog active?
   */
  isDialogActive(configuration: Configurator.Configuration): boolean {
    return configuration.interactionState.showConflictSolverDialog ?? false;
  }

  /**
   * track-by function for the *ngFor generating the group menu,
   * returning the group id if the 'productConfiguratorDeltaRendering' toggle is active.
   *
   * @param _index
   * @param group
   * @returns groupId if feature 'productConfiguratorDeltaRendering' is active, the group itself otherwise (same as if there were not track-by function)
   */
  trackByFn = (_index: number, group: Configurator.Group) => {
    return this.featureConfigService.isEnabled(
      'productConfiguratorDeltaRendering'
    )
      ? group.id
      : group;
  };
}
