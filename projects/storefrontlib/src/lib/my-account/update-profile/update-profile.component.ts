import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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
export class UpdateProfileComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  titles$: Observable<Title[]>;
  user$: Observable<User>;
  loading$: Observable<boolean>;

  // TODO:#1146 - familiarize with routingservice
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
            // TODO:#1146 - is the cms/products data reloaded after redirection to home?
            this.routingService.go({ route: ['/home'] });
            // TODO:#1146 - difference between `goByUrl` and `go`? why doesn't `goByUrl` work?
            // this.routingService.goByUrl('/homepage');
          }
        })
    );
  }

  onCancel(): void {
    this.routingService.go({ route: ['/home'] });
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
