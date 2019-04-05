import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  token: string;
  subscription = new Subscription();
  submited = false;
  userId: string;
  form: FormGroup;

  constructor(
    private routingService: RoutingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .get()
      .pipe(take(1))
      .subscribe(user => {
        this.userId = user.uid;
      });
  }

  ngOnDestroy() {}

  onCancel(): void {
    this.routingService.go({ route: ['home'] });
  }

  onSubmit({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): void {
    this.userService.updatePassword(this.userId, oldPassword, newPassword);
    this.routingService.go({ route: ['home'] });
  }
}
