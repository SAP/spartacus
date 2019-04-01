import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RoutingService, Title, User, UserService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  // TODO:#1146 - do we need to set this manually? Search slack for Kris' message
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO:#1146 - display a success/error message
export class UpdateProfileComponent implements OnInit, OnDestroy {
  // TODO:#1146 - this should be an observable. probably won't work in a case when a user has two tabs open:
  // in the first one it has update-user-details forms open and in the second tab it has update-email form open.
  // it first updates the email and then closes the 2nd tab, and tries to update the user details.
  // the update-user-details component would have an old email and it won't work
  // private currentUser: User;
  private subscription = new Subscription();

  titles$: Observable<Title[]>;
  user$: Observable<User>;

  error$: Observable<boolean>;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;

  form = this.fb.group({
    titleCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    uid: [''],
  });

  // TODO:#1146 - familiarize with routingservice
  constructor(
    private fb: FormBuilder,
    private routingService: RoutingService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.resetUpdatePersonalDetailsProcessingState();

    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );
    this.user$ = this.userService
      .get()
      .pipe(tap(user => this.form.patchValue(user)));
    // TODO:#1146 - patchValue() vs setValue()?

    this.error$ = this.userService.getUpdatePersonalDetailsResultError();
    this.loading$ = this.userService.getUpdatePersonalDetailsResultLoading();

    // TODO:#1146 - just to display flags on the screen, will be deleted
    this.success$ = this.userService.getUpdatePersonalDetailsResultSuccess();

    this.subscription.add(
      this.userService
        .getUpdatePersonalDetailsResultSuccess()
        .subscribe(success => {
          if (success) {
            // TODO:#1146 - why do we reload data after redirection to home?
            this.routingService.go({ route: ['/home'] });
          }
        })
    );
  }

  onSubmit(): void {
    console.log(`form valid`, this.form.valid);
    console.log('submitting', this.form.value);

    if (!this.form.valid) {
      return;
    }

    this.userService.updatePersonalDetails(
      this.form.get('uid').value,
      this.form.value
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
