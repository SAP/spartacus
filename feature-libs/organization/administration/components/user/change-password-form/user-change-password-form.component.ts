import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@spartacus/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { MessageService } from '../../shared/message/services/message.service';
import { UserItemService } from '../services/user-item.service';
import { UserChangePasswordFormService } from './user-change-password-form.service';

@Component({
  selector: 'cx-org-user-change-password-form',
  templateUrl: './user-change-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
})
export class UserChangePasswordFormComponent {
  form$: Observable<FormGroup> = this.itemService.current$.pipe(
    map((item) => this.formService.getForm(item))
  );

  constructor(
    protected itemService: UserItemService,
    protected formService: UserChangePasswordFormService,
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
      .subscribe((data) => {
        this.notify(data);
        this.itemService.launchDetails(data);
      });
  }

  protected notify(item: User) {
    this.messageService.add({
      message: {
        key: `orgUser.messages.updatePassword`,
        params: {
          item,
        },
      },
    });
  }
}
