import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

/**
 * Service for handling configuration groups
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorGroupsService {
  constructor(
    protected store: Store<StateWithConfigurator>,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorUtilsService: ConfiguratorUtilsService,
    protected configuratorGroupStatusService: ConfiguratorGroupStatusService
  ) {}

  /**
   * Returns the current group Id.
   * In case no group Id is being set before returns the first group of the configuration.
   * Return null when configuration contains no groups.
   *
   * @param {CommonConfigurator.Owner} owner configuration owner
   * @returns {Observable<string>} Group ID
   */
  getCurrentGroupId(owner: CommonConfigurator.Owner): Observable<string> {
    return this.configuratorCommonsService.getConfiguration(owner).pipe(
      map((configuration) => {
        if (configuration?.interactionState.currentGroup) {
          return configuration.interactionState.currentGroup;
        } else {
          return configuration?.groups[0]?.id;
        }
      })
    );
  }

  /**
   * Return the first conflict group of a configuration or undefined
   * if not present
   *
   * @param {Configurator.Configuration} configuration - Configuration
   * @returns {Configurator.Group} Conflict group
   */
  getFirstConflictGroup(
    configuration: Configurator.Configuration
  ): Configurator.Group | undefined {
    return configuration.flatGroups.find(
      (group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP
    );
  }

  /**
   * Navigates to the first non-conflict group of the configuration which is not completed.
   * This method assumes that the configuration has incomplete groups,
   * the caller has to verify this prior to calling this method. In case no incomplete group is
   * present, nothing will happen
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   */
  navigateToFirstIncompleteGroup(owner: CommonConfigurator.Owner): void {
    this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(take(1))
      .subscribe((configuration) => {
        const groupId =
          this.configuratorGroupStatusService.getFirstIncompleteGroup(
            configuration
          )?.id;
        if (groupId) {
          this.navigateToGroup(configuration, groupId, true);
        }
      });
  }

  /**
   * Navigates to the first conflict group and sets the conflict header as parent group.
   * This method assumes that the configuration has conflicts,
   * the caller has to verify this prior to calling this method. In case no conflict group
   * is present, nothing will happen
   *
   * @param {CommonConfigurator.Owner} owner Configuration Owner
   */
  navigateToConflictSolver(owner: CommonConfigurator.Owner): void {
    this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(take(1))
      .subscribe((configuration) => {
        const groupId = this.getFirstConflictGroup(configuration)?.id;
        if (groupId) {
          this.navigateToGroup(configuration, groupId, true);
        }
      });
  }

  /**
   * Returns the parent group of the subgroup that is displayed in the group menu.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @returns {Observable<Configurator.Group>} Group
   */
  getMenuParentGroup(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Group | undefined> {
    return this.configuratorCommonsService.getConfiguration(owner).pipe(
      map((configuration) => {
        const menuParentGroup = configuration.interactionState.menuParentGroup;
        return menuParentGroup
          ? this.configuratorUtilsService.getOptionalGroupById(
              configuration.groups,
              menuParentGroup
            )
          : undefined;
      })
    );
  }

  /**
   * Set the parent group, specified by the group ID, which is displayed in the group menu.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @param {string} groupId - Group ID. Can be ommitted, in this case parent group will be cleared, in case we are on root level
   */
  setMenuParentGroup(owner: CommonConfigurator.Owner, groupId?: string): void {
    this.store.dispatch(
      new ConfiguratorActions.SetMenuParentGroup({
        entityKey: owner.key,
        menuParentGroup: groupId,
      })
    );
  }

  /**
   * Returns the group that is currently visited.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @return {Observable<Configurator.Group>} Current group
   */
  getCurrentGroup(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Group> {
    return this.getCurrentGroupId(owner).pipe(
      switchMap((currentGroupId) => {
        return this.configuratorCommonsService
          .getConfiguration(owner)
          .pipe(
            map((configuration) =>
              this.configuratorUtilsService.getGroupById(
                configuration.groups,
                currentGroupId
              )
            )
          );
      })
    );
  }

  /**
   * Determines whether the group has been visited or not.
   *
   * @param {CommonConfigurator.Owner} owner - Owner
   * @param {string} groupId - Group ID
   */
  setGroupStatusVisited(
    owner: CommonConfigurator.Owner,
    groupId: string
  ): void {
    this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(
        map((configuration) =>
          this.configuratorGroupStatusService.setGroupStatusVisited(
            configuration,
            groupId
          )
        ),
        take(1)
      )
      .subscribe();
  }

  /**
   * Navigates to the group, specified by its group ID.
   *
   * @param {Configurator.Configuration}configuration - Configuration
   * @param {string} groupId - Group ID
   * @param {boolean} setStatus - Group status will be set for previous group, default true
   */
  navigateToGroup(
    configuration: Configurator.Configuration,
    groupId: string,
    setStatus = true
  ): void {
    if (setStatus) {
      //Set Group status for current group
      this.getCurrentGroup(configuration.owner)
        .pipe(take(1))
        .subscribe((currentGroup) => {
          this.configuratorGroupStatusService.setGroupStatusVisited(
            configuration,
            currentGroup.id
          );
        });
    }

    const parentGroup = this.configuratorUtilsService.getParentGroup(
      configuration.groups,
      this.configuratorUtilsService.getGroupById(configuration.groups, groupId)
    );

    this.store.dispatch(
      new ConfiguratorActions.ChangeGroup({
        configuration: configuration,
        groupId: groupId,
        parentGroupId: parentGroup ? parentGroup.id : undefined,
      })
    );
  }

  /**
   * Returns the group ID of the group that is coming after the current one in a sequential order.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @return {Observable<string> | undefined} ID of next group
   */
  getNextGroupId(
    owner: CommonConfigurator.Owner
  ): Observable<string | undefined> {
    return this.getNeighboringGroupId(owner, 1);
  }

  /**
   * Returns the group ID of the group that is preceding the current one in a sequential order.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @return {Observable<string | undefined >} ID of previous group
   */
  getPreviousGroupId(
    owner: CommonConfigurator.Owner
  ): Observable<string | undefined> {
    return this.getNeighboringGroupId(owner, -1);
  }

  /**
   * Verifies whether the group has been visited
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @param {string} groupId - Group ID
   * @return {Observable<boolean>} Has been visited?
   */
  isGroupVisited(
    owner: CommonConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.configuratorGroupStatusService.isGroupVisited(owner, groupId);
  }

  /**
   * Returns a parent group for the given group.
   *
   * @param {Configurator.Group[]} groups - List of groups where we search for the parent group
   * @param {Configurator.Group} group - Given group
   * @return {Configurator.Group} Parent group or undefined if group is a top-level group
   */
  getParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group
  ): Configurator.Group | undefined {
    return this.configuratorUtilsService.getParentGroup(groups, group);
  }

  /**
   * Verifies whether the given group has sub groups.
   *
   * @param {Configurator.Group} group - Given group
   * @return {boolean} Sub groups available?
   */
  hasSubGroups(group: Configurator.Group): boolean {
    return this.configuratorUtilsService.hasSubGroups(group);
  }

  /**
   * Retrieves a group ID of the neighboring group.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @param {number} neighboringIndex - Index of neighboring group
   * @return {Observable<string>} group ID of the neighboring group
   */
  protected getNeighboringGroupId(
    owner: CommonConfigurator.Owner,
    neighboringIndex: number
  ): Observable<string | undefined> {
    return this.getCurrentGroupId(owner).pipe(
      switchMap((currentGroupId) => {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(
          map((configuration) => {
            let nextGroup;
            configuration?.flatGroups.forEach((group, index) => {
              if (
                group.id === currentGroupId &&
                configuration?.flatGroups &&
                configuration?.flatGroups[index + neighboringIndex] //Check if neighboring group exists
              ) {
                nextGroup =
                  configuration?.flatGroups[index + neighboringIndex].id;
              }
            });
            return nextGroup;
          }),
          take(1)
        );
      })
    );
  }

  /**
   * Verifies whether the current group is conflict one.
   *
   * @param {Configurator.GroupType} groupType - Group type
   * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
   */
  isConflictGroupType(groupType: Configurator.GroupType): boolean {
    return (
      groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP ||
      groupType === Configurator.GroupType.CONFLICT_GROUP
    );
  }
}
