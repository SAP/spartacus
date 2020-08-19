import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { FormUtils } from '@spartacus/storefront';
import { B2BUser, RoutingService } from '@spartacus/core';
import { CurrentUserService } from '../current-user.service';
import { B2BUserService } from '../../../core/services/b2b-user.service';
import { UserFormService } from '../form/user-form.service';

@Component({
  selector: 'cx-user-edit',
  templateUrl: './user-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUserService],
})
export class UserEditComponent {
  protected code$: Observable<string> = this.currentUserService.code$;

  protected user$: Observable<B2BUser> = this.code$.pipe(
    tap((code) => this.userService.load(code)),
    switchMap((code) => this.userService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  );

  protected form$: Observable<FormGroup> = this.user$.pipe(
    map((user) => this.userFormService.getForm(user))
  );

  // We have to keep all observable values consistent for a view,
  // that's why we are wrapping them into one observable
  viewModel$ = this.form$.pipe(
    withLatestFrom(this.user$, this.code$),
    map(([form, user, customerId]) => ({ form, customerId, user }))
  );

  constructor(
    protected userService: B2BUserService,
    protected userFormService: UserFormService,
    protected currentUserService: CurrentUserService,
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected routingService: RoutingService
  ) {}

  save(customerId: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.userService.update(customerId, form.value);

      this.routingService.go({
        cxRoute: 'userDetails',
        params: { customerId },
      });
    }
  }
}
