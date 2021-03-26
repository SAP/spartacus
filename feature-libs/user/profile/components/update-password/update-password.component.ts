import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdatePasswordService } from './update-password.service';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordComponent {
  constructor(protected service: UpdatePasswordService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  onSubmit(): void {
    this.service.update();
  }
}
