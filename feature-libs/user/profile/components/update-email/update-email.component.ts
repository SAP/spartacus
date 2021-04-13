import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdateEmailComponentService } from './update-email-component.service';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class UpdateEmailComponent {
  constructor(protected service: UpdateEmailComponentService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  onSubmit(): void {
    this.service.save();
  }
}
