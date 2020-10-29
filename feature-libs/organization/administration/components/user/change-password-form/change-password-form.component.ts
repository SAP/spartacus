import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@spartacus/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { UserItemService } from '../services/user-item.service';
import { ChangePasswordFormService } from './change-password-form.service';
import { MessageService } from '../../shared/organization-message/services/message.service';

@Component({
  templateUrl: './change-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent {
  form$ = this.itemService.current$.pipe(
    map((item) => this.formService.getForm(item))
  );

  constructor(
    protected itemService: UserItemService,
    protected formService: ChangePasswordFormService,
    protected messageService: MessageService
  ) {}

  save(form: FormGroup): void {
    this.itemService.current$
      .pipe(
        first(),
        switchMap((item) =>
          this.itemService.save(form, (form.value as User).customerId).pipe(
            take(1),
            filter((data) => data.status === LoadStatus.SUCCESS),
            map((data) => ({
              ...item,
              ...data.item,
            }))
          )
        )
      )
      .subscribe((data) => this.notify(data));
  }

  protected notify(item: User) {
    if (item) {
      this.messageService.add({
        message: {
          key: `user.messages.updatePassword`,
          params: {
            item,
          },
        },
      });
    }
  }
}
