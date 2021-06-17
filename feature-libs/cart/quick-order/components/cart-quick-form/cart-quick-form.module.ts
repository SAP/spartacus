import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { I18nModule } from 'projects/core/src/i18n';
import { CartQuickFormComponent } from './cart-quick-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
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
