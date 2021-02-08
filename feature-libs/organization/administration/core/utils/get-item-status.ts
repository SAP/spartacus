import { StateUtils } from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, pairwise } from 'rxjs/operators';
import {
  LoadStatus,
  OrganizationItemStatus,
} from '../model/organization-item-status';

export function getItemStatus<T>(
  itemState: Observable<StateUtils.LoaderState<T>>
): Observable<OrganizationItemStatus<T>> {
  return itemState.pipe(
    observeOn(queueScheduler),
    pairwise(),
    filter(([previousState]) => previousState.loading),
    map(([_previousState, currentState]) => ({
      status: currentState.success
        ? LoadStatus.SUCCESS
        : currentState.error
        ? LoadStatus.ERROR
        : null,
      item: currentState.value,
    }))
  );
}
