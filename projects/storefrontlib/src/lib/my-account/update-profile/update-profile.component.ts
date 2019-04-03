import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService, Title, User, UserService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  titles$: Observable<Title[]>;
  user$: Observable<User>;
  loading$: Observable<boolean>;

  constructor(
    private routingService: RoutingService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // reset the previous form processing state
    this.userService.resetUpdatePersonalDetailsProcessingState();

    this.user$ = this.userService.get();
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );
    this.loading$ = this.userService.getUpdatePersonalDetailsResultLoading();

    this.subscription.add(
      this.userService
        .getUpdatePersonalDetailsResultSuccess()
        .subscribe(success => {
          if (success) {
            this.routingService.go({ route: ['home'] });
          }
        })
    );
  }

  onCancel(): void {
    this.routingService.go({ route: ['home'] });
  }

  onSubmit({ uid, form }: { uid: string; form: FormGroup }): void {
    if (!form.valid) {
      return;
    }

    this.userService.updatePersonalDetails(uid, form.value);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
