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
} from '@spartacus/core';
import { Observable } from 'rxjs';
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
  }

  submit() {
    this.userService.registerGuest(
      this.orderGuid,
      this.guestRegisterForm.value.password
    );
    this.routingService.go({ cxRoute: 'home' });
  }

  private matchPassword(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
