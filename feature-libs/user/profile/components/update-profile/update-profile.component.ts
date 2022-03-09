import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateProfileComponentService } from './update-profile-component.service';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class UpdateProfileComponent {
  constructor(protected service: UpdateProfileComponentService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$.pipe(
    map((titles: Title[]) => {
      return [{ code: '', name: '' } as Title].concat(titles);
    })
  );

  onSubmit(): void {
    this.service.updateProfile();
  }
}
