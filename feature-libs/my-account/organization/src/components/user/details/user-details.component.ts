import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { B2BUser, B2BUserService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'cx-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  user$: Observable<B2BUser> = this.currentUserService.code$.pipe(
    tap((code) => this.usersService.load(code)),
    switchMap(() => this.currentUserService.model$),
    // we have side effects here, we want the to run only once
    shareReplay({ bufferSize: 1, refCount: true })
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
