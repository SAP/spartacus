import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenericConfigurator } from '@spartacus/core';
import { Observable, of } from 'rxjs';
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
   * @param {GenericConfigurator.Owner} owner configuration owner
   * @returns {Observable<string>} Group ID
   */
  getCurrentGroupId(owner: GenericConfigurator.Owner): Observable<string> {
    return this.configuratorCommonsService.getConfiguration(owner).pipe(
      map((configuration) => {
        if (configuration?.interactionState?.currentGroup) {
          return configuration.interactionState.currentGroup;
        } else {
          return configuration?.flatGroups?.length > 0
            ? configuration.flatGroups[0].id
            : null;
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
  ): Configurator.Group {
    return configuration.flatGroups.find(
      (group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP
    );
  }

  /**
   * Navigates to the first non-conflict group of the configuration which is not completed.
   * This method assumes that the configuration has incomplete groups,
   * the caller has to verify this prior to calling this method.
   *
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   */
  navigateToFirstIncompleteGroup(owner: GenericConfigurator.Owner): void {
    this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(take(1))
      .subscribe((configuration) =>
        this.navigateToGroup(
          configuration,
          this.configuratorGroupStatusService.getFirstIncompleteGroup(
            configuration
          )?.id,
          true
        )
      );
  }

  /**
   * Navigates to the first conflict group and sets the conflict header as parent group.
   * This method assumes that the configuration has conflicts,
   * the caller has to verify this prior to calling this method.
   *
   * @param {GenericConfigurator.Owner} owner Configuration Owner
   */
  navigateToConflictSolver(owner: GenericConfigurator.Owner): void {
    this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(take(1))
      .subscribe((configuration) =>
        this.navigateToGroup(
          configuration,
          this.getFirstConflictGroup(configuration)?.id,
          true
        )
      );
  }

  /**
   * Returns the parent group of the subgroup that is displayed in the group menu.
   *
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @returns {Observable<Configurator.Group>} Group
   */
  getMenuParentGroup(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Group> {
    return this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(
        map((configuration) =>
          this.configuratorUtilsService.getGroupById(
            configuration.groups,
            configuration.interactionState.menuParentGroup
          )
        )
      );
  }

  /**
   * Set the parent group, specified by the group ID, which is displayed in the group menu.
   *
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @param {string} groupId - Group ID
   */
  setMenuParentGroup(owner: GenericConfigurator.Owner, groupId: string): void {
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
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @return {Observable<Configurator.Group>} Current group
   */
  getCurrentGroup(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Group> {
    return this.getCurrentGroupId(owner).pipe(
      switchMap((currentGroupId) => {
        if (!currentGroupId) {
          return null;
        }
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
   * @param {GenericConfigurator.Owner} owner - Owner
   * @param {string} groupId - Group ID
   */
  setGroupStatusVisited(
    owner: GenericConfigurator.Owner,
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
        parentGroupId: parentGroup ? parentGroup.id : null,
      })
    );
  }

  /**
   * Returns the group ID of the group that is coming after the current one in a sequential order.
   *
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @return {Observable<string>} ID of next group
   */
  getNextGroupId(owner: GenericConfigurator.Owner): Observable<string> {
    return this.getNeighboringGroupId(owner, 1);
  }

  /**
   * Returns the group ID of the group that is preceding the current one in a sequential order.
   *
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @return {Observable<string>} ID of previous group
   */
  getPreviousGroupId(owner: GenericConfigurator.Owner): Observable<string> {
    return this.getNeighboringGroupId(owner, -1);
  }

  /**
   * Verifies whether the group has been visited
   *
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @param {string} groupId - Group ID
   * @return {Observable<boolean>} Has been visited?
   */
  isGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.configuratorGroupStatusService.isGroupVisited(owner, groupId);
  }

  /**
   * Returns a parent group for the given group.
   *
   * @param {Configurator.Group[]} groups - List of groups where we search for the parent group
   * @param {Configurator.Group} group - Given group
   * @return {Configurator.Group} Parent group or null if group is a top-level group
   */
  getParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group
  ): Configurator.Group {
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
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @param {number} neighboringIndex - Index of neighboring group
   * @return {Observable<string>} group ID of the neighboring group
   */
  protected getNeighboringGroupId(
    owner: GenericConfigurator.Owner,
    neighboringIndex: number
  ): Observable<string> {
    return this.getCurrentGroupId(owner).pipe(
      switchMap((currentGroupId) => {
        if (!currentGroupId) {
          return of(null);
        }

        return this.configuratorCommonsService.getConfiguration(owner).pipe(
          map((configuration) => {
            let nextGroup = null;
            configuration.flatGroups.forEach((group, index) => {
              if (
                group.id === currentGroupId &&
                configuration.flatGroups[index + neighboringIndex] //Check if neighboring group exists
              ) {
                nextGroup =
                  configuration.flatGroups[index + neighboringIndex].id;
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
