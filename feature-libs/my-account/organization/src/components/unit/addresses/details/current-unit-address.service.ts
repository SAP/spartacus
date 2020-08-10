import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B2BAddress } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  pluck,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { CurrentUnitService } from '../../current-unit.service';
import { OrgUnitService } from '../../../../core/services/org-unit.service';

@Injectable()
export class CurrentUnitAddressService {
  constructor(
    protected service: OrgUnitService,
    protected route: ActivatedRoute,
    protected currentUnitService: CurrentUnitService
  ) {}

  readonly id$ = this.route.params.pipe(pluck('id'), distinctUntilChanged());

  readonly unitAddress$: Observable<B2BAddress> = this.id$.pipe(
    withLatestFrom(this.currentUnitService.code$),
    switchMap(([id, code]) =>
      id ? this.service.getAddress(code, id) : of(null)
    )
  );
}
