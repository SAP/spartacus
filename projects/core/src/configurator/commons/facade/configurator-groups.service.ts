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

  navigateToGroup(configuration: Configurator.Configuration, groupId: string) {
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
