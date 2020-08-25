import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Configurator,
  ConfiguratorActions,
  GenericConfigurator,
  StateWithConfiguration,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupUtilsService } from './configurator-group-utils.service';

/**
 * Service for handling configuration groups
 */
@Injectable()
export class ConfiguratorGroupsService {
  constructor(
    private store: Store<StateWithConfiguration>,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupUtilsService: ConfiguratorGroupUtilsService,
    private configuratorGroupStatusService: ConfiguratorGroupStatusService
  ) {}

  /**
   * Returns the current group Id.
   * In case no group Id is being set before returns the first group of the configuration.
   * Return null when configuration contains no groups.
   *
   * @param owner configuration owner
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
   * Return the first conflict group of a configuration.
   *
   * @param configuration - Configuration
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
   * @param owner - Configuration owner
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
   * @param owner Configuration Owner
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
   * @param owner - Configuration owner
   */
  public getMenuParentGroup(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Group> {
    return this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(
        map((configuration) =>
          this.configuratorGroupUtilsService.getGroupById(
            configuration.groups,
            configuration.interactionState.menuParentGroup
          )
        )
      );
  }

  /**
   * Set the parent group, specified by the group ID, that is displayed in the group menu.
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   */
  public setMenuParentGroup(owner: GenericConfigurator.Owner, groupId: string) {
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
   * @param owner - Configuration owner
   */
  public getCurrentGroup(
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
              this.configuratorGroupUtilsService.getGroupById(
                configuration.groups,
                currentGroupId
              )
            )
          );
      })
    );
  }

  /**
   * Determines the group status by the group ID and the switcher that defines whether the group has been visited or not.
   *
   * @param owner - Owner
   * @param groupId - Group ID
   * @param setGroupVisited - Determines whether the group has to be set as visited or not
   */
  public setGroupStatus(
    owner: GenericConfigurator.Owner,
    groupId: string,
    setGroupVisited: Boolean
  ): void {
    this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(
        map((configuration) =>
          this.configuratorGroupStatusService.setGroupStatus(
            configuration,
            groupId,
            setGroupVisited
          )
        ),
        take(1)
      )
      .subscribe();
  }

  /**
   * Navigates to the group, specified by its group ID.
   *
   * @param configuration - Configuration
   * @param groupId - Group ID
   * @param setStatus - Group status will be set for previous group, default true
   */
  public navigateToGroup(
    configuration: Configurator.Configuration,
    groupId: string,
    setStatus = true
  ) {
    if (setStatus) {
      //Set Group status for current group
      this.getCurrentGroup(configuration.owner)
        .pipe(take(1))
        .subscribe((currentGroup) => {
          this.configuratorGroupStatusService.setGroupStatus(
            configuration,
            currentGroup.id,
            true
          );
        });
    }

    const parentGroup = this.configuratorGroupUtilsService.getParentGroup(
      configuration.groups,
      this.configuratorGroupUtilsService.getGroupById(
        configuration.groups,
        groupId
      ),
      null
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
   * @param owner - Configuration owner
   */
  public getNextGroupId(owner: GenericConfigurator.Owner): Observable<string> {
    return this.getNeighboringGroupId(owner, 1);
  }

  /**
   * Returns the group ID of the group that is preceding the current one in a sequential order.
   *
   * @param owner - Configuration owner
   */
  public getPreviousGroupId(
    owner: GenericConfigurator.Owner
  ): Observable<string> {
    return this.getNeighboringGroupId(owner, -1);
  }

  private getNeighboringGroupId(
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
   * Verifies whether the group has been visited
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   */
  public isGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Boolean> {
    return this.configuratorGroupStatusService.isGroupVisited(owner, groupId);
  }

  /**
   * Returns a group status for the given group ID.
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   */
  public getGroupStatus(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Configurator.GroupStatus> {
    return this.configuratorGroupStatusService.getGroupStatus(owner, groupId);
  }

  /**
   * Returns a parent group for the given group.
   *
   * @param groups - List of groups
   * @param group - Given group
   * @param parentGroup - Parent group
   */
  public getParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ): Configurator.Group {
    return this.configuratorGroupUtilsService.getParentGroup(
      groups,
      group,
      parentGroup
    );
  }

  /**
   * Verifies whether the given group has a parent.
   *
   * @param group - Given group
   */
  public hasSubGroups(group: Configurator.Group): boolean {
    return this.configuratorGroupUtilsService.hasSubGroups(group);
  }
}
