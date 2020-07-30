import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserApproverListService } from './user-approver-list.service';

@Component({
  selector: 'cx-user-approver-list',
  templateUrl: './user-approver-list.component.html',
})
export class UserApproverListComponent {
  protected readonly APPROVERS_ROLE_ID = 'b2bapprovergroup';

  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.userApproverListService.getTable(code, this.APPROVERS_ROLE_ID)
    )
  );

  constructor(
    protected route: ActivatedRoute,
    protected userApproverListService: UserApproverListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userApproverListService.unassign(code, model));
  }
}
