import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { B2BUser, B2BUserService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { UserFormService } from '../form/user-form.service';

@Component({
  selector: 'cx-user-edit',
  templateUrl: './user-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  protected code$: Observable<string> = this.activatedRoute.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

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
    map(([form, user, uid]) => ({ form, uid, user }))
  );

  constructor(
    protected userService: B2BUserService,
    protected userFormService: UserFormService,
    protected activatedRoute: ActivatedRoute,
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected routingService: RoutingService
  ) {}

  save(userCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
    } else {
      form.disable();
      this.userService.update(userCode, form.value);

      this.routingService.go({
        cxRoute: 'userDetails',
        params: form.value,
      });
    }
  }
}
