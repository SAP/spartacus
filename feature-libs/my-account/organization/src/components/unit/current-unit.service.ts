import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B2BUnit } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { OrgUnitService } from '../../core/services/org-unit.service';

@Injectable()
export class CurrentUnitService {
  constructor(
    protected service: OrgUnitService,
    protected route: ActivatedRoute
  ) {}

  readonly code$ = this.route.params.pipe(
    pluck('code'),
    distinctUntilChanged()
  );

  readonly parentUnit$ = this.route.queryParams.pipe(
    pluck('parentUnit'),
    distinctUntilChanged()
  );

  readonly unit$: Observable<B2BUnit> = this.code$.pipe(
    switchMap((code: string) => (code ? this.service.get(code) : of(null)))
  );
}
