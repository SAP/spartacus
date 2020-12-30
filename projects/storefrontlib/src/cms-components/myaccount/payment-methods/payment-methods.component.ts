import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentMethodsService } from './payment-methods.service';

@Component({
  selector: 'cx-payment-methods',
  templateUrl: './payment-methods.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodsComponent {
  paymentMethods$ = this.service.get();
  loading$ = this.service.loading$;

  getCardContent = (paymentMethod) =>
    this.service.getCardContent(paymentMethod);
  setDefaultPaymentMethod = (paymentMethod) =>
    this.service.setDefault(paymentMethod);
  deletePaymentMethod = (paymentMethod) => this.service.delete(paymentMethod);
  getEdit = () => this.service.editCard;
  setEdit = (paymentMethod) => this.service.setEdit(paymentMethod);
  cancelCard = () => this.service.cancelEdit();

  constructor(protected service: PaymentMethodsService) {}
}
