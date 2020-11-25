import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateEmailService } from './update-email.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmailComponent implements OnDestroy {
  constructor(protected service: UpdateEmailService) {}
  form: FormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  onSubmit = () => this.service.save();

  ngOnDestroy() {
    // Form has to be reset in order to have a clean form
    // next time component is called
    this.service.reset();
  }
}
