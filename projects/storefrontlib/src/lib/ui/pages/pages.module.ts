import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageLayoutModule } from '../../../cms-structure/page/index';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';

@NgModule({
  imports: [CommonModule, OrderConfirmationPageModule, PageLayoutModule],
})
export class PagesModule {}
