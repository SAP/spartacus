import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CartQuickOrderFormComponent } from './cart-quick-order-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartQuickOrderFormComponent: {
          component: CartQuickOrderFormComponent,
        },
      },
    }),
  ],
  declarations: [CartQuickOrderFormComponent],
  exports: [CartQuickOrderFormComponent],
})
export class CartQuickOrderFormModule {}
