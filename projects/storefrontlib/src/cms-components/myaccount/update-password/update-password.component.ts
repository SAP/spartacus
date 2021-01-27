import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdatePasswordService } from './update-password.service';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordComponent implements OnDestroy {
  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  onSubmit = () => this.service.save();

  constructor(private service: UpdatePasswordService) {}

  ngOnDestroy(): void {
    this.service.reset();
  }
}
