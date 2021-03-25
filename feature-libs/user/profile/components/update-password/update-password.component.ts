import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdatePasswordService } from './update-password.service';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordComponent implements OnDestroy {
  constructor(protected service: UpdatePasswordService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  onSubmit(): void {
    this.service.update();
  }

  ngOnDestroy() {
    // Form has to be reset in order to have a clean form
    // next time component is called
    this.service.resetForm();
  }
}
