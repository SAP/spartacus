import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B2BUser, B2BUserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '@spartacus/storefront';

@Component({
  selector: 'cx-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  protected code$: Observable<string> = this.route.params.pipe(
    map((params) => params['code']),
    filter((code) => Boolean(code))
  );

  user$: Observable<B2BUser> = this.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.usersService.load(code)),
    switchMap((code) => this.usersService.get(code)),
    filter((user) => Boolean(user))
  );

  constructor(
    protected route: ActivatedRoute,
    protected usersService: B2BUserService,
    protected modalService: ModalService
  ) {}

  update(user: B2BUser) {
    this.usersService.update(user.customerId, user);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
