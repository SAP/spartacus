/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { TranslatePipe, TranslationService } from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  BREAKPOINT,
  BreakpointService,
  DirectionMode,
  DirectionService,
  FocusDirective,
  HamburgerMenuService,
  ICON_TYPE,
  IconComponent,
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
  imports: [
    NgIf,
    NgFor,
    FocusDirective,
    IconComponent,
    NgClass,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorGroupMenuComponent {
  @ViewChildren('groupItem') groups: QueryList<ElementRef<HTMLElement>>;

  protected breakpointService = inject(BreakpointService);

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
   * Selects group or navigates to subgroup depending on clicked group
   *
   * @param group - Target Group
   * @param currentGroup - Current group
   */
  click(group: Configurator.Group, currentGroup?: Configurator.Group): void {
    this.configuration$.pipe(take(1)).subscribe((configuration) => {
      const isDifferentGroup =
        configuration.interactionState.currentGroup !== group.id;
      if (
        this.configuratorGroupsService.hasSubGroups(group) &&
        !(isDifferentGroup && this.hasContainerRowSubGroups(group))
      ) {
        this.configuratorGroupsService.setMenuParentGroup(
          configuration.owner,
          group.id
        );
        if (currentGroup) {
          this.setFocusForSubGroup(group, currentGroup.id);
        }
      } else if (isDifferentGroup) {
        this.configuratorGroupsService.navigateToGroup(configuration, group.id);
        this.hamburgerMenuService.toggle(true);

        this.configUtils.scrollToConfigurationElement(
          '.VariantConfigurationTemplate, .CpqConfigurationTemplate'
        );
      }
    });
  }

  /**
   * Navigate up and set focus if current group information is provided
   *
   * @param currentGroup - Current group
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
   * @param group - Current group
   * @return - number of conflicts
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
   * @param group - Current group
   * @return - Returns 'true' if the current group has a subgroups, otherwise 'false'.
   */
  hasSubGroups(group: Configurator.Group): boolean {
    return this.configuratorGroupsService.hasSubGroups(group);
  }

  /**
   * Checks whether any direct child is a container row group.
   * Those children are nested product configurations, so the parent
   * remains a navigable tab rather than a structural folder.
   *
   * @param group - Given group
   * @return - `true` if a child is a container row group
   */
  protected hasContainerRowSubGroups(group: Configurator.Group): boolean {
    return (
      group.subGroups?.some(
        (subGroup) =>
          subGroup.groupType === Configurator.GroupType.CONTAINER_ROW_GROUP
      ) ?? false
    );
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

  /**
   * Retrieves the parent group observable, condensing intermediate levels
   * when the parent only has a single subgroup in the menu.
   *
   * @param parentGroup - Parent group to condense
   * @returns Observable of the condensed parent group, or `undefined` at root level
   */
  getCondensedParentGroup(
    parentGroup: Configurator.Group
  ): Observable<Configurator.Group | undefined> {
    if (parentGroup && parentGroup.subGroups && this.isCondensed(parentGroup)) {
      return this.getParentGroup(parentGroup).pipe(
        switchMap((group) => {
          return group ? this.getCondensedParentGroup(group) : of(group);
        })
      );
    } else {
      return of(parentGroup);
    }
  }

  /**
   * Flattens the group hierarchy for display in the menu by replacing
   * single-child structural groups with their child when appropriate.
   *
   * @param groups - Groups to condense
   * @returns Condensed group list for menu display
   */
  condenseGroups(groups: Configurator.Group[]): Configurator.Group[] {
    return groups.flatMap((group) => {
      if (this.isCondensed(group)) {
        const condensedChildren = this.condenseGroups(group.subGroups);
        return this.hasNoAttributes(group) && condensedChildren.length === 1
          ? this.mergeWithSingleChild(group, condensedChildren[0])
          : condensedChildren;
      } else {
        return group;
      }
    });
  }

  /**
   * Determines whether a group is replaced by its single sub group in the menu.
   *
   * @param group - Given group
   * @return - Is the group condensed?
   */
  protected isCondensed(group: Configurator.Group): boolean {
    return (
      group.subGroups.length === 1 &&
      group.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP &&
      // A container row group is a nested product configuration rather than a
      // structural group. Condensing its parent away would hide the attributes of
      // the parent, among them the container that the row belongs to.
      group.subGroups[0].groupType !==
        Configurator.GroupType.CONTAINER_ROW_GROUP
    );
  }

  /**
   * Verifies whether the group carries no attributes. Empty structural
   * groups (e.g. CPQ container row groups) are merged with their single
   * child so that the menu keeps the parent's description.
   *
   * @param group - Given group
   * @return - `true` if the group has no attributes
   */
  protected hasNoAttributes(group: Configurator.Group): boolean {
    return !group.attributes?.length;
  }

  /**
   * Merges a structural parent with its only condensed child: the child
   * remains the navigation target, while the parent's description and name
   * are shown in the menu.
   *
   * @param group - Parent group
   * @param child - Condensed child group
   * @return - Merged group
   */
  protected mergeWithSingleChild(
    group: Configurator.Group,
    child: Configurator.Group
  ): Configurator.Group {
    return {
      ...child,
      description: group.description ?? child.description,
      name: group.name ?? child.name,
    };
  }

  /**
   * Returns true if group has been visited and if the group is not a conflict group.
   *
   * @param group - Current group
   * @param configuration - Configuration
   * @return - true if visited and not a conflict group
   */
  isGroupVisited(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): Observable<boolean> {
    return this.configUtils
      .isCartEntryOrGroupVisited(configuration.owner, group.id)
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
   * @param groupType - Group type
   * @return - 'True' if the current group is conflict one, otherwise 'false'.
   */
  isConflictGroupType(groupType: Configurator.GroupType | undefined): boolean {
    return groupType
      ? this.configuratorGroupsService.isConflictGroupType(groupType)
      : false;
  }

  /**
   * Returns true if group is conflict header group.
   *
   * @param group - Current group
   *  @return - Returns 'true' if the current group is conflict header group, otherwise 'false'.
   */
  isConflictHeader(group: Configurator.Group): boolean {
    return (
      group && group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP
    );
  }

  /**
   * Returns true if group is conflict group.
   *
   * @param group - Current group
   *  @return - Returns 'true' if the current group is conflict group, otherwise 'false'.
   */
  isConflictGroup(group: Configurator.Group): boolean {
    return group && group.groupType === Configurator.GroupType.CONFLICT_GROUP;
  }

  /**
   * Verifies whether a group is complete, consistent, and has been visited.
   *
   * @param group - Current group
   * @param isVisited - Whether the group has been visited
   * @returns `true` when the group is complete and consistent and visited
   * @protected
   */
  protected isGroupCompleted(
    group: Configurator.Group,
    isVisited: boolean
  ): boolean {
    return Boolean(group.complete && group.consistent && isVisited);
  }

  /**
   * Verifies whether a group is incomplete and has been visited.
   *
   * @param group - Current group
   * @param isVisited - Whether the group has been visited
   * @returns `true` when the group is faulty (incomplete) and visited
   * @protected
   */
  protected isGroupFaulty(
    group: Configurator.Group,
    isVisited: boolean
  ): boolean {
    return Boolean(!group.complete && isVisited);
  }

  /**
   * Verifies whether a group should show a warning indicator.
   *
   * In the VCP context, a warning indicates that the group has conflicts
   * (is inconsistent). CPQ does not have conflicts, so this returns `false`
   * for Cloud CPQ configurators.
   *
   * @param group - Current group
   * @param configuration - Configuration
   * @returns `true` when the group has conflicts in a VCP context
   * @protected
   */
  protected hasGroupWarning(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): boolean {
    const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
    return Boolean(
      configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
        !group.consistent
    );
  }

  /**
   * Returns group-status style classes dependent on completeness, conflicts, visited status and configurator type.
   *
   * @param group - Current group
   * @param configuration - Configuration
   * @returns CSS class names for the group menu item
   */
  getGroupStatusStyles(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): Observable<string> {
    return this.isGroupVisited(group, configuration).pipe(
      map((isVisited) => {
        let groupStatusStyle: string = 'cx-menu-item';
        if (this.hasGroupWarning(group, configuration)) {
          groupStatusStyle = groupStatusStyle + this.WARNING;
        }
        if (this.isGroupCompleted(group, isVisited)) {
          groupStatusStyle = groupStatusStyle + this.COMPLETE;
        }
        if (this.isGroupFaulty(group, isVisited)) {
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
   * @param event - Keyboard event
   * @returns -'true' if the user navigates into the subgroup, otherwise 'false'.
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
   * @param event - Keyboard event
   * @returns -'true' if the user navigates back into the main group menu, otherwise 'false'.
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
   * @param event - Keyboard event
   * @param groupIndex - Group index
   * @param targetGroup - Target group
   * @param currentGroup - Current group
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
   * @param event - Keyboard event
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
   * @param currentGroupId - Current group ID
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
   * @param group - Group
   * @param currentGroupId - Current group ID
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
   * @param group - Group
   * @param currentGroupId - Current group ID
   * @returns - 'true' if the parent group contains a selected group, otherwise 'false'
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
   * Retrieves the tab index depending on if the current group is selected
   * or the parent group contains the selected group.
   *
   * @param group - Group
   * @param currentGroupId - Current group ID
   * @returns - tab index
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
   * @param groupId - group ID
   * @param currentGroupId - Current group ID
   * @returns - 'true' if the current group is selected, otherwise 'false'
   */
  isGroupSelected(groupId?: string, currentGroupId?: string): boolean {
    return groupId === currentGroupId;
  }

  /**
   * Generates a group ID for aria-controls.
   *
   * @param groupId - group ID
   * @returns - generated group ID
   */
  createAriaControls(groupId?: string): string | undefined {
    return this.configUtils.createGroupId(groupId);
  }

  /**
   * Generates aria-label for group menu item
   *
   * @param group - Group
   * @returns Translated aria-label for the group menu item
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
   * @param type - icon type
   * @param groupId - group id
   * @returns - generated icon id
   */
  createIconId(type: ICON_TYPE, groupId?: string): string | undefined {
    return this.ICON + type + groupId;
  }

  /**
   * Generates aria-describedby
   *
   * @param group - Current group
   * @param configuration - Configuration
   * @return - aria-describedby
   */
  getAriaDescribedby(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): Observable<string> {
    return this.isGroupVisited(group, configuration).pipe(
      map((isVisited) =>
        this.buildAriaDescribedby(group, configuration, isVisited)
      )
    );
  }

  /**
   * Builds aria-describedby value for a group menu item.
   *
   * @param group - Current group
   * @param configuration - Configuration
   * @param isVisited - Whether the group has been visited
   * @returns aria-describedby value
   * @protected
   */
  protected buildAriaDescribedby(
    group: Configurator.Group,
    configuration: Configurator.Configuration,
    isVisited: boolean
  ): string {
    let ariaDescribedby = '';

    if (this.shouldShowWarningAriaIcon(group, configuration)) {
      ariaDescribedby =
        ariaDescribedby +
        (this.createIconId(ICON_TYPE.WARNING, group.id) ?? '');
    }
    if (this.isGroupCompleted(group, isVisited)) {
      ariaDescribedby =
        ariaDescribedby +
        ' ' +
        (this.createIconId(ICON_TYPE.SUCCESS, group.id) ?? '');
    }
    if (this.isGroupFaulty(group, isVisited)) {
      ariaDescribedby =
        ariaDescribedby +
        ' ' +
        (this.createIconId(ICON_TYPE.ERROR, group.id) ?? '');
    }
    if (this.hasSubGroups(group)) {
      ariaDescribedby =
        ariaDescribedby +
        ' ' +
        (this.createIconId(ICON_TYPE.CARET_RIGHT, group.id) ?? '');
    }
    ariaDescribedby = ariaDescribedby + ' inListOfGroups';
    return ariaDescribedby;
  }

  /**
   * Verifies whether the warning icon should be referenced in aria-describedby.
   *
   * @param group - Current group
   * @param configuration - Configuration
   * @returns `true` when the warning icon applies
   * @protected
   */
  protected shouldShowWarningAriaIcon(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): boolean {
    return (
      this.hasGroupWarning(group, configuration) &&
      Boolean(group.groupType) &&
      !this.isConflictGroupType(group.groupType)
    );
  }

  /**
   * Returns the title shown for a group menu item. Includes the technical
   * group name when expert mode is active, except for conflict groups.
   *
   * @param group - Group to display
   * @returns Group menu title
   */
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

  /**
   * Determines whether a group menu item should be shown.
   *
   * @param group - Group to check
   * @returns Observable that emits `true` when the menu item is visible
   */
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
   * Checks if conflict solver dialog is active.
   *
   * @param configuration - Configuration
   * @returns - Conflict solver dialog active?
   */
  isDialogActive(configuration: Configurator.Configuration): boolean {
    return configuration.interactionState.showConflictSolverDialog ?? false;
  }

  /**
   * track-by function for the *ngFor generating the group menu,
   * returning the group id
   *
   * @param _index
   * @param group
   * @returns groupId
   */
  trackByFn = (_index: number, group: Configurator.Group) => {
    return group.id;
  };
}
