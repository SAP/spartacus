import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { B2BUserActions } from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import { B2BUser } from '../../model/org-unit.model';
import {
  getB2BUserState,
  getUserList,
} from '../store/selectors/b2b-user.selector';

@Injectable()
export class B2BUserService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadB2BUser(orgCustomerId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new B2BUserActions.LoadB2BUser({
          userId,
          orgCustomerId,
        })
      )
    );
  }

  loadB2BUsers(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(new B2BUserActions.LoadB2BUsers({ userId, params }))
    );
  }

  private getB2BUserState(
    orgCustomerId: string
  ): Observable<LoaderState<B2BUser>> {
    return this.store.select(getB2BUserState(orgCustomerId));
  }

  private getUserList(params): Observable<LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(getUserList(params));
  }

  get(orgCustomerId: string): Observable<B2BUser> {
    return this.getB2BUserState(orgCustomerId).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadB2BUser(orgCustomerId);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(params: B2BSearchConfig): Observable<EntitiesModel<B2BUser>> {
    return this.getUserList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadB2BUsers(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
