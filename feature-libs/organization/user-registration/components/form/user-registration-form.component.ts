import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country, Region } from '@spartacus/core';
import { Title } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
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

  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  isLoading$ = new BehaviorSubject(false);

  registerForm: FormGroup;

  messageContent: string;

  constructor(
    protected userRegistrationFormService: UserRegistrationFormService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.userRegistrationFormService.initializeForm();

    this.titles$ = this.userRegistrationFormService.getTitles();

    this.countries$ = this.userRegistrationFormService.getCountries();

    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) =>
        this.userRegistrationFormService.getRegions(country)
      )
    );
  }

  countrySelected(country: Country): void {
    this.registerForm
      .get('country')
      ?.get('isocode')
      ?.setValue(country?.isocode);
    this.selectedCountry$.next(country?.isocode);
  }

  regionSelected(region: Region): void {
    this.registerForm.get('region')?.get('isocode')?.setValue(region?.isocode);
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.register();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  register(): void {
    this.isLoading$.next(true);

    this.userRegistrationFormService
      .buildMessageContent(this.registerForm)
      .pipe(take(1))
      .subscribe((content) => (this.messageContent = content));

    this.userRegistrationFormService
      .registerUser({
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        email: this.registerForm.get('email')?.value,
        message: this.messageContent,
      })
      .subscribe({
        next: () => this.userRegistrationFormService.displayGlobalMessage(),
        complete: () => {
          this.registerForm.reset();
          this.isLoading$.next(false);
        },
        error: () => this.isLoading$.next(false),
      });
  }
}
