import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@spartacus/user/account/root';
import { Title } from '@spartacus/user/profile/root';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UpdateProfileComponentService } from './update-profile-component.service';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  constructor(protected service: UpdateProfileComponentService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;
  user$: Observable<User | undefined> = this.service.user$;

  private subscription: Subscription;

  ngOnInit() {
    this.form.disable();
    this.subscription = this.user$
      .pipe(filter((user) => Boolean(user)))
      .subscribe((user) => {
        this.form.patchValue(user as User);
        this.form.enable();
      });
  }

  onSubmit(): void {
    this.service.updateProfile();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
