import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromAction from '../actions/suggested-addresses.action';
import { OccUserService } from '../../../occ/user/user.service';

@Injectable()
export class SuggestedAddressesEffects {
  @Effect()
  loadSuggestedAddresses$: Observable<any> = this.actions$
    .ofType(fromAction.LOAD_SUGGESTED_ADDRESSES)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload =>
        this.occUserService
          .loadSuggestedAddresses(payload.userId, payload.address)
          .pipe(
            map(data => {
              return new fromAction.LoadSuggestedAddressesSuccess(
                data.suggestedAddresses
              );
            }),
            catchError(error =>
              of(new fromAction.LoadSuggestedAddressesFail(error))
            )
          )
      )
    );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
