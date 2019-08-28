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
import { CheckoutService, Order } from '@spartacus/core';
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails().pipe(
      tap(order => {
        this.isGuestCustomer = order.guestCustomer;
      })
    );
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }

  submit() {}

  private matchPassword(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
