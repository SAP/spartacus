import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@spartacus/user/account/root';
import { Title } from '@spartacus/user/profile/root';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UpdateProfileService } from './update-profile.service';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  constructor(protected service: UpdateProfileService) {}

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
    this.service.save();
  }

  ngOnDestroy() {
    // Form has to be reset in order to have a clean form
    // next time component is called
    this.service.reset();

    this.subscription?.unsubscribe();
  }
}
