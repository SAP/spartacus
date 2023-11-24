import { Component } from '@angular/core';
import { ApplePayService } from '../apple-pay.service';

@Component({
  selector: 'apple-pay-button',
  template: `
    <!--    <ng-container *ngIf="showButton">-->
    <div class="apple-pay-button apple-pay-button-black btn btn-block"></div>
    <!--    </ng-container>-->
  `,
  styleUrls: ['./apple-pay-button.component.scss'],
})
export class ApplePayButtonComponent {
  constructor(private applePayService: ApplePayService) {}

  get showButton(): boolean {
    return !this.applePayService.configured;
  }
}
