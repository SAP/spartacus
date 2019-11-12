import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as UiActions from '../store/actions/configurator-ui.action';
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

  getCurrentGroup(productCode: string): Observable<string> {
    return this.configuratorCommonsService.getUiState(productCode).pipe(
      switchMap(uiState => {
        if (uiState && uiState.currentGroup) {
          return of(uiState.currentGroup);
        } else {
          return this.configuratorCommonsService
            .getConfiguration(productCode)
            .pipe(
              map(configuration =>
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

  setCurrentGroup(productCode: string, groupId: string) {
    this.store.dispatch(new UiActions.SetCurrentGroup(productCode, groupId));
  }

  getNextGroup(productCode: string): Observable<string> {
    return this.getCurrentGroup(productCode).pipe(
      switchMap(currentGroupId => {
        if (!currentGroupId) {
          return of(null);
        }

        return this.configuratorCommonsService
          .getConfiguration(productCode)
          .pipe(
            map(configuration => {
              let nextGroup = null;
              configuration.groups.forEach((group, index) => {
                if (
                  group.id === currentGroupId &&
                  configuration.groups[index + 1] //Check if next group exists
                ) {
                  nextGroup = configuration.groups[index + 1].id;
                }
              });
              return nextGroup;
            }),
            take(1)
          );
      })
    );
  }

  getPreviousGroup(productCode: string): Observable<string> {
    return this.getCurrentGroup(productCode).pipe(
      switchMap(currentGroupId => {
        if (!currentGroupId) {
          return of(null);
        }

        return this.configuratorCommonsService
          .getConfiguration(productCode)
          .pipe(
            map(configuration => {
              let nextGroup = null;
              configuration.groups.forEach((group, index) => {
                if (
                  group.id === currentGroupId &&
                  configuration.groups[index - 1] //Check if previous group exists
                ) {
                  nextGroup = configuration.groups[index - 1].id;
                }
              });
              return nextGroup;
            }),
            take(1)
          );
      })
    );
  }
}
