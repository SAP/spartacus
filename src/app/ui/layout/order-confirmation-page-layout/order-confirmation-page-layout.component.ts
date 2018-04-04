import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CartDetailsComponent } from '../../../cart/components/cart-details/cart-details.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'y-order-confirmation-page-layout',
  templateUrl: './order-confirmation-page-layout.component.html',
  styleUrls: ['./order-confirmation-page-layout.component.scss']
})
export class OrderConfirmationPageLayoutComponent {}
