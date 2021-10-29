import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CartItemValidationWarningComponent } from './cart-item-validation-warning.component';
import { IconModule } from '../../../misc/icon/index';

@NgModule({
  imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule],
  exports: [CartItemValidationWarningComponent],
  declarations: [CartItemValidationWarningComponent],
})
export class CartItemValidationWarningModule {}
