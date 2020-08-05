import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfigAddToCartButtonComponent } from './config-add-to-cart-button.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfigAddToCartButtonComponent],
  exports: [ConfigAddToCartButtonComponent],
  entryComponents: [ConfigAddToCartButtonComponent],
})
export class ConfigAddToCartButtonModule {}
