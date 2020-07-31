import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { B2BUser, B2BUserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '@spartacus/storefront';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'cx-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUserService],
})
export class UserDetailsComponent {
  user$: Observable<B2BUser> = this.currentUserService.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.usersService.load(code)),
    switchMap((code) => this.usersService.get(code)),
    filter((user) => Boolean(user))
  );

  constructor(
    protected currentUserService: CurrentUserService,
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
