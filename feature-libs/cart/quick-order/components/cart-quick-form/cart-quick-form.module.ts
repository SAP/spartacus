import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CartQuickFormComponent } from './cart-quick-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        // TODO replace once new sample data will be ready
        CartApplyCouponComponent: {
          component: CartQuickFormComponent,
        },
      },
    }),
  ],
  declarations: [CartQuickFormComponent, CartQuickFormComponent],
  exports: [CartQuickFormComponent],
  entryComponents: [CartQuickFormComponent],
})
export class CartQuickFormModule {}
