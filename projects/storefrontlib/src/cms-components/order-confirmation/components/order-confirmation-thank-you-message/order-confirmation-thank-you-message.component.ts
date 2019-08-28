import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CheckoutService,
  Order,
  UserService,
  RoutingService,
  AuthService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomFormValidators } from '../../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationThankYouMessageComponent
  implements OnInit, OnDestroy {
  order$: Observable<Order>;
  isGuestCustomer = false;
  orderGuid: string;

  subscription: Subscription;

  guestRegisterForm: FormGroup = this.fb.group(
    {
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      passwordconf: ['', Validators.required],
    },
    { validator: this.matchPassword }
  );

  constructor(
    protected checkoutService: CheckoutService,
    protected userService: UserService,
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails().pipe(
      tap(order => {
        this.isGuestCustomer = order.guestCustomer;
        this.orderGuid = order.guid;
      })
    );
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submit() {
    if (this.isGuestCustomer) {
      this.userService.registerGuest(
        this.orderGuid,
        this.guestRegisterForm.value.password
      );
      if (!this.subscription) {
        this.subscription = this.authService.getUserToken().subscribe(token => {
          if (token.access_token) {
            this.routingService.go({ cxRoute: 'home' });
          }
        });
      }
    }
  }

  private matchPassword(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
