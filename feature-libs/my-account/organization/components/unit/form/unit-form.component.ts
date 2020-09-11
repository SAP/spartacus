import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnit, B2BUnitNode } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UnitItemService } from '../services/unit-item.service';

@Component({
  templateUrl: './unit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitItemService,
    },
  ],
})
export class UnitFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList().pipe(
    map((units) => units.filter((unit) => unit.id !== this.form?.value.uid)),
    // filter(
    //   (units) =>
    //     !units.find((unit) => {
    //       console.log(unit.id, this.form?.value.parentOrgUnit?.uid);
    //       return unit.id === this.form?.value.parentOrgUnit?.uid;
    //     })
    // ),
    tap(console.log)
  );

  // units$: Observable<B2BUnitNode[]> = this.itemService.current$.pipe(
  //   switchMap((item) =>
  //     this.unitService.getActiveUnitList().pipe(
  //       tap((units) => {
  //         console.log(units);
  //         console.log(item);
  //       }),
  //       // filter((units) => !item || !units.find((unit) => unit.id === item.uid)),
  //       map((units) =>
  //         units.filter((unit) => unit.id === item?.parentOrgUnit?.uid)
  //       )
  //     )
  //   )
  // );

  approvalProcess$ = this.unitService
    .getApprovalProcesses()
    .pipe(filter((items) => items.length > 0));

  constructor(
    protected itemService: OrganizationItemService<B2BUnit>,
    protected unitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}

// import {
//   ChangeDetectionStrategy,
//   Component,
//   Input,
//   OnDestroy,
//   OnInit,
// } from '@angular/core';
// import { FormGroup } from '@angular/forms';
// import { B2BApprovalProcess, B2BUnitNode } from '@spartacus/core';
// import { OrgUnitService } from '@spartacus/my-account/organization/core';
// import { Observable, Subscription } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';
// import { CurrentUnitService } from '../current-unit.service';

// @Component({
//   selector: 'cx-unit-form',
//   templateUrl: './unit-form.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class UnitFormComponent extends AbstractFormComponent
//   implements OnInit, OnDestroy {
//   @Input() form: FormGroup;

//   businessUnits$: Observable<B2BUnitNode[]>;
//   approvalProcesses$: Observable<B2BApprovalProcess[]>;

//   subscription = new Subscription();
//   parentUnit$ = this.currentUnitService.b2bUnit$.pipe(filter(Boolean));

//   constructor(
//     protected orgUnitService: OrgUnitService,
//     protected currentUnitService: CurrentUnitService
//   ) {
//     super();
//   }

//   ngOnInit() {
//     this.approvalProcesses$ = this.orgUnitService.getApprovalProcesses();
//     this.orgUnitService.loadList();

//     // filter out currently edited entity from list of possible parent units to assign
//     this.businessUnits$ = this.orgUnitService
//       .getActiveUnitList()
//       .pipe(
//         map((units) => units.filter((unit) => unit.id !== this.form?.value.uid))
//       );

//     this.subscription.add(
//       this.parentUnit$.subscribe(() => {
//         this.form.get('parentOrgUnit').disable();
//       })
//     );
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }
// }
