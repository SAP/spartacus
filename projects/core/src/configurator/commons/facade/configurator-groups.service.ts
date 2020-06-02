import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import * as UiActions from '../store/actions/configurator-ui.action';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration } from '../store/configuration-state';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupUtilsService } from './configurator-group-utils.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';

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
   * Subscribe to update the configuration by the given owner.
   *
   * @param owner - Configuration owner
   */
  public subscribeToUpdateConfiguration(
    owner: GenericConfigurator.Owner
  ): void {
    // TODO: Cancel previous subscriptions of the configuration state
    // Set Group Status on each update of the configuration state
    // This will be called every time something in the configuration is changed, prices,
    // attributes groups etc.
    this.configuratorCommonsService
      .getConfiguration(owner)
      .subscribe((configuration) =>
        this.getCurrentGroup(owner)
          .pipe(take(1))
          .subscribe((currentGroup) =>
            this.configuratorGroupStatusService.setGroupStatus(
              configuration,
              currentGroup.id,
              false
            )
          )
      );
  }

  getCurrentGroupId(owner: GenericConfigurator.Owner): Observable<string> {
    return this.configuratorCommonsService.getUiState(owner).pipe(
      switchMap((uiState) => {
        if (uiState && uiState.currentGroup) {
          return of(uiState.currentGroup);
        } else {
          return this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(
              map((configuration) =>
                configuration &&
                configuration.groups &&
                configuration.groups.length > 0
                  ? configuration.groups[0].id
                  : null
              )
            );
        }
      })
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
    return this.configuratorCommonsService.getUiState(owner).pipe(
      map((uiState) => uiState.menuParentGroup),

      switchMap((parentGroupId) => {
        return this.configuratorCommonsService
          .getConfiguration(owner)
          .pipe(
            map((configuration) =>
              this.configuratorGroupUtilsService.getGroupById(
                configuration.groups,
                parentGroupId
              )
            )
          );
      })
    );
  }

  /**
   * Determines the parent group of the subgroup, specified by the group ID, that is displayed in the group menu.
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   */
  public setMenuParentGroup(owner: GenericConfigurator.Owner, groupId: string) {
    this.store.dispatch(new UiActions.SetMenuParentGroup(owner.key, groupId));
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
          return of(null);
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
   * Navigates to the group, specified by its group ID.
   *
   * @param configuration - Configuration
   * @param groupId - Group ID
   */
  public navigateToGroup(
    configuration: Configurator.Configuration,
    groupId: string
  ) {
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
   * Determines the current group.
   * If nothing has been visited so far, the first group is chosen.
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   */
  public setCurrentGroup(owner: GenericConfigurator.Owner, groupId: string) {
    this.store.dispatch(new UiActions.SetCurrentGroup(owner.key, groupId));
  }

  /**
   * Returns the group ID of the group that is coming after the current one in a sequential order.
   *
   * @param owner - Configuration owner
   */
  public getNextGroupId(owner: GenericConfigurator.Owner): Observable<string> {
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
                configuration.flatGroups[index + 1] //Check if next group exists
              ) {
                nextGroup = configuration.flatGroups[index + 1].id;
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
   * Returns the group ID of the group that is preceding the current one in a sequential order.
   *
   * @param owner - Configuration owner
   */
  public getPreviousGroupId(
    owner: GenericConfigurator.Owner
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
                configuration.flatGroups[index - 1] //Check if previous group exists
              ) {
                nextGroup = configuration.flatGroups[index - 1].id;
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
