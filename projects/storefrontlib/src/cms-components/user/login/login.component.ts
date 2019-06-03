import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  userDetails: User = {};
  private subscription = new Subscription();

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.get().subscribe(userDet => {
        this.userDetails = userDet;
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
