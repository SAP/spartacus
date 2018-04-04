import { Component, ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'y-order-confirmation-page',
  templateUrl: './order-confirmation-page.component.html',
  styleUrls: ['./order-confirmation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmationPageComponent {}
