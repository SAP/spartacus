import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CartValidationCartItemWarningComponent } from './cart-validation-cart-item-warning.component';
import { IconModule } from '../../../misc';

@NgModule({
  imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule],
  exports: [CartValidationCartItemWarningComponent],
  declarations: [CartValidationCartItemWarningComponent],
})
export class CartValidationCartItemWarningModule {}
