/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors/index';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

/**
 * Service for handling group statuses
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorGroupStatusService {
  constructor(
    protected store: Store<StateWithConfigurator>,
    protected configuratorUtilsService: ConfiguratorUtilsService
  ) {}

  /**
   * Verifies whether the group has been visited.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @param {string} groupId - Group ID
   * @returns {Observable<boolean>} Has group been visited?
   */
  isGroupVisited(
    owner: CommonConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.store.select(
      ConfiguratorSelectors.isGroupVisited(owner.key, groupId)
    );
  }

  /**
   * Returns the first non-conflict group of the configuration which is not
   * completed. A group is considered incomplete when its `complete` flag is
   * falsy. Typed messages are not evaluated here; the backend and normalizers
   * already reflect them in the completeness state.
   *
   * Groups that are not navigation targets (not present in `flatGroups`, e.g.
   * a container row group) are resolved to a navigable descendant, for example
   * the first tab of a nested container row configuration. Returns `undefined`
   * if no such group exists.
   *
   * Groups that are flagged with `incompleteBecauseOfChild` are skipped, because
   * they are only incomplete because of one of their children. The search
   * continues in their subgroups, so that the group actually carrying the issue
   * is returned. Only if this search does not find any group, flagged groups are
   * considered as well.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   *
   * @return {Configurator.Group} - First incomplete group or undefined
   */
  getFirstIncompleteGroup(
    configuration: Configurator.Configuration
  ): Configurator.Group | undefined {
    const navigableGroupIds = new Set(
      configuration.flatGroups?.map((group) => group.id) ?? []
    );
    return (
      this.findFirstIncompleteGroup(
        configuration.groups ?? [],
        navigableGroupIds
      ) ??
      this.findFirstIncompleteGroup(
        configuration.groups ?? [],
        navigableGroupIds,
        false
      )
    );
  }

  /**
   * Depth-first search for the first incomplete non-conflict group.
   *
   * @param groups - Groups to search
   * @param navigableGroupIds - IDs of groups that are valid navigation targets
   * @param skipIncompleteBecauseOfChild - Whether groups that are only incomplete
   *  because of one of their children are skipped
   * @returns First incomplete navigable group, or undefined
   */
  protected findFirstIncompleteGroup(
    groups: Configurator.Group[],
    navigableGroupIds: Set<string>,
    skipIncompleteBecauseOfChild = true
  ): Configurator.Group | undefined {
    for (const group of groups) {
      if (this.isConflictRelatedGroup(group)) {
        continue;
      }
      if (
        this.isIncompleteGroup(group) &&
        !(
          skipIncompleteBecauseOfChild && this.isIncompleteBecauseOfChild(group)
        )
      ) {
        const target = navigableGroupIds.has(group.id)
          ? group
          : this.getNavigationTargetForGroup(
              group,
              navigableGroupIds,
              skipIncompleteBecauseOfChild
            );
        if (target) {
          return target;
        }
      }
      const nestedGroup = this.findFirstIncompleteGroup(
        group.subGroups ?? [],
        navigableGroupIds,
        skipIncompleteBecauseOfChild
      );
      if (nestedGroup) {
        return nestedGroup;
      }
    }
    return undefined;
  }

  /**
   * Whether the group is incomplete only because one of its children is
   * incomplete, and is therefore no target for the issue navigation.
   *
   * @param group - Group to check
   * @returns `true` if the group is only incomplete because of a child
   */
  protected isIncompleteBecauseOfChild(group: Configurator.Group): boolean {
    return group.incompleteBecauseOfChild === true;
  }

  /**
   * Whether the group is incomplete based on its `complete` flag.
   *
   * @param group - Group to check
   * @returns `true` if the group should be treated as incomplete
   */
  protected isIncompleteGroup(group: Configurator.Group): boolean {
    return !group.complete;
  }

  /**
   * Whether the group belongs to the conflict solver area and must therefore
   * be skipped by the incomplete-group search.
   *
   * @param group - Group to check
   * @returns `true` for conflict groups and conflict header groups
   */
  protected isConflictRelatedGroup(group: Configurator.Group): boolean {
    return (
      group.groupType === Configurator.GroupType.CONFLICT_GROUP ||
      group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP
    );
  }

  /**
   * Resolves a non-navigable incomplete group to a navigable descendant.
   * Prefers a descendant that is itself incomplete; otherwise takes the first
   * navigable descendant.
   *
   * @param group - Non-navigable incomplete group
   * @param navigableGroupIds - IDs of groups that are valid navigation targets
   * @param skipIncompleteBecauseOfChild - Whether groups that are only incomplete
   *  because of one of their children are skipped
   * @returns Navigable descendant, or undefined if none exists
   */
  protected getNavigationTargetForGroup(
    group: Configurator.Group,
    navigableGroupIds: Set<string>,
    skipIncompleteBecauseOfChild = true
  ): Configurator.Group | undefined {
    const incompleteDescendant = this.findFirstIncompleteGroup(
      group.subGroups ?? [],
      navigableGroupIds,
      skipIncompleteBecauseOfChild
    );
    if (incompleteDescendant) {
      return incompleteDescendant;
    }
    return this.getFirstNavigableDescendant(group, navigableGroupIds);
  }

  /**
   * Returns the first navigable descendant of the given group in pre-order.
   *
   * @param group - Group whose descendants are searched
   * @param navigableGroupIds - IDs of groups that are valid navigation targets
   * @returns First navigable descendant, or undefined
   */
  protected getFirstNavigableDescendant(
    group: Configurator.Group,
    navigableGroupIds: Set<string>
  ): Configurator.Group | undefined {
    for (const subGroup of group.subGroups ?? []) {
      if (navigableGroupIds.has(subGroup.id)) {
        return subGroup;
      }
      const nested = this.getFirstNavigableDescendant(
        subGroup,
        navigableGroupIds
      );
      if (nested) {
        return nested;
      }
    }
    return undefined;
  }

  /**
   * Determines whether the group has been visited or not.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   * @param {string} groupId - Group ID
   */
  setGroupStatusVisited(
    configuration: Configurator.Configuration,
    groupId: string
  ): void {
    const group = this.configuratorUtilsService.getGroupById(
      configuration.groups,
      groupId
    );
    const parentGroup = this.configuratorUtilsService.getParentGroup(
      configuration.groups,
      this.configuratorUtilsService.getGroupById(configuration.groups, groupId)
    );

    const visitedGroupIds = [];
    visitedGroupIds.push(group.id);
    if (parentGroup) {
      this.getParentGroupStatusVisited(
        configuration,
        group.id,
        parentGroup,
        visitedGroupIds
      );
    }

    this.store.dispatch(
      new ConfiguratorActions.SetGroupsVisited({
        entityKey: configuration.owner.key,
        visitedGroups: visitedGroupIds,
      })
    );
  }

  protected areGroupsVisited(
    owner: CommonConfigurator.Owner,
    groupIds: string[]
  ): Observable<boolean> {
    return this.store.select(
      ConfiguratorSelectors.areGroupsVisited(owner.key, groupIds)
    );
  }

  protected getParentGroupStatusVisited(
    configuration: Configurator.Configuration,
    groupId: string,
    parentGroup: Configurator.Group,
    visitedGroupIds: string[]
  ) {
    const subGroups: string[] = [];
    parentGroup.subGroups.forEach((subGroup) => {
      //The current group is not set to visited yet, therefore we have to exclude it in the check
      if (subGroup.id === groupId) {
        return;
      }
      subGroups.push(subGroup.id);
    });

    this.areGroupsVisited(configuration.owner, subGroups)
      .pipe(take(1))
      .subscribe((isVisited) => {
        if (isVisited) {
          visitedGroupIds.push(parentGroup.id);
          const grandParentGroup = this.configuratorUtilsService.getParentGroup(
            configuration.groups,
            this.configuratorUtilsService.getGroupById(
              configuration.groups,
              parentGroup.id
            )
          );
          if (grandParentGroup) {
            this.getParentGroupStatusVisited(
              configuration,
              parentGroup.id,
              grandParentGroup,
              visitedGroupIds
            );
          }
        }
      });
  }
}
