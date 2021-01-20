import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentDetails } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Card } from '../../../shared';
import { PaymentMethodsService } from './payment-methods.service';

@Component({
  selector: 'cx-payment-methods',
  templateUrl: './payment-methods.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodsComponent {
  paymentMethods$ = this.service.get();
  loading$ = this.service.loading$;

  constructor(protected service: PaymentMethodsService) {}

  getCardContent(paymentMethod: PaymentDetails): Observable<Card> {
    return this.service.getCardContent(paymentMethod);
  }

  setDefaultPaymentMethod(paymentMethod: PaymentDetails): void {
    this.service.setDefault(paymentMethod);
  }

  deletePaymentMethod(paymentMethod: PaymentDetails): void {
    this.service.delete(paymentMethod);
  }

  getEdit(): string {
    return this.service.editCard;
  }

  setEdit(paymentMethod: PaymentDetails): void {
    this.service.setEdit(paymentMethod);
  }

  cancelCard(): void {
    this.service.cancelEdit();
  }
}
