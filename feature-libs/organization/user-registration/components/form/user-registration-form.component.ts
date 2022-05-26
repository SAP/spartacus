import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country, Region } from '@spartacus/core';
import { Title } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegistrationFormService } from './user-registration-form.service';

@Component({
  selector: 'cx-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRegistrationFormComponent implements OnInit {
  titles$: Observable<Title[]>;

  countries$: Observable<Country[]>;

  regions$: Observable<Region[]>;

  isLoading$ = new BehaviorSubject(false);

  registerForm: FormGroup;

  constructor(
    protected userRegistrationFormService: UserRegistrationFormService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.userRegistrationFormService.form;
    this.titles$ = this.userRegistrationFormService.getTitles();
    this.countries$ = this.userRegistrationFormService.getCountries();
    this.regions$ = this.userRegistrationFormService.getRegions();
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.isLoading$.next(true);

      this.userRegistrationFormService
        .registerUser(this.registerForm)
        .subscribe({
          complete: () => this.isLoading$.next(false),
          error: () => this.isLoading$.next(false),
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
