import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { UserItemService } from '../services/user-item.service';
import { ChangePasswordFormService } from './change-password-form.service';

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
    protected formService: ChangePasswordFormService
  ) {}

  save(form: FormGroup): void {
    this.itemService.save(form, (form.value as User).customerId);
  }
}
