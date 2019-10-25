import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, shareReplay } from 'rxjs/operators';
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
      mergeMap(uiState => {
        if (uiState && uiState.currentGroup) {
          return of(uiState.currentGroup);
        } else {
          return this.configuratorCommonsService
            .getConfiguration(productCode)
            .pipe(
              mergeMap(configuration => {
                if (
                  configuration &&
                  configuration.groups &&
                  configuration.groups.length > 0
                ) {
                  this.setCurrentGroup(productCode, configuration.groups[0].id);
                  return of(configuration.groups[0].id);
                } else {
                  return of(null); //no configuration with a group found
                }
              })
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
      mergeMap(currentGroupId => {
        if (!currentGroupId) {
          return of(null);
        }

        return this.configuratorCommonsService
          .getConfiguration(productCode)
          .pipe(
            mergeMap(configuration => {
              let nextGroup = of(null);
              configuration.groups.forEach((group, index) => {
                if (
                  group.id === currentGroupId &&
                  configuration.groups[index + 1] //Check if next group exists
                ) {
                  nextGroup = of(configuration.groups[index + 1].id);
                }
              });
              return nextGroup;
            })
          );
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getPreviousGroup(productCode: string): Observable<string> {
    return this.getCurrentGroup(productCode).pipe(
      mergeMap(currentGroupId => {
        if (!currentGroupId) {
          return of(null);
        }

        return this.configuratorCommonsService
          .getConfiguration(productCode)
          .pipe(
            mergeMap(configuration => {
              let nextGroup = of(null);
              configuration.groups.forEach((group, index) => {
                if (
                  group.id === currentGroupId &&
                  configuration.groups[index - 1] //Check if previous group exists
                ) {
                  nextGroup = of(configuration.groups[index - 1].id);
                }
              });
              return nextGroup;
            })
          );
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
