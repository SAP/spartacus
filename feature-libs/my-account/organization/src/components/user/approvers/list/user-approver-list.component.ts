import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CurrentUserService } from '../../services/current-user.service';
import { UserApproverListService } from './user-approver-list.service';

@Component({
  selector: 'cx-user-approver-list',
  templateUrl: './user-approver-list.component.html',
})
export class UserApproverListComponent {
  protected readonly APPROVERS_ROLE_ID = 'b2bapprovergroup';

  code$: Observable<string> = this.currentUserService.key$;
  name$: Observable<string> = this.currentUserService.name$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) =>
      this.userApproverListService.getTable(code, this.APPROVERS_ROLE_ID)
    )
  );

  constructor(
    protected currentUserService: CurrentUserService,
    protected userApproverListService: UserApproverListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userApproverListService.unassign(code, model));
  }
}
