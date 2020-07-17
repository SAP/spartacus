import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { B2BUnit, OrgUnitService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-unit-details',
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsComponent implements OnInit {
  orgUnit$: Observable<B2BUnit>;
  orgUnitCode$: Observable<string> = this.route.params.pipe(
    map((params) => params['code']),
    filter((code) => Boolean(code))
  );

  constructor(
    protected orgUnitsService: OrgUnitService,
    protected modalService: ModalService,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orgUnit$ = this.orgUnitCode$.pipe(
      tap((code) => this.orgUnitsService.loadOrgUnit(code)),
      switchMap((code) => this.orgUnitsService.get(code)),
      filter(Boolean)
    );
  }

  update(orgUnit: B2BUnit) {
    this.orgUnitCode$
      .pipe(take(1))
      .subscribe((orgUnitCode) =>
        this.orgUnitsService.update(orgUnitCode, orgUnit)
      );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
