import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { ConfiguratorUiActions } from '../store';
import * as UiActions from '../store/actions/configurator-ui.action';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration } from '../store/configuration-state';
import * as UiSelectors from '../store/selectors/configurator-ui.selector';
import { ConfiguratorCommonsService } from './configurator-commons.service';

/**
 * Service to for group handling
 */
@Injectable()
export class ConfiguratorGroupsService {
  constructor(
    private store: Store<StateWithConfiguration>,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

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

  getMenuParentGroup(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Group> {
    return this.configuratorCommonsService.getUiState(owner).pipe(
      map((uiState) => uiState.menuParentGroup),

      switchMap((parentGroupId) => {
        return this.configuratorCommonsService
          .getConfiguration(owner)
          .pipe(
            map((configuration) =>
              this.findCurrentGroup(configuration.groups, parentGroupId)
            )
          );
      })
    );
  }

  setMenuParentGroup(owner: GenericConfigurator.Owner, groupId: string) {
    this.store.dispatch(new UiActions.SetMenuParentGroup(owner.key, groupId));
  }

  getCurrentGroup(
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
              this.findCurrentGroup(configuration.groups, currentGroupId)
            )
          );
      })
    );
  }

  isGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Boolean> {
    return this.store.select(UiSelectors.isGroupVisited(owner.key, groupId));
  }

  isGroupComplete(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Boolean> {
    return this.store.select(UiSelectors.isGroupCompleted(owner.key, groupId));
  }

  areGroupsVisited(
    owner: GenericConfigurator.Owner,
    groupIds: string[]
  ): Observable<Boolean> {
    return this.store.select(UiSelectors.areGroupsVisited(owner.key, groupIds));
  }

  checkIsGroupComplete(group: Configurator.Group): Boolean {
    let isGroupComplete = true;

    group.attributes.forEach((attribute) => {
      if (!attribute.required || !isGroupComplete) {
        return;
      }
      switch (attribute.uiType) {
        case Configurator.UiType.RADIOBUTTON:
        case Configurator.UiType.DROPDOWN:
        case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
          if (!attribute.selectedSingleValue) {
            isGroupComplete = false;
          }
          break;
        }

        case Configurator.UiType.STRING: {
          if (!attribute.userInput) {
            isGroupComplete = false;
          }
          break;
        }

        case Configurator.UiType.CHECKBOX:
        case Configurator.UiType.MULTI_SELECTION_IMAGE: {
          let oneValueSelected = false;
          attribute.values.forEach((value) => {
            if (value.selected) {
              oneValueSelected = true;
            }
          });

          if (!oneValueSelected) {
            isGroupComplete = false;
          }

          break;
        }
      }
    });

    return isGroupComplete;
  }

  getParentGroupStatusCompleted(
    configuration: Configurator.Configuration,
    parentGroup: Configurator.Group,
    completedGroupIds: string[],
    uncompletedGroupdIds: string[]
  ) {
    if (parentGroup === null) {
      return;
    }

    let allSubGroupsComplete = true;
    parentGroup.subGroups.forEach((subGroup) => {
      if (!this.checkIsGroupComplete(subGroup)) {
        allSubGroupsComplete = false;
      }
    });

    if (allSubGroupsComplete) {
      completedGroupIds.push(parentGroup.id);
    } else {
      uncompletedGroupdIds.push(parentGroup.id);
    }

    this.getParentGroupStatusCompleted(
      configuration,
      this.findParentGroup(
        configuration.groups,
        this.findCurrentGroup(configuration.groups, parentGroup.id),
        null
      ),
      completedGroupIds,
      uncompletedGroupdIds
    );
  }

  getParentGroupStatusVisited(
    configuration: Configurator.Configuration,
    groupId: string,
    parentGroup: Configurator.Group,
    visitedGroupIds: string[]
  ) {
    if (parentGroup === null) {
      return;
    }

    const subGroups = [];
    parentGroup.subGroups.forEach((subGroup) => {
      //The current group is not set to visited yet, therefor we have to exclude it in the check
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

          this.getParentGroupStatusVisited(
            configuration,
            parentGroup.id,
            this.findParentGroup(
              configuration.groups,
              this.findCurrentGroup(configuration.groups, parentGroup.id),
              null
            ),
            visitedGroupIds
          );
        }
      });
  }

  setGroupStatus(configuration: Configurator.Configuration, groupId: string) {
    const group = this.getGroup(configuration.groups, groupId);
    const parentGroup = this.findParentGroup(
      configuration.groups,
      this.findCurrentGroup(configuration.groups, groupId),
      null
    );

    this.setGroupStatusCompleted(configuration, group, parentGroup);

    this.setGroupStatusVisited(configuration, group, parentGroup);
  }

  setGroupStatusCompleted(
    configuration: Configurator.Configuration,
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ) {
    const completedGroupIds = [];
    const uncompletedGroupdIds = [];

    if (this.checkIsGroupComplete(group)) {
      completedGroupIds.push(group.id);
    } else {
      uncompletedGroupdIds.push(group.id);
    }

    this.getParentGroupStatusCompleted(
      configuration,
      parentGroup,
      completedGroupIds,
      uncompletedGroupdIds
    );

    this.store.dispatch(
      new ConfiguratorUiActions.SetGroupCompleted(
        configuration.owner.key,
        completedGroupIds,
        uncompletedGroupdIds
      )
    );
  }

  setGroupStatusVisited(
    configuration: Configurator.Configuration,
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ) {
    const visitedGroupIds = [];
    visitedGroupIds.push(group.id);
    this.getParentGroupStatusVisited(
      configuration,
      group.id,
      parentGroup,
      visitedGroupIds
    );

    this.store.dispatch(
      new ConfiguratorUiActions.SetGroupsVisited(
        configuration.owner.key,
        visitedGroupIds
      )
    );
  }

  navigateToGroup(configuration: Configurator.Configuration, groupId: string) {
    //Set Group status for current group
    this.getCurrentGroup(configuration.owner)
      .pipe(take(1))
      .subscribe((currentGroup) => {
        this.setGroupStatus(configuration, currentGroup.id);
      });

    const parentGroup = this.findParentGroup(
      configuration.groups,
      this.findCurrentGroup(configuration.groups, groupId),
      null
    );

    this.store.dispatch(
      new ConfiguratorActions.ChangeGroup(
        configuration,
        groupId,
        parentGroup ? parentGroup.id : null
      )
    );
  }

  setCurrentGroup(owner: GenericConfigurator.Owner, groupId: string) {
    this.store.dispatch(new UiActions.SetCurrentGroup(owner.key, groupId));
  }

  getNextGroupId(owner: GenericConfigurator.Owner): Observable<string> {
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

  getPreviousGroupId(owner: GenericConfigurator.Owner): Observable<string> {
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

  ///////////////////////
  // Helper methods
  ///////////////////////
  findCurrentGroup(
    groups: Configurator.Group[],
    groupId: String
  ): Configurator.Group {
    const currentGroup = groups.find((group) => group.id === groupId);
    if (currentGroup) {
      return currentGroup;
    }

    return groups
      .map((group) => this.findCurrentGroup(group.subGroups, groupId))
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  getGroup(groups: Configurator.Group[], groupId: string): Configurator.Group {
    if (groups.find((value) => value.id === groupId)) {
      return groups.find((value) => value.id === groupId);
    }

    return groups
      .map((currentGroup) => this.getGroup(currentGroup.subGroups, groupId))
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  findParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ): Configurator.Group {
    if (groups.includes(group)) {
      return parentGroup;
    }

    return groups
      .map((currentGroup) =>
        this.findParentGroup(currentGroup.subGroups, group, currentGroup)
      )
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }
}
