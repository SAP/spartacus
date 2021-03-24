import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdateEmailService } from './update-email.service';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmailComponent implements OnDestroy {
  constructor(protected service: UpdateEmailService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  onSubmit(): void {
    this.service.save();
  }

  ngOnDestroy() {
    this.service.resetForm();
  }
}
