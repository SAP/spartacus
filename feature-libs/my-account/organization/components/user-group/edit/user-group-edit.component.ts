import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/my-account/organization/core';
import { CurrentUserGroupService } from '../current-user-group.service';
import { UserGroupFormService } from '../form/user-group-form.service';

@Component({
  selector: 'cx-user-group-edit',
  templateUrl: './user-group-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUserGroupService],
})
export class UserGroupEditComponent {
  /**
   * The code of the current user group
   */
  code$ = this.currentUserGroupService.key$;

  protected userGroup$: Observable<UserGroup> = this.code$.pipe(
    tap((code) => this.userGroupService.load(code)),
    switchMap((code) => this.userGroupService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  );

  protected form$: Observable<FormGroup> = this.userGroup$.pipe(
    map((userGroup) => this.userGroupFormService.getForm(userGroup))
  );

  // We have to keep all observable values consistent for a view,
  // that's why we are wrapping them into one observable
  viewModel$ = this.form$.pipe(
    withLatestFrom(this.userGroup$, this.code$),
    map(([form, userGroup, uid]) => ({ form, uid, userGroup }))
  );

  constructor(
    protected userGroupService: UserGroupService,
    protected currentUserGroupService: CurrentUserGroupService,
    protected userGroupFormService: UserGroupFormService,
    protected routingService: RoutingService
  ) {}

  save(userGroupCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.userGroupService.update(userGroupCode, form.value);

      this.routingService.go({
        cxRoute: 'userGroupDetails',
        params: form.value,
      });
    }
  }
}
