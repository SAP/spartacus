import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { UserGroupService } from '../../core/services/user-group.service';
import { UserGroup } from '../../core/model/user-group.model';

/**
 * Provides appropriate model based on the routing params.
 *
 * It's NOT meant to be provided in the root injector, BUT on the level
 * of the component activated by the route with routing params.
 */
@Injectable()
export class CurrentUserGroupService {
  constructor(
    protected service: UserGroupService,
    protected route: ActivatedRoute
  ) {}

  readonly code$ = this.route.params.pipe(
    pluck('code'),
    distinctUntilChanged()
  );

  /**
   * Emits the current model or null, if there is no model available
   */
  readonly userGroup$: Observable<UserGroup> = this.code$.pipe(
    switchMap((code: string) => (code ? this.service.get(code) : of(null)))
  );
}
