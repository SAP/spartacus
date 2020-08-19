import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B2BUser } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { B2BUserService } from '../../core/services/b2b-user.service';

/**
 * Provides appropriate model based on the routing params.
 *
 * It's NOT meant to be provided in the root injector, BUT on the level
 * of the component activated by the route with routing params.
 */
@Injectable()
export class CurrentUserService {
  constructor(
    protected service: B2BUserService,
    protected route: ActivatedRoute
  ) {}

  readonly code$ = this.route.params.pipe(
    pluck('code'),
    distinctUntilChanged()
  );

  /**
   * Emits the current model or null, if there is no model available
   */
  readonly user$: Observable<B2BUser> = this.code$.pipe(
    switchMap((code: string) => (code ? this.service.get(code) : of(null)))
  );

  readonly name$: Observable<string> = this.user$.pipe(
    map((user: B2BUser) => user.name)
  );
}
